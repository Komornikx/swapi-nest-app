import { model } from 'mongoose';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PlanetSchema } from './planets.schema';

const planetModel = model('Planet', PlanetSchema);
// todo
describe('PlanetsController', () => {
  let planetsController: PlanetsController;
  let planetsService: PlanetsService;

  beforeEach(() => {
    planetsService = new PlanetsService(planetModel);
    planetsController = new PlanetsController(planetsService);
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      // const result = ['test'];
      // jest.spyOn(planetsService, 'findAll').mockImplementation((result) => {
      //   console.log(result);
      // });
      // expect(await planetsController.findAll()).toBe(result);
      return [];
    });
  });
});
