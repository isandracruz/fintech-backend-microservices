import { Controller, Get } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';

@Controller()
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  getHello(): string {
    return this.bankAccountsService.getHello();
  }
}
