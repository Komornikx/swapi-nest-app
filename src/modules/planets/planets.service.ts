import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Planet } from './planets.interface';
import axios from '../../utils/axios';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject('PLANET_MODEL') private readonly planetModel: Model<Planet>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query?: any): Promise<Planet[]> {
    const { pageSize, page } = query;
    delete query.pageSize;
    delete query.page;

    let planets = await this.planetModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const fetchedAll = await this.cacheManager.get('planets-fetchedAll');
    if (planets.length <= 0 || !fetchedAll) {
      const req = await axios.get('/planets').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No planets found!');
      }

      const newPlanets: Array<Planet> = req.data.results.map((el) => {
        return {
          _id: el.url.split('/')[5],
          ...el,
        };
      });

      for (const planet of newPlanets) {
        await this.save(planet);
      }
      await this.cacheManager.set('planets-fetchedAll', true, 24 * 3600);
    }

    planets = await this.planetModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return planets;
  }

  async findById(id: string): Promise<Planet> {
    let planet = await this.planetModel.findById(id, '-expireAt');

    if (!planet) {
      const req = await axios.get(`/planets/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Planet not found!');
      }

      await this.save({ _id: id, ...req.data });
      planet = await this.planetModel.findById(id, '-expireAt');
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
