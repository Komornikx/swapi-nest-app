import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  async findAll(@Query() query?): Promise<Array<Object>> {
    const planets = await this.planetsService.findAll(query);
    return planets;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Object> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const planet = await this.planetsService.findById(id);
    return planet;
  }
}
