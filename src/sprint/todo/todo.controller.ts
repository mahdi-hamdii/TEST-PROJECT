import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SprintListDto } from './dto/sprint.list.dto';
import { SprintDto } from './dto/sprint.dto';
import { CreateSprintDto } from './dto/sprint.create.dto';
import { SprintService } from './sprint.service';
import { DeveloperDto } from './dto/developer.dto';

@Controller('api/sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Get()
  async findAll(@Req() req: any): Promise<SprintListDto> {
    const sprints = await this.sprintService.getAllSprint();
    return { sprints };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SprintDto> {
    return await this.sprintService.getOneSprint(id);
  }

  @Post()
  async create(
    @Body() createSprintDto: CreateSprintDto,
    @Req() req: any,
  ): Promise<SprintDto> {
    const { developerId } = createSprintDto;

    return await this.sprintService.createSprint(developerId, createSprintDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() sprintDto: SprintDto,
  ): Promise<SprintDto> {
    return await this.sprintService.updateSprint(id, sprintDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<SprintDto> {
    return await this.sprintService.destorySprint(id);
  }
}
