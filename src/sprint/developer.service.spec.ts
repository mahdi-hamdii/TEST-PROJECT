/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDeveloperDto } from './dto/developer.create.dto';
import { DeveloperDto } from './dto/developer.dto';
import { DeveloperEntity } from './entity/developer.entity';
import {
  mockDeveloperRepository,
  testOwner,
} from './test-artifacts/repositories/mocks';
import { SprintService } from './sprint.service';
import { DevelopersService } from './developers.service';

describe('DevelopersService', () => {
  let service: DevelopersService;
  const mockDeveloperService = {
    findOne: jest.fn((options) => {
      return mockDeveloperRepository.findOne(options.id);
    }),
    create: jest.fn(
      async (developerDto: CreateDeveloperDto): Promise<DeveloperEntity> =>
        mockDeveloperRepository.create(developerDto),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: mockDeveloperRepository,
        },
      ],
    })
      .overrideProvider(DevelopersService)
      .useValue(mockDeveloperService)
      .compile();

    service = module.get<DevelopersService>(DevelopersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('developer creation unit test', async () => {
    const developer = await service.create({
      developername: 'Hamdi.Mahdi',
      email: 'mahdihamdi@live.fr',
      password: '123456',
    });
    expect(developer).toBeDefined();
    expect(developer.developername).toBe('Hamdi.Mahdi');
    expect(developer.email).toBe('mahdihamdi@live.fr');
  });
  it('developer find one unit test', async () => {
    const developer = await service.findOne({ id: testOwner.id });
    expect(developer).toBeDefined();
    expect(developer).toMatchObject(testOwner);

    service
      .findOne({ id: '123' })
      .catch((e) => expect(e).toEqual('Developer not found'));
  });
});
