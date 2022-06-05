import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintEntity } from '../entity/sprint.entity';
import { TaskEntity } from '../entity/task.entity';
import { TaskService } from './task.service';
import {
  mockTaskRepository,
  mockSprintRepository,
  testSprints,
} from '../test-artifacts/repositories/mocks';
import { HttpException, HttpStatus } from '@nestjs/common';
import { sprints } from '../mock/sprints.mock';
import { CreateTaskDto } from '../dto/task.create.dto';

describe('TaskService', () => {
  let service: TaskService;
  const mockTaskService = {
    getTask: jest.fn(async (id: string): Promise<TaskEntity> => {
      const task = mockTaskRepository.findOne(id);
      if (!task) {
        throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
      }
      return task;
    }),
    getTasksBySprint: jest.fn(async (id: string): Promise<TaskEntity[]> => {
      const tasks = testSprints.filter((sprint) => sprint.id === id)[0].tasks;
      if (!tasks) {
        throw new HttpException(`Tasks doesn't exist`, HttpStatus.BAD_REQUEST);
      }
      return tasks;
    }),
    createTask: jest.fn(
      async (sprintId: string, taskDto: CreateTaskDto): Promise<TaskEntity> => {
        const { name } = taskDto;
        const sprint = await mockSprintRepository.findOne(sprintId);
        const task: TaskEntity = await mockTaskRepository.create(
          sprintId,
          taskDto,
        );
        await mockTaskRepository.save(task);
        return task;
      },
    ),
    destroyTask: jest.fn(async (id: string): Promise<TaskEntity> => {
      const task = mockTaskRepository.findOne(id);
      if (!task) {
        throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
        return Promise.reject('Task not found');
      }
      return Promise.resolve(task);
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockTaskRepository,
        },
        {
          provide: getRepositoryToken(SprintEntity),
          useValue: mockSprintRepository,
        },
        TaskService,
      ],
    })
      .overrideProvider(TaskService)
      .useValue(mockTaskService)
      .compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find a task', async () => {
    const task = await service.getTask('12138-1egaze-1e1e1e-1e1e1e');
    expect(task).toBeDefined();
    expect(task.name).toBe('Task 1');
  });
  it('should return tasks by sprint', async () => {
    const tasks = await service.getTasksBySprint('test-sprint-id-1');
    expect(tasks).toBeDefined();
    expect(tasks[0].name).toBe('Task 1');
  });
  it('should create task', async () => {
    const task = await service.createTask('test-sprint-id-3', { name: 'Task 3' });
    expect(task).toBeDefined();
    expect(task.name).toBe('Task 3');
  });
  it('should destroy task', async () => {
    const task = await service.destroyTask('12138-1egaze-1e1e1e-1e1e1e');
    expect(task).toBeDefined();
    expect(task.name).toBe('Task 1');
  });
});
