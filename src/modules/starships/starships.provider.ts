import { Connection } from 'mongoose';
import { StarshipSchema } from './starships.schema';

export const starshipsProvider = [
  {
    provide: 'STARSHIP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Starship', StarshipSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
