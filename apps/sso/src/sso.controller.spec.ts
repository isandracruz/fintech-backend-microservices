import { Test, TestingModule } from '@nestjs/testing';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';

describe('SsoController', () => {
  let ssoController: SsoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SsoController],
      providers: [SsoService],
    }).compile();

    ssoController = app.get<SsoController>(SsoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ssoController.getHello()).toBe('Hello World!');
    });
  });
});
