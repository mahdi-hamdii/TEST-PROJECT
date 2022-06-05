import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  mockTaskRepository,
  mockSprintRepository,
} from '../test-artifacts/repositories/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from '../entity/task.entity';
import { SprintEntity } from '../entity/sprint.entity';
describe('Task Controller', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockTaskRepository,
        },
        {
          provide: getRepositoryToken(SprintEntity),
          useValue: mockSprintRepository,
        },
      ],
      controllers: [TaskController],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
