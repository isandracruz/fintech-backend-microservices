import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { SsoService } from './sso.service';
@Controller()
export class SsoController {
  constructor(private readonly ssoService: SsoService) {}

  @MessagePattern({ cmd: 'register' })
  handleRegister(@Payload() data: RegisterDto) {
    return this.ssoService.register(data);
  }
}
