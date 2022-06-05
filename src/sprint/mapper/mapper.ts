import { TaskDto } from '../dto/task.dto';
import { SprintEntity } from '../entity/sprint.entity';
import { SprintDto } from '../dto/sprint.dto';
import { TaskEntity } from '../entity/task.entity';
import { DeveloperEntity } from '../entity/developer.entity';
import { DeveloperDto } from '../dto/developer.dto';

export const toSprintDto = (data: SprintEntity): SprintDto => {
  const { id, name, description, tasks, owner } = data;

  let sprintDto: SprintDto = {
    id,
    name,
    description,
    owner: owner ? toDeveloperDto(owner) : null,
  };

  if (tasks) {
    sprintDto = {
      ...sprintDto,
      tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
    };
  }

  return sprintDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
  const { id, name } = data;

  const taskDto: TaskDto = {
    id,
    name,
  };

  return taskDto;
};

export const toDeveloperDto = (data: DeveloperEntity): DeveloperDto => {
  const { id, username, email } = data;

  const developerDto: DeveloperDto = {
    id,
    username,
    email,
  };

  return developerDto;
};
