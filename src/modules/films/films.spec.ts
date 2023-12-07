import { model } from 'mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmSchema } from './films.schema';

const filmModel = model('Film', FilmSchema);
// todo
describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(() => {
    filmsService = new FilmsService(filmModel);
    filmsController = new FilmsController(filmsService);
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result = ['test'];
      jest.spyOn(filmsService, 'findAll').mockImplementation((result) => {
        console.log(result);
      });

      expect(await filmsController.findAll()).toBe(result);
    });
  });
});
