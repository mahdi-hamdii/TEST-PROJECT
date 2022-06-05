import { TaskDto } from './task.dto';
import { IsNotEmpty } from 'class-validator';
import { DeveloperDto } from './developer.dto';

export class SprintDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;

  owner: DeveloperDto;

  tasks?: TaskDto[];
}
