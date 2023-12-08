import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Film } from './films.interface';
import axios from '../../utils/axios';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILM_MODEL') private readonly filmModel: Model<Film>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query: any): Promise<Film[]> {
    const { pageSize, page } = query;
    delete query.pageSize;
    delete query.page;

    let films = await this.filmModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const fetchedAll = await this.cacheManager.get('films-fetchedAll');
    if (films.length <= 0 || !fetchedAll) {
      const req = await axios.get('/films').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No films found!');
      }

      const newFilms: Array<Film> = req.data.results.map((el) => {
        return {
          _id: el.url.split('/')[5],
          ...el,
        };
      });

      for (const film of newFilms) {
        await this.save(film);
      }

      await this.cacheManager.set('films-fetchedAll', true, 24 * 3600);
    }

    films = await this.filmModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return films;
  }

  async findById(id: string): Promise<Film> {
    const film = await this.filmModel.findById(id, '-expireAt');

    if (!film) {
      const req = await axios.get(`/films/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Film not found!');
      }

      await this.save({ _id: id, ...req.data });
      return req.data;
    }

    return film;
  }

  async save(film: Film) {
    return await this.filmModel.updateOne({ _id: film._id }, film, {
      upsert: true,
    });
  }

  async analysis() {
    let films = await this.findAll({});

    // combine together all openings_crawl for two analysis
    const allOpenings = films.map((film) => film.opening_crawl).join(' ');

    // A. Extract unique words and their occurrences
    const uniqueWordsCount: { [key: string]: number } = {};
    for (const word of allOpenings.split(/\s+/)) {
      if (word !== '') {
        uniqueWordsCount[word] = (uniqueWordsCount[word] || 0) + 1;
      }
    }
    const uniqueWordsArray = Object.entries(uniqueWordsCount);

    // B. Extract name of a character from the /people API which occures most often in opening_crawl
    const occurencesCount: { [key: string]: number } = {};

    const peopleReq = await axios.get('/people');
    const people = peopleReq.data.results;

    const peopleNames = people.map((el) => el.name);

    // count every name occurence in opening_crawl
    for (const name of peopleNames) {
      const regex = new RegExp(name, 'gi');

      const amount = [...allOpenings.matchAll(regex)].map(
        (el) => el.index,
      ).length;

      occurencesCount[name] = (occurencesCount[name] || 0) + amount;
    }

    // group together by number of occurences
    const groupedOccurences = {};

    for (const el of Object.entries(occurencesCount)) {
      if (!groupedOccurences[el[1]]) {
        groupedOccurences[el[1]] = [];
      }
      groupedOccurences[el[1]].push(el[0]);
    }

    const mostOccured: any = Object.entries(groupedOccurences).sort(
      (a, b) => +b[0] - +a[0],
    )[0][1];

    return {
      uniqueWords: uniqueWordsArray.filter((el) => el[1] > 1),
      mostOccurencesInOpening:
        mostOccured.length > 1 ? mostOccured : mostOccured.join(''),
    };
  }
}
