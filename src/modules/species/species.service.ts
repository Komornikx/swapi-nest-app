import { Inject, Injectable } from '@nestjs/common';
import { Species } from './species.interface';
import { Model } from 'mongoose';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL') private readonly speciesModel: Model<Species>,
  ) {}

  findOne(id: string): Promise<Species> {
    return this.speciesModel.findOne({ _id: id }, '-expireAt');
  }

  findAll(page?: number, pageSize?: number): Promise<Species[]> {
    return this.speciesModel
      .find({}, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);
  }

  save(species: Species, id: string) {
    return this.speciesModel.updateOne({ _id: id }, species, {
      upsert: true,
    });
  }
}
