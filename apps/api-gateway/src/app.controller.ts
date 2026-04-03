import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDto } from 'apps/sso/src/dtos/register.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy) {}

  @Post('auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this.ssoClient.send({ cmd: 'register' }, registerDto);
  }
}
