import { Test, TestingModule } from '@nestjs/testing';
import { ConcessionariasService } from './concessionarias.service';

describe('ConcessionariasService', () => {
  let service: ConcessionariasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcessionariasService],
    }).compile();

    service = module.get<ConcessionariasService>(ConcessionariasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
