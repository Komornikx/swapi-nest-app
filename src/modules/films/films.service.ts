import { Inject, Injectable } from '@nestjs/common';
import { Film } from './films.interface';
import { Model } from 'mongoose';

@Injectable()
export class FilmsService {
  constructor(@Inject('FILM_MODEL') private readonly filmModel: Model<Film>) {}

  findOne(id: string): Promise<Film> {
    return this.filmModel.findOne({ _id: id }, '-expireAt');
  }

  findAll(page?: number, pageSize?: number): Promise<Film[]> {
    return this.filmModel
      .find({}, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);
  }

  save(film: Film, id: string) {
    return this.filmModel.updateOne({ _id: id }, film, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.filmModel.findOne({ title });
  }
}
