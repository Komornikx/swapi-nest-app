import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import axios from '../../utils/axios';
import { SpeciesService } from './species.service';
import { Species } from './species.interface';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Array<Object>> {
    let species = await this.speciesService.findAll(page, pageSize);

    if (species.length <= 6) {
      const req = await axios.get('/species').catch((err) => {
        throw new HttpException('SWAPI Request Error', err.response.status);
      });

      if (req.data.results.length <= 0) {
        throw new NotFoundException('No species found!');
      }

      const newSpecies: Array<Species> = req.data.results.map((el, index) => {
        return {
          _id: index + 1,
          ...el,
        };
      });

      for (const species of newSpecies) {
        await this.speciesService.save(species, species._id);
      }
    }

    species = await this.speciesService.findAll(page, pageSize);
    return species;
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Object> {
    let species = await this.speciesService.findOne(id);

    if (!species) {
      const req = await axios.get(`/species/${id}`).catch((err) => {
        throw new HttpException(err.response.data.detail, err.response.status);
      });

      if (!req.data) {
        throw new NotFoundException('Species not found!');
      }

      await this.speciesService.save(req.data, id);
      species = await this.speciesService.findOne(id);
    }

    return species;
  }
}
