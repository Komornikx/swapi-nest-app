import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmsProviders } from './films.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [FilmsController],
  providers: [FilmsService, ...filmsProviders],
})
export class FilmsModule {}
