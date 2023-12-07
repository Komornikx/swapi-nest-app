import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { speciesProvider } from './species.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProvider],
})
export class SpeciesModule {}
