import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RegisterDto } from '../../sso/src/dto/register.dto';

import { LoginDto } from '../../sso/src/dto/login.dto';
import { OperationDto } from '../../bank/src/dto/operation.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@ApiTags('API Gateway')
@Controller()
export class AppController {
  constructor(
    @Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy,
    @Inject('BANK_SERVICE') private readonly bankClient: ClientProxy,
  ) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() registerDto: RegisterDto) {
    return this.ssoClient.send({ cmd: 'register' }, registerDto);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login and receive an access token' })
  login(@Body() loginDto: LoginDto) {
    return this.ssoClient.send({ cmd: 'login' }, loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('bank/operations')
  @ApiOperation({ summary: 'Get all bank operations (protected)' })
  getBankOperations() {
    return this.bankClient.send({ cmd: 'get-operations' }, {});
  }

  @UseGuards(AuthGuard)
  @Post('bank/operations')
  @ApiOperation({ summary: 'Create a new bank operation (protected)' })
  createBankOperation(@Body() operationData: OperationDto) {
    return this.bankClient.send({ cmd: 'create-operation' }, operationData);
  }
}
