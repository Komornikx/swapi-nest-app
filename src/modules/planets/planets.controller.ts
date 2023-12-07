import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import axios from '../../utils/axios';
import { PlanetsService } from './planets.service';
import { Planet } from './planets.interface';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Array<Object>> {
    let planets = await this.planetsService.findAll(page, pageSize);

    if (planets.length <= 6) {
      const req = await axios.get('/planets').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No planets found!');
      }

      const newPlanets: Array<Planet> = req.data.results.map((el, index) => {
        return {
          _id: index + 1,
          ...el,
        };
      });

      for (const planet of newPlanets) {
        await this.planetsService.save(planet, planet._id);
      }
    }

    planets = await this.planetsService.findAll(page, pageSize);
    return planets;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    let planet = await this.planetsService.findOne(id);

    if (!planet) {
      const req = await axios.get(`/planets/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Planet not found!');
      }

      await this.planetsService.save(req.data, id);
      planet = await this.planetsService.findOne(id);
    }

    return planet;
  }
}
