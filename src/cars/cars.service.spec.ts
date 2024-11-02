import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CarsService', () => {
  let service: CarsService;

  const oneCar = {
    id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
    brand: 'Toyota',
    model: 'Corolla',
  };

  const carArray: Car[] = [
    {
      id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 'df586162-618e-4f87-8f7c-f5272219bd7f',
      brand: 'Chevy',
      model: 'jejs',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
    service.fillCarsWithSeedData([...carArray]);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of cars', () => {
      const cars = service.findAll();
      expect(cars).toEqual(carArray);
    });
  });
  describe('findOneById', () => {
    it('should return a car by id', () => {
      const car = service.findOneById(oneCar.id);
      expect(car).toEqual(oneCar);
    });
  });
  describe('create', () => {
    it('should create a new car', () => {
      const createCarDto = { brand: 'Honda', model: 'Civic' };
      const newCar = service.create(createCarDto);
      expect(newCar).toMatchObject(createCarDto);
      expect(newCar).toHaveProperty('id');
      expect(service.findAll().length).toBe(carArray.length + 1);
    });
  });
  describe('update', () => {
    it('should update a car', () => {
      const updateCarDto = { brand: 'Toyota', model: 'Corolla Updated' };
      const updatedCar = service.update(oneCar.id, updateCarDto);
      expect(updatedCar).toMatchObject(updateCarDto);
    });

    it('should throw NotFoundException if car is not found', () => {
      const updateCarDto = { brand: 'Toyota', model: 'Corolla Updated' };
      expect(() => service.update('non-existent-id', updateCarDto)).toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if id in body does not match url id', () => {
      const updateCarDto = {
        id: 'different-id',
        brand: 'Toyota',
        model: 'Corolla Updated',
      };
      expect(() => service.update(oneCar.id, updateCarDto)).toThrow(
        BadRequestException,
      );
    });
  });
  describe('delete', () => {
    it('should delete a car', () => {
      service.delete(oneCar.id);
      expect(() => service.findOneById(oneCar.id)).toThrow(NotFoundException);
      expect(service.findAll().length).toBe(carArray.length - 1);
    });

    it('should throw NotFoundException if car to delete is not found', () => {
      expect(() => service.delete('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
