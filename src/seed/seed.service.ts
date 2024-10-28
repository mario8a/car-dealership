import { BRAND_SEED } from './data/brands.seed';
import { BrandsService } from './../brands/brands.service';
import { CarsService } from './../cars/cars.service';
import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandsService,
  ) {}

  populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandService.fillBrandsWithSeedData(BRAND_SEED);
    return 'Seed excecuted';
  }
}
