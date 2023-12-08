import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { PlanetsService } from './planets.service';
import { Planet } from './planets.interface';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  async findAll(@Query() query?): Promise<Planet[]> {
    const planets = await this.planetsService.findAll(query);
    return planets;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Planet> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const planet = await this.planetsService.findById(id);
    return planet;
  }
}
