import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RegisterDto } from '../../sso/src/dto/register.dto';

import { LoginDto } from '../../sso/src/dto/login.dto';
import { OperationDto } from '../../bank/src/dto/operation.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy,
    @Inject('BANK_SERVICE') private readonly bankClient: ClientProxy,
  ) {}

  @Post('auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this.ssoClient.send({ cmd: 'register' }, registerDto);
  }

  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.ssoClient.send({ cmd: 'login' }, loginDto);
  }

  @Get('bank/operations')
  getBankOperations() {
    return this.bankClient.send({ cmd: 'get-operations' }, {});
  }

  @Post('bank/operations')
  createBankOperation(@Body() operationData: OperationDto) {
    return this.bankClient.send({ cmd: 'create-operation' }, operationData);
  }
}
