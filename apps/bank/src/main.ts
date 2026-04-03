import { NestFactory } from '@nestjs/core';
import { BankModule } from './bank.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bank-Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BankModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    },
  );

  await app.listen();
  logger.log('Microservice Bank listening for TCP connections on port 3002');
}
void bootstrap();
