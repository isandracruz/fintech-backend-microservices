import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClientsModule.register([
      {
        name: 'SSO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SSO_SERVICE_HOST || '127.0.0.1',
          port: 3001,
        },
      },
      {
        name: 'BANK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BANK_SERVICE_HOST || '127.0.0.1',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
