import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(@Query() query?): Promise<Array<Object>> {
    let films = await this.filmsService.findAll(query);

    return films;
  }

  @Get('analysis')
  async analysis(): Promise<any> {
    const analysis = await this.filmsService.analysis();
    return analysis;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Object> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    let film = await this.filmsService.findById(id);

    return film;
  }
}
