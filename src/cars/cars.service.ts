import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`car with ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let cardb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not valid in body');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        cardb = {
          ...cardb,
          ...updateCarDto,
          id,
        };
        return cardb;
      }

      return cardb;
    });

    return cardb;
  }

  delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
