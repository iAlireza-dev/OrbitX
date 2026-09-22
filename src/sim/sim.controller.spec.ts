import { Test, TestingModule } from '@nestjs/testing';
import { SimController } from './sim.controller.js';

describe('SimController', () => {
  let controller: SimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimController],
    }).compile();

    controller = module.get<SimController>(SimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
