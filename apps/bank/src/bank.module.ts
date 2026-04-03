import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'bank-service',
              brokers: [
                configService.get<string>('KAFKA_BROKER') || 'localhost:9092',
              ],
            },
            consumer: {
              groupId: 'bank-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
