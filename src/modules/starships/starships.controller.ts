import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { StarshipsService } from './starships.service';
import { Starship } from './starships.interface';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get()
  async findAll(@Query() query?): Promise<Starship[]> {
    const starships = await this.starshipsService.findAll(query);
    return starships;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Starship> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const starships = await this.starshipsService.findById(id);
    return starships;
  }
}
