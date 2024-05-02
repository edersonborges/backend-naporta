import { Test, TestingModule } from '@nestjs/testing';
import { PreencherDadosService } from './insert-data.service';

describe('InsertDataService', () => {
  let service: PreencherDadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreencherDadosService],
    }).compile();

    service = module.get<PreencherDadosService>(PreencherDadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
