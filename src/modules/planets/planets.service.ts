import { Inject, Injectable } from '@nestjs/common';
import { Planet } from './planets.interface';
import { Model } from 'mongoose';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject('PLANET_MODEL') private readonly planetModel: Model<Planet>,
  ) {}

  findOne(id: string): Promise<Planet> {
    return this.planetModel.findOne({ _id: id }, '-expireAt');
  }

  findAll(page?: number, pageSize?: number): Promise<Planet[]> {
    return this.planetModel
      .find({}, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);
  }

  save(planet: Planet, id: string) {
    return this.planetModel.updateOne({ _id: id }, planet, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.planetModel.findOne({ title });
  }
}
