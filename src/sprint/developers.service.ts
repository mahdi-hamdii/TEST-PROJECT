import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeveloperDto } from './dto/developer.dto';
import { DeveloperEntity } from './entity/developer.entity';
import { toDeveloperDto } from './mapper/mapper';
import { CreateDeveloperDto } from './dto/developer.create.dto';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly developerRepo: Repository<DeveloperEntity>,
  ) {}

  async findOne(options?: object): Promise<DeveloperDto> {
    const developer = await this.developerRepo.findOne(options);
    return toDeveloperDto(developer);
  }

  async create(developerDto: CreateDeveloperDto): Promise<DeveloperDto> {
    const { developername, password, email } = developerDto;

    // check if the developer exists in the db
    const developerInDb = await this.developerRepo.findOne({ where: { developername } });
    if (developerInDb) {
      throw new HttpException('Developer already exists', HttpStatus.BAD_REQUEST);
    }

    const developer: DeveloperEntity = await this.developerRepo.create({
      developername,
      password,
      email,
    });

    await this.developerRepo.save(developer);

    return toDeveloperDto(developer);
  }

  private _sanitizeDeveloper(developer: DeveloperEntity) {
    delete developer.password;
    return developer;
  }
}
