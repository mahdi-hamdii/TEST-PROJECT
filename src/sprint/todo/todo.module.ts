import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { SprintEntity } from './entity/sprint.entity';
import { TaskEntity } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperEntity } from './entity/developer.entity';
import { DevelopersService } from './developers.service';

@Module({
  imports: [TypeOrmModule.forFeature([SprintEntity, TaskEntity, DeveloperEntity])],
  controllers: [SprintController, TaskController],
  providers: [SprintService, TaskService, DevelopersService],
})
export class SprintModule {}
