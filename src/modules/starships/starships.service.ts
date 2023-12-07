import { Inject, Injectable } from '@nestjs/common';
import { Starship } from './starships.interface';
import { Model } from 'mongoose';

@Injectable()
export class StarshipsService {
  constructor(
    @Inject('STARSHIP_MODEL') private readonly starshipModel: Model<Starship>,
  ) {}

  findOne(id: string): Promise<Starship> {
    return this.starshipModel.findOne({ _id: id }, '-expireAt');
  }

  findAll(page?: number, pageSize?: number): Promise<Starship[]> {
    return this.starshipModel
      .find({}, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);
  }

  save(starShip: Starship, id: string) {
    return this.starshipModel.updateOne({ _id: id }, starShip, {
      upsert: true,
    });
  }
}
