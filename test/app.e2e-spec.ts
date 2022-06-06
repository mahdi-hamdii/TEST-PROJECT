import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SprintService } from '../src/sprint/sprint.service';
import { DeveloperDto } from '../src/sprint/dto/developer.dto';
import { DevelopersService } from '../src/sprint/developers.service';

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
    dbDeveloper = await app
      .get<DevelopersService>(DevelopersService)
      .findOne({ developername: developer.developername });
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

  it('/api/sprints (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/sprints')
      .send({
        name: 'Newly Posted sprint for Test purpose',
        description: 'Random description',
        developerId: dbDeveloper.id,
      })
      .expect(201)
      .then((response) => {
        const payload = response.body;
        delete payload.id;
        expect(payload).toStrictEqual({
          name: 'Newly Posted sprint for Test purpose',
          description: 'Random description',
          owner: dbDeveloper,
        });
      });
  });



  afterAll(async () => {
    await app.close();
  });



});