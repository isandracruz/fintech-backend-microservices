import { Test, TestingModule } from '@nestjs/testing';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';
import { User } from './entities/user.entity';
import { LoginDto } from './dtos/login.dto';

describe('SsoController', () => {
  let ssoController: SsoController;

  const mockSsoService = {
    register: jest.fn(),
    login: jest.fn(),
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

  describe('handleLogin', () => {
    it('should login a user successfully', async () => {
      const mockLoginData = {
        email: 'test@example.com',
        password: 'password123',
      } as LoginDto;

      const mockExpectedResult = {
        message: 'Login successful',
        access_token: 'jwt-token',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
        },
      };

      mockSsoService.login.mockResolvedValue(mockExpectedResult);

      const result = await ssoController.handleLogin(mockLoginData);

      expect(result).toEqual(mockExpectedResult);
      expect(mockSsoService.login).toHaveBeenCalledTimes(1);
      expect(mockSsoService.login).toHaveBeenCalledWith(mockLoginData);
    });
  });
});
