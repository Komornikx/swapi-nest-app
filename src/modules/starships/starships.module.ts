import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { starshipsProvider } from './starships.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [StarshipsController],
  providers: [StarshipsService, ...starshipsProvider],
})
export class StarshipsModule {}
