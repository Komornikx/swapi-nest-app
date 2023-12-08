import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Species } from './species.interface';
import { Model } from 'mongoose';

import axios from '../../utils/axios';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL') private readonly speciesModel: Model<Species>,
  ) {}

  async findAll(query?: any): Promise<Species[]> {
    const { pageSize, page } = query;

    let species = await this.speciesModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const req = await axios.get('/species').catch((err) => {
      throw new HttpException('SWAPI Request Error', err.response.status);
    });

    if (req.data.results.length <= 0) {
      throw new NotFoundException('No species found!');
    }

    const newSpecies: Array<Species> = req.data.results.map((el) => {
      return {
        _id: el.url.split('/')[5], // SWAPI don't return any id inside resource object. Some of the resources don't begin at ID = 1, for ex. get(/starships/1) returns 404
        ...el,
      };
    });

    for (const species of newSpecies) {
      await this.save(species);
    }

    species = await this.speciesModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return species;
  }

  async findOne(id: string): Promise<Species> {
    let species = await this.speciesModel.findOne({ _id: id }, '-expireAt');
    if (!species) {
      const req = await axios.get(`/species/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Species not found!');
      }

      await this.save({ _id: id, ...req.data });
      species = await this.speciesModel.findOne({ _id: id }, '-expireAt');
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
