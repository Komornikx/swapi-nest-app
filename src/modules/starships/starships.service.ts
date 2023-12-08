import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Starship } from './starships.interface';
import { Model } from 'mongoose';

import axios from '../../utils/axios';

@Injectable()
export class StarshipsService {
  constructor(
    @Inject('STARSHIP_MODEL') private readonly starshipModel: Model<Starship>,
  ) {}

  async findAll(query?: any): Promise<Starship[]> {
    const { pageSize, page } = query;

    let starships = await this.starshipModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const req = await axios.get('/starships').catch((err) => {
      throw new HttpException('SWAPI Request Error', err.response.status);
    });

    if (req.data.results.length <= 0) {
      throw new NotFoundException('No starships found!');
    }

    const newStarships: Array<Starship> = req.data.results.map((el) => {
      return {
        _id: el.url.split('/')[5], // SWAPI don't return any id inside resource object. Some of the resources don't begin at ID = 1, for ex. get(/starships/1) returns 404
        ...el,
      };
    });

    for (const starship of newStarships) {
      await this.save(starship);
    }

    starships = await this.starshipModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return starships;
  }

  async findOne(id: string): Promise<Starship> {
    let starship = await this.starshipModel.findOne({ _id: id }, '-expireAt');
    if (!starship) {
      const req = await axios.get(`/starships/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Starship not found!');
      }

      await this.save({ _id: id, ...req.data });
      starship = await this.starshipModel.findOne({ _id: id }, '-expireAt');
    }

    return starship;
  }

  save(starship: Starship) {
    return this.starshipModel.updateOne({ _id: starship._id }, starship, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.starshipModel.findOne({ title });
  }
}
