import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import exp from 'constants';

jest.mock('./species.service');

describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService],
    }).compile();

    speciesController = module.get<SpeciesController>(SpeciesController);
    speciesService = module.get<SpeciesService>(SpeciesService);
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      const species = [
        {
          _id: '1',
          average_height: '180',
          average_lifespan: '120',
          classification: 'mammal',
          designation: 'sentient',
          eye_colors: 'brown, blue, green, hazel, grey, amber',
          hair_colors: 'blonde, brown, black, red',
          homeworld: 'https://swapi.dev/api/planets/9/',
          language: 'Galactic Basic',
          name: 'Human',
          skin_colors: 'caucasian, black, asian, hispanic',
          url: 'https://swapi.dev/api/species/1/',
        },
      ];
      jest.spyOn(speciesService, 'findAll').mockResolvedValue(species);

      expect(await speciesController.findAll()).toEqual(species);
    });
  });

  describe('findById', () => {
    it('should return a species by ID', async () => {
      const expected = {
        _id: '1',
        average_height: '180',
        average_lifespan: '120',
        classification: 'mammal',
        designation: 'sentient',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        hair_colors: 'blonde, brown, black, red',
        homeworld: 'https://swapi.dev/api/planets/9/',
        language: 'Galactic Basic',
        name: 'Human',
        skin_colors: 'caucasian, black, asian, hispanic',
        url: 'https://swapi.dev/api/species/1/',
      };
      jest.spyOn(speciesService, 'findById').mockResolvedValue(expected);

      const species = await speciesController.findById(expected._id);
      expect(speciesService.findById).toBeCalledWith(expected._id);
      expect(species).toEqual(species);
    });
  });
});
