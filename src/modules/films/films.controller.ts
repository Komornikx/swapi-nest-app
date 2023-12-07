import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import axios from '../../utils/axios';
import { FilmsService } from './films.service';
import { Film } from './films.interface';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Array<Object>> {
    let films = await this.filmsService.findAll(page, pageSize);

    if (films.length <= 6) {
      const req = await axios.get('/films').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No films found!');
      }

      const newFilms: Array<Film> = req.data.results.map((el, index) => {
        return {
          _id: index + 1,
          ...el,
        };
      });

      for (const film of newFilms) {
        await this.filmsService.save(film, film._id);
      }
    }

    films = await this.filmsService.findAll(page, pageSize);
    return films;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    let film = await this.filmsService.findOne(id);

    if (!film) {
      const req = await axios.get(`/films/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Film not found!');
      }

      await this.filmsService.save(req.data, id);
      film = await this.filmsService.findOne(id);
    }

    return film;
  }

  @Get('film-analysis')
  async filmAnalysis(): Promise<any> {
    const films = await this.filmsService.findAll();

    // A. Extract unique words and their occurrences
    const uniqueWordsCount: { [key: string]: number } = {};
    films.forEach((film) => {
      const words = film.opening_crawl.split(/\s+/);
      words.forEach((word) => {
        if (word !== '') {
          uniqueWordsCount[word] = (uniqueWordsCount[word] || 0) + 1;
        }
      });
    });
    const uniqueWordsArray = Object.entries(uniqueWordsCount);

    return {
      uniqueWords: uniqueWordsArray.filter((el) => el[1] > 1),
    };
  }
}
