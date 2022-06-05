import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSprintDto } from './dto/sprint.create.dto';
import { SprintDto } from './dto/sprint.dto';
import { DeveloperDto } from './dto/developer.dto';
import { SprintEntity } from './entity/sprint.entity';
import { DeveloperEntity } from './entity/developer.entity';
import {
  mockSprintRepository,
  mockDeveloperRepository,
} from './test-artifacts/repositories/mocks';
import { SprintService } from './sprint.service';
import { DevelopersService } from './developers.service';

describe('SprintService', () => {
  let service: SprintService;
  const mockSprintService = {
    getAllSprint: jest.fn(async () => mockSprintRepository.find()),
    getOneSprint: jest.fn(async (id: string) => {
      const sprint = mockSprintRepository.findOne(id);
      if (!sprint) {
        throw new HttpException(
          `Sprint list doesn't exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return sprint;
    }),
    createSprint: jest.fn(
      async (developerId: string, createSprintDto: CreateSprintDto) => {
        const { name, description } = createSprintDto;
        const owner = await mockDeveloperRepository.findOne(developerId);
        const sprint: SprintEntity = await mockSprintRepository.create(
          {
            name,
            description,
            owner,
          },
          createSprintDto,
        );
        await mockSprintRepository.save(sprint);
        return sprint;
      },
    ),
    updateSprint: jest.fn(
      async (id: string, sprintDto: SprintDto): Promise<SprintEntity> => {
        const { name, description } = sprintDto;
        const sprint: SprintEntity = await mockSprintRepository.findOne(id);
        sprint.name = name;
        sprint.description = description;
        await mockSprintRepository.save(sprint);
        return sprint;
      },
    ),
    destroySprint: jest.fn(async (id: string) => {
      const sprint = await mockSprintRepository.findOne(id);
      if (!sprint) {
        throw new HttpException(
          `Sprint list doesn't exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await mockSprintRepository.delete(id);
      return sprint;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintService,
        {
          provide: getRepositoryToken(SprintEntity),
          useValue: mockSprintRepository,
        },
        {
          provide: getRepositoryToken(DeveloperEntity),
          useValue: mockDeveloperRepository,
        },
        DevelopersService,
      ],
    })
      .overrideProvider(SprintService)
      .useValue(mockSprintService)
      .compile();

    service = module.get<SprintService>(SprintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all sprints', async () => {
    const sprints = await service.getAllSprint();
    expect(sprints).toBeDefined();
    expect(sprints).toBeInstanceOf(Array);
    expect(sprints.length).toBeGreaterThanOrEqual(1);
  });
  it('should return one sprint', async () => {
    const sprint = await service.getOneSprint('test-sprint-id-1');
    expect(sprint).toBeDefined();
    expect(sprint.name).toBe('test-sprint-name-1');
  });
  it('should create a sprint', async () => {
    const developerdto: DeveloperDto = {
      id: 'test-owner-id',
      developername: 'test-owner-name',
      email: 'test-owner-email',
    };
    const createSprintDto: CreateSprintDto = {
      name: 'test-sprint-name-1',
      description: 'test-sprint-description-1',
      developerId: developerdto.id,
    };
    const sprint = await service.createSprint('test-owner-id', createSprintDto);
    expect(sprint).toBeDefined();
    expect(sprint.name).toBe('test-sprint-name-1');
  });
  it('should destroy a sprint', async () => {
    const res = await service.destroySprint('test-sprint-id-1');
    expect(res).toBeDefined();
    expect(res).toBeTruthy();
  });
});
