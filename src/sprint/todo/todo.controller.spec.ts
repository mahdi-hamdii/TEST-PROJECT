import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintEntity } from './entity/sprint.entity';
import { DeveloperEntity } from './entity/developer.entity';
import {
  mockSprintRepository,
  mockDeveloperRepository,
} from './test-artifacts/repositories/mocks';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { DevelopersService } from './developers.service';

describe('Sprint Controller', () => {
  let controller: SprintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(SprintEntity),
          useValue: mockSprintRepository,
        },
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: mockDeveloperRepository,
        },
        SprintService,
        DevelopersService,
      ],
      controllers: [SprintController],
    }).compile();

    controller = module.get<SprintController>(SprintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
