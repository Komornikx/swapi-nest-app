import { Connection } from 'mongoose';
import { VehicleSchema } from './vehicles.schema';

export const vehiclesProvider = [
  {
    provide: 'VEHICLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Vehicle', VehicleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
