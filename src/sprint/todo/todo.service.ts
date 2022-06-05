import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SprintEntity } from './entity/sprint.entity';
import { SprintDto } from './dto/sprint.dto';
import { toSprintDto } from './mapper/mapper';
import { CreateSprintDto } from './dto/sprint.create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeveloperDto } from './dto/developer.dto';
import { DevelopersService } from './developers.service';

@Injectable()
export class SprintService {
  [x: string]: any;
  constructor(
    @InjectRepository(SprintEntity)
    private readonly sprintRepo: Repository<SprintEntity>,
    private readonly developersService: DevelopersService,
  ) {}

  async getAllSprint(): Promise<SprintDto[]> {
    const sprints = await this.sprintRepo.find({ relations: ['tasks', 'owner'] });
    return sprints.map((sprint) => toSprintDto(sprint));
  }

  async getOneSprint(id: string): Promise<SprintDto> {
    const sprint = await this.sprintRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    });

    if (!sprint) {
      throw new HttpException(
        `Sprint list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toSprintDto(sprint);
  }

  async createSprint(
    developerId: string,
    createSprintDto: CreateSprintDto,
  ): Promise<SprintDto> {
    const { name, description } = createSprintDto;
    const { developername } = await this.developersService.findOne({ id: developerId });
    // get the developer from db
    const owner = await this.developersService.findOne({ where: { developername } });

    const sprint: SprintEntity = await this.sprintRepo.create({
      name,
      description,
      owner,
    });

    await this.sprintRepo.save(sprint);

    return toSprintDto(sprint);
  }

  async updateSprint(id: string, sprintDto: SprintDto): Promise<SprintDto> {
    const { name, description } = sprintDto;

    let sprint: SprintEntity = await this.sprintRepo.findOne({ where: { id } });

    if (!sprint) {
      throw new HttpException(
        `Sprint list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    sprint = {
      id,
      name,
      description,
    };

    await this.sprintRepo.update({ id }, sprint); // update

    sprint = await this.sprintRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    }); // re-query

    return toSprintDto(sprint);
  }

  async destroySprint(id: string): Promise<SprintDto> {
    const sprint: SprintEntity = await this.sprintRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    });

    if (!sprint) {
      throw new HttpException(
        `Sprint list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sprint.tasks && sprint.tasks.length > 0) {
      throw new HttpException(
        `Cannot delete this Sprint list, it has existing tasks`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.sprintRepo.delete({ id }); // delete sprint list

    return toSprintDto(sprint);
  }
}
