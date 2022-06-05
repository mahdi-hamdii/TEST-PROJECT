import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from '../dto/task.create.dto';
import { TaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entity/task.entity';
import { toTaskDto } from '../mapper/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintEntity } from '../entity/sprint.entity';

@Injectable()
export class TaskService {
  [x: string]: any;
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    @InjectRepository(SprintEntity)
    private readonly SprintRepo: Repository<SprintEntity>,
  ) {}

  async getTask(id: string): Promise<TaskDto> {
    const task: TaskEntity = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toTaskDto(task);
  }

  async getTasksBySprint(id: string): Promise<TaskDto[]> {
    const tasks: TaskEntity[] = await this.taskRepo.find({
      where: { sprint: { id } },
      relations: ['sprint'],
    });

    return tasks.map((task) => toTaskDto(task));
  }

  async createTask(sprintId: string, taskDto: CreateTaskDto): Promise<TaskDto> {
    const { name } = taskDto;

    const sprint: SprintEntity = await this.sprintRepo.findOne({
      where: { id: sprintId },
      relations: ['tasks', 'owner'],
    });

    const task: TaskEntity = await this.taskRepo.create({
      name,
      sprint,
    });

    await this.taskRepo.save(task);

    return toTaskDto(task);
  }

  async destroyTask(id: string): Promise<TaskDto> {
    const task: TaskEntity = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.taskRepo.delete({ id });

    return toTaskDto(task);
  }
}
