import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

describe('BankAccountsController', () => {
  let bankAccountsController: BankAccountsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountsController],
      providers: [BankAccountsService],
    }).compile();

    bankAccountsController = app.get<BankAccountsController>(
      BankAccountsController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bankAccountsController.getHello()).toBe('Hello World!');
    });
  });
});
