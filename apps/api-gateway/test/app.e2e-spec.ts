import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { type App } from 'supertest/types';

describe('API Gateway - Security (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should block requests after exceeding the limit (Error 429 Too Many Requests)', async () => {
    const httpServer = app.getHttpServer() as App;
    const limit = 10;

    const attackRequests: Promise<any>[] = [];

    for (let i = 0; i < limit; i++) {
      attackRequests.push(
        request(httpServer).post('/api/auth/login').send({
          email: 'test@test.com',
          password: 'password123',
        }),
      );
    }

    const responses = await Promise.all(attackRequests);

    responses.forEach((res: Response) => {
      expect(res.status).not.toBe(429);
    });

    const blockedResponse = await request(httpServer)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123',
      });

    expect(blockedResponse.status).toBe(429);
  });
});
