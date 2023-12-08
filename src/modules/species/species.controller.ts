import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { SpeciesService } from './species.service';
import { Species } from './species.interface';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  async findAll(@Query() query?): Promise<Species[]> {
    const species = await this.speciesService.findAll(query);
    return species;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Species> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const species = await this.speciesService.findById(id);
    return species;
  }
}
