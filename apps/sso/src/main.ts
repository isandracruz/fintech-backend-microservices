import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SSO-Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SsoModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );

  await app.listen();
  logger.log('Microservicio SSO escuchando por TCP en el puerto 3001');
}
void bootstrap();
