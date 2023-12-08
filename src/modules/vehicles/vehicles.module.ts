import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { vehiclesProvider } from './vehicles.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [VehiclesController],
  providers: [VehiclesService, ...vehiclesProvider],
})
export class VehiclesModule {}
