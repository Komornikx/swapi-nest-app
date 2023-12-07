import { model } from 'mongoose';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehicleSchema } from './vehicles.schema';

const vehicleModel = model('Vehicle', VehicleSchema);
// todo
describe('VehiclesController', () => {
  let starshipsController: VehiclesController;
  let starshipsService: VehiclesService;

  beforeEach(() => {
    starshipsService = new VehiclesService(vehicleModel);
    starshipsController = new VehiclesController(starshipsService);
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      // const result = ['test'];
      // jest.spyOn(starshipsService, 'findAll').mockImplementation((result) => {
      //   console.log(result);
      // });
      // expect(await starshipsController.findAll()).toBe(result);
      return [];
    });
  });
});
