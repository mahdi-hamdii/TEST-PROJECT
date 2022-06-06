import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TaskService } from '@sprint/task/task.service';
import { SprintService } from '@sprint/sprint.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/tasks (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect({ sprints: await app.get(SprintService).getAllSprint() });
  });


  afterAll(async () => {
    await app.close();
  });



});