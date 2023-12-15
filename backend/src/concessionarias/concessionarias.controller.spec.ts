import { Test, TestingModule } from '@nestjs/testing';
import { ConcessionariasController } from './concessionarias.controller';
import { ConcessionariasService } from './concessionarias.service';

describe('ConcessionariasController', () => {
  let controller: ConcessionariasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcessionariasController],
      providers: [ConcessionariasService],
    }).compile();

    controller = module.get<ConcessionariasController>(ConcessionariasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
