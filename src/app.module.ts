import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarshipsModule } from './modules/starships/starships.module';

@Module({
  imports: [FilmsModule, PlanetsModule, SpeciesModule, StarshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
