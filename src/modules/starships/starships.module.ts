import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { starshipsProvider } from './starships.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StarshipsController],
  providers: [StarshipsService, ...starshipsProvider],
})
export class StarshipsModule {}
