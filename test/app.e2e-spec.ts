import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SprintService } from '../src/sprint/sprint.service';
import { DevelopersService } from '../src/sprint/developers.service';
import { DeveloperDto } from '../src/sprint/dto/developer.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const owner = {
    developername: 'Hamdi.Mahdi',
    email: 'mahdihamdi@live.fr',
  };
  let dbOwner: DeveloperDto;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbOwner = await app
      .get<DevelopersService>(DevelopersService)
      .findOne({ developername: owner.developername });
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
  it('/api/sprints/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/sprints/fd097652-1cfa-4c98-bff8-d85efc43b007')
      .expect(200)
      .then((resp) => {
        const payload = resp.body;
        delete payload.owner.id;
        expect({
          id: 'fd097652-1cfa-4c98-bff8-d85efc43b007',
          name: 'Traveling Sprint  list',
          description: null,
          owner: dbOwner,
          tasks: [],
        });
      });
  });
  it('/api/sprints (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/sprints')
      .send({
        name: 'Newly Posted sprint for Test purpose',
        description: 'Random description',
        developerId: dbOwner.id,
      })
      .expect(201)
      .then((response) => {
        const payload = response.body;
        delete payload.id;
        expect(payload).toStrictEqual({
          name: 'Newly Posted sprint for Test purpose',
          description: 'Random description',
          owner: dbOwner,
        });
      });
  });
  it('/api/sprints (PUT)', async () => {
    return request(app.getHttpServer())
      .put('/api/sprints/fd097652-1cfa-4c98-bff8-d85efc43b007')
      .send({
        name: 'Edited Name',
        description: 'Edited description of the Office Chores',
        developerId: dbOwner.id,
      })
      .expect(200)
      .then((resp) => {
        const payload = resp.body;
        expect({
          id: 'fd097652-1cfa-4c98-bff8-d85efc43b007',
          name: 'Edited Name',
          description: 'Edited description of the Office Chores',
          owner: dbOwner,
          tasks: [],
        }).toStrictEqual(payload);
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
