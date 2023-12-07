import { Connection } from 'mongoose';
import { PlanetSchema } from './planets.schema';

export const planetsProvider = [
  {
    provide: 'PLANET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Planet', PlanetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
