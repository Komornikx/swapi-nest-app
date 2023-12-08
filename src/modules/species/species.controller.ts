import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { SpeciesService } from './species.service';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  async findAll(@Query() query?): Promise<Array<Object>> {
    const species = await this.speciesService.findAll(query);
    return species;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Object> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const species = await this.speciesService.findById(id);
    return species;
  }
}
