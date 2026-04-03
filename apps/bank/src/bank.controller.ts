import { Controller } from '@nestjs/common';
import { BankService } from './bank.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @MessagePattern({ cmd: 'get-operations' })
  async getOperations() {
    return this.bankService.getOperations();
  }
}
