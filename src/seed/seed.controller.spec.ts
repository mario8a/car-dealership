import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let controller: SeedController;
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        {
          provide: SeedService,
          useValue: {
            populateDB: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('runSeed', () => {
    it('should be call populateDB', async () => {
      await controller.runSeed();
      expect(service.populateDB).toHaveBeenCalled();
    });
  });
});
