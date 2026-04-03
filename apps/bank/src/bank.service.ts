import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockApiOperation } from './interfaces/mock-api-response.interface';
import { OperationDto } from './dto/operation.dto';

@Injectable()
export class BankService {
  constructor(private readonly configService: ConfigService) {}

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
          fecha: operation.createdAt,
          tipo: operation.operationType,
          monto: operation.amount,
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
}
