import { Inject, Injectable } from '@nestjs/common';
import { Vehicle } from './vehicles.interface';
import { Model } from 'mongoose';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('VEHICLE_MODEL') private readonly vehicleModel: Model<Vehicle>,
  ) {}

  findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findOne({ _id: id }, '-expireAt');
  }

  findAll(page?: number, pageSize?: number): Promise<Vehicle[]> {
    return this.vehicleModel
      .find({}, '-expireAt')
      .limit(pageSize)
      .skip(pageSize * page);
  }

  save(vehicle: Vehicle, id: string) {
    return this.vehicleModel.updateOne({ _id: id }, vehicle, {
      upsert: true,
    });
  }
}
