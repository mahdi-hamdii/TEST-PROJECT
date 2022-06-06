import { Module } from '@nestjs/common';
import { SprintModule } from './sprint/sprint.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from './sprint/entity/sprint.entity';
import { TaskEntity } from './sprint/entity/task.entity';
import { DeveloperEntity } from './sprint/entity/developer.entity';

@Module({
  imports: [
    SprintModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Hamdi.Mahdi',
      password: '123456',
      database: 'devopsDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SprintEntity, TaskEntity, DeveloperEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
