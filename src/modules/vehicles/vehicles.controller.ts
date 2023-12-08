import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.interface';

@Controller('vehicles')
export class VehiclesController {
  constructor(private starshipsService: VehiclesService) {}

  @Get()
  async findAll(@Query() query?): Promise<Vehicle[]> {
    const vehicles = await this.starshipsService.findAll(query);
    return vehicles;
  }

  @Get(':id')
  async findById(@Param('id') id: any): Promise<Vehicle> {
    if (!id) {
      throw new BadRequestException("ID wasn't passed!");
    }

    const vehicles = await this.starshipsService.findById(id);
    return vehicles;
  }
}
