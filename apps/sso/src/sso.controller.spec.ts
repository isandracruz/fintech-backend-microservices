import { Test, TestingModule } from '@nestjs/testing';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';
import { User } from './entities/user.entity';

describe('SsoController', () => {
  let ssoController: SsoController;

  const mockSsoService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SsoController],
      providers: [
        {
          provide: SsoService,
          useValue: mockSsoService,
        },
      ],
    }).compile();

    ssoController = app.get<SsoController>(SsoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleRegister', () => {
    it('should register a user successfully', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
      } as User;

      const mockExpectedResult = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      mockSsoService.register.mockResolvedValue(mockExpectedResult);

      const result = await ssoController.handleRegister(mockUserData);

      expect(result).toEqual(mockExpectedResult);
      expect(mockSsoService.register).toHaveBeenCalledTimes(1);
      expect(mockSsoService.register).toHaveBeenCalledWith(mockUserData);
    });
  });
});
