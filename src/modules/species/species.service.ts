import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Species } from './species.interface';
import axios from '../../utils/axios';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL') private readonly speciesModel: Model<Species>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query?: any): Promise<Species[]> {
    const { pageSize, page } = query;
    delete query.pageSize;
    delete query.page;

    let species = await this.speciesModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const fetchedAll = await this.cacheManager.get('species-fetchedAll');
    if (species.length <= 0 || !fetchedAll) {
      const req = await axios.get('/species').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No species found!');
      }

      const newSpecies: Array<Species> = req.data.results.map((el) => {
        return {
          _id: el.url.split('/')[5],
          ...el,
        };
      });

      for (const species of newSpecies) {
        await this.save(species);
      }

      await this.cacheManager.set('species-fetchedAll', true, 24 * 3600);
    }

    species = await this.speciesModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return species;
  }

  async findById(id: string): Promise<Species> {
    let species = await this.speciesModel.findById(id, '-expireAt');
    if (!species) {
      const req = await axios.get(`/species/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Species not found!');
      }

      await this.save({ _id: id, ...req.data });
      species = await this.speciesModel.findById(id, '-expireAt');
    }

    return species;
  }

  save(species: Species) {
    return this.speciesModel.updateOne({ _id: species._id }, species, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.speciesModel.findOne({ title });
  }
}
