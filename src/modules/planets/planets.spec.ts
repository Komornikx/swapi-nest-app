import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

jest.mock('./planets.service');

describe('PlanetsController', () => {
  let planetsController: PlanetsController;
  let planetsService: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [PlanetsService],
    }).compile();

    planetsController = module.get<PlanetsController>(PlanetsController);
    planetsService = module.get<PlanetsService>(PlanetsService);
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      const expected = [
        {
          _id: '1',
          climate: 'arid',
          diameter: '10465',
          gravity: '1 standard',
          name: 'Tatooine',
          orbital_period: '304',
          population: '200000',
          rotation_period: '23',
          surface_water: '1',
          terrain: 'desert',
          url: 'https://swapi.dev/api/planets/1/',
        },
      ];
      jest.spyOn(planetsService, 'findAll').mockResolvedValue(expected);

      const planets = await planetsController.findAll();
      expect(planets).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('should return a film by ID', async () => {
      const expected = {
        _id: '1',
        climate: 'arid',
        diameter: '10465',
        gravity: '1 standard',
        name: 'Tatooine',
        orbital_period: '304',
        population: '200000',
        rotation_period: '23',
        surface_water: '1',
        terrain: 'desert',
        url: 'https://swapi.dev/api/planets/1/',
      };
      jest.spyOn(planetsService, 'findById').mockResolvedValue(expected);

      const planet = await planetsController.findById(expected._id);
      expect(planetsService.findById).toBeCalledWith(expected._id);
      expect(planet).toEqual(expected);
    });
  });
});
