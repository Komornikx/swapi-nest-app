import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { StarshipsService } from './starships.service';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get()
  async findAll(@Query() query?): Promise<Array<Object>> {
    const starships = await this.starshipsService.findAll(query);
    return starships;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Object> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const starships = await this.starshipsService.findById(id);
    return starships;
  }
}
