import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandsService', () => {
  let service: BrandsService;

  const oneBrand = {
    id: 'df586162-618e-4f87-8f7c-f5272219bd7f',
    name: 'Toyota',
    createdAt: new Date().getTime(),
  };

  const brandArray: Brand[] = [
    {
      id: 'df586162-618e-4f87-8f7c-f5272219bd7f',
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
    {
      id: 'df586162-618e-4f87-8f7c-f5272219bd7r',
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
    {
      id: 'df586162-618e-4f87-8f7c-f5272219bd7e',
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    service.fillBrandsWithSeedData([...brandArray]);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of brands', () => {
      const brands = service.findAll();
      expect(brands).toEqual(brandArray);
    });
  });
  describe('findOne', () => {
    it('should return a brand by id', () => {
      const brand = service.findOne(oneBrand.id);
      expect(brand.id).toEqual(oneBrand.id);
    });
  });
  describe('create', () => {
    it('should create a new brand', () => {
      const createBrandDto: CreateBrandDto = { name: 'honda' };
      const newBrand = service.create(createBrandDto);
      expect(newBrand).toMatchObject(createBrandDto);
      expect(newBrand).toHaveProperty('id');
      expect(service.findAll().length).toBe(brandArray.length + 1);
    });
  });
  describe('update', () => {
    it('should update a brand', () => {
      const brandDto: UpdateBrandDto = { name: 'chino' };
      const updateBrand = service.update(oneBrand.id, brandDto);
      expect(updateBrand).toMatchObject(brandDto);
    });

    it('should throw NotFoundException if brand is not found', () => {
      const updateBrandDto = { name: 'honda' };
      expect(() => service.update('non-existent-id', updateBrandDto)).toThrow(
        NotFoundException,
      );
    });
  });
  describe('remove', () => {
    it('should delete a brand', () => {
      service.remove(oneBrand.id);
      expect(() => service.findOne(oneBrand.id)).toThrow(NotFoundException);
      expect(service.findAll().length).toBe(brandArray.length - 1);
    });

    it('should throw NotFoundException if brand to remove is not found', () => {
      expect(() => service.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
