import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SprintService } from './../src/sprint/sprint.service';
import { DeveloperDto } from '../src/sprint/dto/developer.dto';
import { TaskService } from '../src/sprint/task/task.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const developer = {
    developername: 'Hamdi.Mahdi',
    email: 'mahdihamdi@live.fr',
  };

  let dbDeveloper: DeveloperDto;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbDeveloper = {
      id: '57603cd2-533c-4791-8adc-cf3ac1448b7d',
  developername: 'Hamdi.Mahdi',
  email: 'mahdihamdi@live.fr',
    }
  });


  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/sprints (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/sprints')
      .expect(200)
      .expect({ sprints: await app.get(SprintService).getAllSprint() });
  });



  it('/api/tasks (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect({ tasks: await app.get(TaskService).getAllTasks() });
  });




  afterAll(async () => {
    await app.close();
  });



});