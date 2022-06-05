/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTaskDto } from '../../dto/task.create.dto';
import { CreateSprintDto } from '../../dto/sprint.create.dto';
import { CreateDeveloperDto } from '../../dto/developer.create.dto';
import { DeveloperDto } from '../../dto/developer.dto';
import { TaskEntity } from '../../entity/task.entity';
import { SprintEntity } from '../../entity/sprint.entity';
import { DeveloperEntity } from '../../entity/developer.entity';

export const testOwner: DeveloperEntity = {
  id: 'test-owner-id',
  username: 'test-owner-name',
  email: 'test-owner-email',
  password: 'test-owner-password',
  hashPassword: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
export const testTasks: TaskEntity[] = [
  {
    id: '12138-1egaze-1e1e1e-1e1e1e',
    name: 'Task 1',
    createdOn: new Date(),
  },
  {
    id: 'e123f-1egaze-1e1e1e-1e1e1e',
    name: 'Task 2',
    createdOn: new Date(),
  },
];
export const testSprints: SprintEntity[] = [
  {
    id: 'test-sprint-id-1',
    name: 'test-sprint-name-1',
    description: 'test-sprint-description-1',
    createdOn: new Date(),
    updatedOn: new Date(),
    owner: testOwner,
    tasks: [testTasks[0]],
  },
  {
    id: 'test-sprint-id-2',
    name: 'test-sprint-name-2',
    description: 'test-sprint-description-2',
    createdOn: new Date(),
    updatedOn: new Date(),
    owner: testOwner,
    tasks: [testTasks[1]],
  },
];
export const mockTaskRepository = {
  find: jest.fn().mockImplementation(async (): Promise<TaskEntity[]> => {
    return Promise.resolve(testTasks);
  }),
  findOne: jest
    .fn()
    .mockImplementation(
      async (id: string): Promise<TaskEntity> =>
        testTasks.find((task) => task.id === id),
    ),
  create: jest
    .fn()
    .mockImplementation(
      (sprintId: string, taskDto: CreateTaskDto): TaskEntity => {
        const task = new TaskEntity();
        const sprint = mockSprintRepository.findOne(sprintId);
        task.name = taskDto.name;
        task.id = 'some-random-id';
        task.sprint = sprint;
        return task;
      },
    ) as (sprintId: string, taskDto: CreateTaskDto) => TaskEntity,
  save: jest.fn().mockImplementation((task: TaskEntity): TaskEntity => task),
  destroy: jest.fn().mockImplementation((task: TaskEntity) => true),
};
export const mockSprintRepository = {
  find: jest
    .fn()
    .mockImplementation(
      async (): Promise<SprintEntity[]> => Promise.resolve(testSprints),
    ),
  findOne: jest
    .fn()
    .mockImplementation(
      async (id: string): Promise<SprintEntity> =>
        Promise.resolve(testSprints.find((sprint) => sprint.id === id)),
    ),
  create: jest
    .fn()
    .mockImplementation(
      (userDto: DeveloperDto, createSprintDto: CreateSprintDto): SprintEntity => {
        const sprint = new SprintEntity();
        sprint.name = createSprintDto.name;
        sprint.id = 'some-random-id';
        sprint.owner = testOwner;
        return sprint;
      },
    ),
  save: jest.fn((sprint: SprintEntity): SprintEntity => sprint),
  delete: jest.fn((id: string) => Promise.resolve(true)),
};
export const mockDeveloperRepository = {
  find: jest.fn(
    async (): Promise<DeveloperEntity[]> => Promise.resolve([testOwner]),
  ),
  findOne: jest.fn(async (id: string): Promise<DeveloperEntity> => {
    if (id == testOwner.id) {
      return Promise.resolve(testOwner);
    }
    return Promise.reject('Developer not found');
  }),
  create: jest.fn((developerDto: CreateDeveloperDto): DeveloperEntity => {
    const developer = new DeveloperEntity();
    developer.username = developerDto.username;
    developer.email = developerDto.email;
    developer.password = developerDto.password;
    return developer;
  }),
  save: jest.fn((developer: DeveloperEntity): DeveloperEntity => developer),
};
