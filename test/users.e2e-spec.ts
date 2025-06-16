import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) and (GET)', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'john' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .get('/users?limit=1&offset=0')
      .expect(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('john');
  });
});
