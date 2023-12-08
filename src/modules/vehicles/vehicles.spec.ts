import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

jest.mock('./vehicles.service');

describe('VehiclesController', () => {
  let vehiclesController: VehiclesController;
  let vehiclesService: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesService],
    }).compile();

    vehiclesController = module.get<VehiclesController>(VehiclesController);
    vehiclesService = module.get<VehiclesService>(VehiclesService);
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const vehicles = [
        {
          _id: '4',
          cargo_capacity: '50000',
          consumables: '2 months',
          cost_in_credits: '150000',
          crew: '46',
          length: '36.8 ',
          manufacturer: 'Corellia Mining Corporation',
          max_atmosphering_speed: '30',
          model: 'Digger Crawler',
          name: 'Sand Crawler',
          passengers: '30',
          vehicle_class: 'wheeled',
        },
      ];
      jest.spyOn(vehiclesService, 'findAll').mockResolvedValue(vehicles);

      expect(await vehiclesController.findAll()).toEqual(vehicles);
    });
  });

  describe('findById', () => {
    it('should return a vehicle by ID', async () => {
      const expected = {
        _id: '4',
        cargo_capacity: '50000',
        consumables: '2 months',
        cost_in_credits: '150000',
        crew: '46',
        length: '36.8 ',
        manufacturer: 'Corellia Mining Corporation',
        max_atmosphering_speed: '30',
        model: 'Digger Crawler',
        name: 'Sand Crawler',
        passengers: '30',
        vehicle_class: 'wheeled',
      };
      jest.spyOn(vehiclesService, 'findById').mockResolvedValue(expected);
      const vehicle = await vehiclesController.findById(expected._id);
      expect(vehiclesService.findById).toBeCalledWith(expected._id);
      expect(vehicle).toEqual(expected);
    });
  });
});
