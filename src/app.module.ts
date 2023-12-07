import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';

@Module({
  imports: [FilmsModule, PlanetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
