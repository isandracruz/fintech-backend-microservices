import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountsService {
  getHello(): string {
    return 'Hello World!';
  }
}
