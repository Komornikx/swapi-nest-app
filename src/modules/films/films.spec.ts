import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

jest.mock('./films.service');

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const expected = [
        { _id: '1', title: 'Film 1', opening_crawl: 'Crawl 1' },
      ];
      jest.spyOn(filmsService, 'findAll').mockResolvedValue(expected);

      const films = await filmsController.findAll();
      expect(films).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('should return a film by ID', async () => {
      const expected = { _id: '1', title: 'Film 1', opening_crawl: 'Crawl 1' };
      jest.spyOn(filmsService, 'findById').mockResolvedValue(expected);

      const film = await filmsController.findById(expected._id);
      expect(filmsService.findById).toHaveBeenCalledWith(expected._id);
      expect(film).toEqual(expected);
    });
  });

  describe('analysis', () => {
    it('should return the most frequent character and unique words count', async () => {
      const expected = {
        uniqueWords: [
          ['It', 2],
          ['is', 7],
          ['a', 9],
          ['of', 20],
          ['Rebel', 3],
          ['from', 3],
          ['hidden', 2],
          ['have', 3],
          ['their', 4],
          ['first', 2],
          ['the', 48],
        ],
        mostOccurencesInOpening: 'Luke Skywalker',
      };
      jest.spyOn(filmsService, 'analysis').mockResolvedValue({
        uniqueWords: [
          ['It', 2],
          ['is', 7],
          ['a', 9],
          ['of', 20],
          ['Rebel', 3],
          ['from', 3],
          ['hidden', 2],
          ['have', 3],
          ['their', 4],
          ['first', 2],
          ['the', 48],
        ],
        mostOccurencesInOpening: 'Luke Skywalker',
      });

      const result = await filmsController.analysis();

      expect(result).toEqual(expected);
    });
  });
});
