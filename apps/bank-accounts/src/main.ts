import { NestFactory } from '@nestjs/core';
import { BankAccountsModule } from './bank-accounts.module';

async function bootstrap() {
  const app = await NestFactory.create(BankAccountsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
