import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('SSO_SERVICE') private readonly ssoClient: ClientProxy) {}

  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido. Usa: Bearer <token>',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const isValid: boolean = await firstValueFrom(
        this.ssoClient.send({ cmd: 'verifyToken' }, { token }),
      );

      if (!isValid) {
        throw new UnauthorizedException('El token es inválido o ya expiró');
      }
      return true;
    } catch (error) {
      this.logger.error('Error detallado en el Guard:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException(
        'Error de comunicación interna con el SSO',
      );
    }
  }
}
