import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

jest.mock('./starships.service');

describe('StarshipsController', () => {
  let starshipsController: StarshipsController;
  let starshipsService: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [StarshipsService],
    }).compile();

    starshipsController = module.get<StarshipsController>(StarshipsController);
    starshipsService = module.get<StarshipsService>(StarshipsService);
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      const starships = [
        {
          _id: '2',
          MGLT: '60',
          cargo_capacity: '3000000',
          consumables: '1 year',
          cost_in_credits: '3500000',
          crew: '30-165',
          hyperdrive_rating: '2.0',
          length: '150',
          manufacturer: 'Corellian Engineering Corporation',
          max_atmosphering_speed: '950',
          model: 'CR90 corvette',
          name: 'CR90 corvette',
          passengers: '600',
          starship_class: 'corvette',
          url: 'https://swapi.dev/api/starships/2/',
        },
      ];
      jest.spyOn(starshipsService, 'findAll').mockResolvedValue(starships);

      expect(await starshipsController.findAll()).toEqual(starships);
    });
  });

  describe('findById', () => {
    it('should return a starship by ID', async () => {
      const expected = {
        _id: '2',
        MGLT: '60',
        cargo_capacity: '3000000',
        consumables: '1 year',
        cost_in_credits: '3500000',
        crew: '30-165',
        hyperdrive_rating: '2.0',
        length: '150',
        manufacturer: 'Corellian Engineering Corporation',
        max_atmosphering_speed: '950',
        model: 'CR90 corvette',
        name: 'CR90 corvette',
        passengers: '600',
        starship_class: 'corvette',
        url: 'https://swapi.dev/api/starships/2/',
      };
      jest.spyOn(starshipsService, 'findById').mockResolvedValue(expected);

      const starShip = await starshipsController.findById(expected._id);

      expect(starshipsService.findById).toBeCalledWith(expected._id);
      expect(starShip).toEqual(expected);
    });
  });
});
