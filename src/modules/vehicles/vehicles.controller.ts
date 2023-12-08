import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private starshipsService: VehiclesService) {}

  @Get()
  async findAll(@Query() query?): Promise<Array<Object>> {
    const vehicles = await this.starshipsService.findAll(query);
    return vehicles;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const vehicles = await this.starshipsService.findOne(id);
    return vehicles;
  }
}
