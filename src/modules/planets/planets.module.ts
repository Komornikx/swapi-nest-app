import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { planetsProvider } from './planets.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, ...planetsProvider],
})
export class PlanetsModule {}
