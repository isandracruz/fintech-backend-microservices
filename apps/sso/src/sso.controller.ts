import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { SsoService } from './sso.service';
import { LoginDto } from './dto/login.dto';
@Controller()
export class SsoController {
  constructor(private readonly ssoService: SsoService) {}

  @MessagePattern({ cmd: 'register' })
  handleRegister(@Payload() data: RegisterDto) {
    return this.ssoService.register(data);
  }

  @MessagePattern({ cmd: 'login' })
  handleLogin(@Payload() data: LoginDto) {
    return this.ssoService.login(data);
  }
}
