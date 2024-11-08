import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { BrandsService } from './../brands/brands.service';
import { CarsService } from '../cars/cars.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService, CarsService, BrandsService],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('populateDB', () => {
    it('Should be return message seed executed', () => {
      const seed = service.populateDB();
      expect(seed).toBe('Seed excecuted');
    });
  });
});
