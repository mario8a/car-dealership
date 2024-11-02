import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
                brand: 'Toyota',
                model: 'Corolla',
              },
            ]),
            findOneById: jest.fn().mockResolvedValue({
              id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
              brand: 'Toyota',
              model: 'Corolla',
            }),
            create: jest
              .fn()
              .mockImplementation((createCarDto: CreateCarDto) => {
                return Promise.resolve({
                  id: 'df586162-618e-4f87-8f7c-f5272219b9e',
                  ...createCarDto,
                });
              }),
            update: jest
              .fn()
              .mockImplementation((id: string, updateCarDto: UpdateCarDto) => {
                return Promise.resolve({
                  id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
                  ...updateCarDto,
                });
              }),
            delete: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({
                id,
              });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCars', () => {
    it('should fetch all the cars', async () => {
      const cars = await controller.getAllCars();
      expect(cars).toEqual([
        {
          brand: 'Toyota',
          id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
          model: 'Corolla',
        },
      ]);
    });
  });
  describe('get car by id', () => {
    it('Should give me a car by id', async () => {
      const car = await controller.getCarById(
        'df586162-618e-4f87-8f7c-f5272219bd7e2',
      );
      expect(car.id).toEqual('df586162-618e-4f87-8f7c-f5272219bd7e');
    });
  });
  describe('create a new car', () => {
    it('Should create a new car', async () => {
      const newCarDTO: CreateCarDto = {
        brand: '2020',
        model: 'Chanchito',
      };
      const car = await controller.createCar(newCarDTO);
      expect(car.model).toBe('Chanchito');
    });
  });
  describe('Update a car', () => {
    it('Should update a new car', async () => {
      const updateCar: UpdateCarDto = {
        brand: '2020',
        model: 'Chanchito2',
      };
      const car = await controller.updateCar('121', updateCar);
      expect(car).toBeDefined();
      expect(car.model).toBe('Chanchito2');
    });
  });
});
