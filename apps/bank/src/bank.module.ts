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
        useFactory: (configService: ConfigService) => {
          const broker = configService.get<string>('KAFKA_BROKER');

          const kafkaCa = configService.get<string>('KAFKA_CA');
          const kafkaKey = configService.get<string>('KAFKA_KEY');
          const kafkaCert = configService.get<string>('KAFKA_CERT');

          const isCloud = !!kafkaCa && !!kafkaKey && !!kafkaCert;

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'bank-service',
                brokers: [broker || 'localhost:9092'],
                ssl: isCloud
                  ? {
                      rejectUnauthorized: false,
                      ca: [kafkaCa],
                      key: kafkaKey,
                      cert: kafkaCert,
                    }
                  : false,
              },
              consumer: {
                groupId: 'bank-consumer',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
