import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskListDto } from '../dto/task.list.dto';
import { TaskDto } from '../dto/task.dto';
import { CreateTaskDto } from '../dto/task.create.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async findOneTask(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getTask(id);
  }

  @Get('sprint/:id')
  async findTasksBySprint(@Param('id') id: string): Promise<TaskListDto> {
    const tasks = await this.taskService.getTasksBySprint(id);
    return { tasks };
  }

  @Post('sprint/:id')
  async create(
    @Param('id') sprint: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.createTask(sprint, createTaskDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.destroyTask(id);
  }
}
