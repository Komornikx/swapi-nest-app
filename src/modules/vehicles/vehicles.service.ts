import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Vehicle } from './vehicles.interface';
import axios from '../../utils/axios';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('VEHICLE_MODEL') private readonly vehicleModel: Model<Vehicle>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query?: any): Promise<Vehicle[]> {
    const { pageSize, page } = query;
    delete query.pageSize;
    delete query.page;

    let vehicles = await this.vehicleModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    const fetchedAll = await this.cacheManager.get('vehicles-fetchedAll');
    if (vehicles.length <= 0 || !fetchedAll) {
      const req = await axios.get('/vehicles').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No vehicles found!');
      }

      const newVehicles: Array<Vehicle> = req.data.results.map((el) => {
        return {
          _id: el.url.split('/')[5],
          ...el,
        };
      });

      for (const vehicle of newVehicles) {
        await this.save(vehicle);
      }
      await this.cacheManager.set('vehicles-fetchedAll', true, 24 * 3600);
    }

    vehicles = await this.vehicleModel
      .find({ ...query }, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);

    return vehicles;
  }

  async findById(id: string): Promise<Vehicle> {
    let vehicle = await this.vehicleModel.findById(id, '-expireAt');
    if (!vehicle) {
      const req = await axios.get(`/vehicles/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Vehicle not found!');
      }

      await this.save({ _id: id, ...req.data });
      vehicle = await this.vehicleModel.findById(id, '-expireAt');
    }

    return vehicle;
  }

  save(vehicle: Vehicle) {
    return this.vehicleModel.updateOne({ _id: vehicle._id }, vehicle, {
      upsert: true,
    });
  }

  getIdByTitle(title: string) {
    return this.vehicleModel.findOne({ title });
  }
}
