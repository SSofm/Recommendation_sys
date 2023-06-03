import { Test, TestingModule } from '@nestjs/testing';
import { SneakersController } from './sneakers.controller';
import { BooksService } from './sneakers.service';

describe('BooksController', () => {
  let controller: SneakersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SneakersController],
      providers: [BooksService],
    }).compile();

    controller = module.get<SneakersController>(SneakersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
