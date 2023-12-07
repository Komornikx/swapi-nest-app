import { model } from 'mongoose';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { StarshipSchema } from './starships.schema';

const starshipModel = model('Starship', StarshipSchema);
// todo
describe('StarshipsController', () => {
  let starshipsController: StarshipsController;
  let starshipsService: StarshipsService;

  beforeEach(() => {
    starshipsService = new StarshipsService(starshipModel);
    starshipsController = new StarshipsController(starshipsService);
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      // const result = ['test'];
      // jest.spyOn(starshipsService, 'findAll').mockImplementation((result) => {
      //   console.log(result);
      // });
      // expect(await starshipsController.findAll()).toBe(result);
      return [];
    });
  });
});
