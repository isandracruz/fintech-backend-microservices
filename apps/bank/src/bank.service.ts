import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockApiOperation } from './interfaces/mock-api-response.interface';
import { OperationDto } from './dto/operation.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BankService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  private readonly logger = new Logger(BankService.name);

  async getOperations() {
    this.logger.log('Fetching bank operations');

    const url = this.configService.get<string>('MOCK_API_URL');

    if (!url) {
      throw new Error('The environment variable MOCK_API_URL is not defined');
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = (await response.json()) as MockApiOperation[];

      const operations = data.map(
        (operation): OperationDto => ({
          createdAt: operation.createdAt,
          operationType: operation.operationType,
          amount: operation.amount,
        }),
      );

      return {
        success: true,
        data: operations,
        count: operations.length,
      };
    } catch (error) {
      this.logger.error('Error fetching operations:', error);
      return {
        success: false,
        message:
          'Do not exist operations data or there was an error fetching it',
      };
    }
  }

  async createOperation(data: OperationDto) {
    const url = this.configService.get<string>('MOCK_API_URL');

    if (!url) {
      throw new Error('The environment variable MOCK_API_URL is not defined');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        createdAt: Date.now(),
        operationType: data.operationType,
        amount: data.amount,
      }),
    });

    if (!response.ok) throw new Error('Failed to create operation');

    const rawData = (await response.json()) as MockApiOperation;

    const newOperation: OperationDto = {
      createdAt: rawData.createdAt,
      operationType: rawData.operationType,
      amount: rawData.amount,
    };

    this.kafkaClient.emit('bank.operation.created', {
      key: rawData.id,
      value: newOperation,
    });

    this.logger.log(`Event sent to Kafka for operation ${rawData.id}`);

    return {
      success: true,
      data: newOperation,
    };
  }
}
