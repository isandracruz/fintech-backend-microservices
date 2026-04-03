import { Controller } from '@nestjs/common';
import { BankService } from './bank.service';
import { MessagePattern } from '@nestjs/microservices';
import { OperationDto } from './dto/operation.dto';

@Controller()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @MessagePattern({ cmd: 'get-operations' })
  async getOperations() {
    return this.bankService.getOperations();
  }

  @MessagePattern({ cmd: 'create-operation' })
  async createOperation(data: OperationDto) {
    return this.bankService.createOperation(data);
  }
}
