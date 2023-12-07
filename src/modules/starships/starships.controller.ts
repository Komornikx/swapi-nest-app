import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import axios from '../../utils/axios';
import { StarshipsService } from './starships.service';
import { Starship } from './starships.interface';

@Controller('starships')
export class StarshipsController {
  constructor(private speciesService: StarshipsService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Array<Object>> {
    let starships = await this.speciesService.findAll(page, pageSize);

    if (starships.length <= 6) {
      const req = await axios.get('/starships').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No starships found!');
      }

      const newStarships: Array<Starship> = req.data.results.map(
        (el, index) => {
          return {
            _id: index + 1,
            ...el,
          };
        },
      );

      for (const starship of newStarships) {
        await this.speciesService.save(starship, starship._id);
      }
    }

    starships = await this.speciesService.findAll(page, pageSize);
    return starships;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    let starship = await this.speciesService.findOne(id);

    if (!starship) {
      const req = await axios.get(`/starships/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Starship not found!');
      }

      await this.speciesService.save(req.data, id);
      starship = await this.speciesService.findOne(id);
    }

    return starship;
  }
}
