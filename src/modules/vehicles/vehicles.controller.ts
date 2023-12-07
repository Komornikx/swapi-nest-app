import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import axios from '../../utils/axios';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.interface';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Array<Object>> {
    let vehicles = await this.vehiclesService.findAll(page, pageSize);

    if (vehicles.length <= 6) {
      const req = await axios.get('/vehicles').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No vehicles found!');
      }

      const newVehicles: Array<Vehicle> = req.data.results.map((el, index) => {
        return {
          _id: index + 1,
          ...el,
        };
      });

      for (const vehicles of newVehicles) {
        await this.vehiclesService.save(vehicles, vehicles._id);
      }
    }

    vehicles = await this.vehiclesService.findAll(page, pageSize);
    return vehicles;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    let specie = await this.vehiclesService.findOne(id);

    if (!specie) {
      const req = await axios.get(`/vehicles/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Vehicle not found!');
      }

      await this.vehiclesService.save(req.data, id);
      specie = await this.vehiclesService.findOne(id);
    }

    return specie;
  }
}
