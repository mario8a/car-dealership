import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call brandsService.create with the correct parameters', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Brand A' };
      await controller.create(createBrandDto);
      expect(service.create).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe('findAll', () => {
    it('should call brandsService.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call brandsService.findOne with the correct id', async () => {
      const id = '1234-5678-91011';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call brandsService.update with the correct parameters', async () => {
      const id = '1234-5678-91011';
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand' };
      await controller.update(id, updateBrandDto);
      expect(service.update).toHaveBeenCalledWith(id, updateBrandDto);
    });
  });

  describe('remove', () => {
    it('should call brandsService.remove with the correct id', async () => {
      const id = '1234-5678-91011';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
