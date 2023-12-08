import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { speciesProvider } from './species.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProvider],
})
export class SpeciesModule {}
