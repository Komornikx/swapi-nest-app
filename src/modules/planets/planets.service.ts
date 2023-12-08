import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Planet } from './planets.interface';
import { Model } from 'mongoose';

import axios from '../../utils/axios';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject('PLANET_MODEL') private readonly planetModel: Model<Planet>,
  ) {}

  async findAll(query?: any): Promise<Planet[]> {
    const { pageSize, page } = query;

    let planets = await this.planetModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const req = await axios.get('/planets').catch((err) => {
      throw new HttpException('SWAPI Request Error', err.response.status);
    });

    if (req.data.results.length <= 0) {
      throw new NotFoundException('No planets found!');
    }

    const newPlanets: Array<Planet> = req.data.results.map((el) => {
      return {
        _id: el.url.split('/')[5], // SWAPI don't return any id inside resource object. Some of the resources don't begin at ID = 1, for ex. get(/starships/1) returns 404
        ...el,
      };
    });

    for (const planet of newPlanets) {
      await this.save(planet);
    }

    planets = await this.planetModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return planets;
  }

  async findOne(id: string): Promise<Planet> {
    let planet = await this.planetModel.findOne({ _id: id }, '-expireAt');
    if (!planet) {
      const req = await axios.get(`/planets/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Planet not found!');
      }

      await this.save({ _id: id, ...req.data });
      planet = await this.planetModel.findOne({ _id: id }, '-expireAt');
    }

    return planet;
  }

  save(planet: Planet) {
    return this.planetModel.updateOne({ _id: planet._id }, planet, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.planetModel.findOne({ title });
  }
}
