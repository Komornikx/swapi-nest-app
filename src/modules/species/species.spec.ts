import { model } from 'mongoose';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { SpeciesSchema } from './species.schema';

const speciesModel = model('Species', SpeciesSchema);
// todo
describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;

  beforeEach(() => {
    speciesService = new SpeciesService(speciesModel);
    speciesController = new SpeciesController(speciesService);
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      // const result = ['test'];
      // jest.spyOn(speciesService, 'findAll').mockImplementation((result) => {
      //   console.log(result);
      // });
      // expect(await speciesController.findAll()).toBe(result);
      return [];
    });
  });
});
