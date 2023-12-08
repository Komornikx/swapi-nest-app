import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Starship } from './starships.interface';
import axios from '../../utils/axios';

@Injectable()
export class StarshipsService {
  constructor(
    @Inject('STARSHIP_MODEL') private readonly starshipModel: Model<Starship>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query?: any): Promise<Starship[]> {
    const { pageSize, page } = query;
    delete query.pageSize;
    delete query.page;

    let starships = await this.starshipModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const fetchedAll = await this.cacheManager.get('starships-fetchedAll');
    if (starships.length <= 0 || !fetchedAll) {
      const req = await axios.get('/starships').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No starships found!');
      }

      const newStarships: Array<Starship> = req.data.results.map((el) => {
        return {
          _id: el.url.split('/')[5],
          ...el,
        };
      });

      for (const starship of newStarships) {
        await this.save(starship);
      }

      await this.cacheManager.set('starships-fetchedAll', true, 24 * 3600);
    }

    starships = await this.starshipModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return starships;
  }

  async findById(id: string): Promise<Starship> {
    let starship = await this.starshipModel.findById(id, '-expireAt');
    if (!starship) {
      const req = await axios.get(`/starships/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Starship not found!');
      }

      await this.save({ _id: id, ...req.data });
      starship = await this.starshipModel.findById(id, '-expireAt');
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
