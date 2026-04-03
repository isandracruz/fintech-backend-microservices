import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('should ', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const httpServer = app.getHttpServer();

    // 1. Fase de Ataque: Simulamos 10 peticiones rápidas
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await request(httpServer).post('/api/auth/login').send({
        email: 'test@test.com',
        password: 'password123', // <--- Ahora Bcrypt tendrá algo que comparar
      });
      console.log('🚀 ~ response:', response);

      // Comprobamos que NO nos esté bloqueando todavía (el status NO debe ser 429)
      // Puede darnos 400 por no enviar datos, pero eso está bien, significa que pasó la seguridad.
      expect(response.status).not.toBe(429);
    }

    // 2. Fase de Bloqueo: La petición número 11 DEBE ser rechazada por el Throttler
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const blockedResponse = await request(httpServer)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123', // <--- Ahora Bcrypt tendrá algo que comparar
      });

    // 429 es el código oficial de HTTP para "Too Many Requests"
    expect(blockedResponse.status).toBe(429);
  });
});
