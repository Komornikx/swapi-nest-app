import { Connection } from 'mongoose';
import { SpeciesSchema } from './species.schema';

export const speciesProvider = [
  {
    provide: 'SPECIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Species', SpeciesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
