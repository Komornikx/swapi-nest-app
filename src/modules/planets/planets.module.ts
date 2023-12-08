import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { planetsProvider } from './planets.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [PlanetsController],
  providers: [PlanetsService, ...planetsProvider],
})
export class PlanetsModule {}
