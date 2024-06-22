import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            verifyIdToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('setCookie', () => {
    it('should set the authToken cookie and return a success message', async () => {
      const token = 'valid-token';
      const res = {
        cookie: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      const result = await authController.setCookie(token, res);

      expect(res.cookie).toHaveBeenCalledWith('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      expect(res.json).toHaveBeenCalledWith({
        message: 'Cookie set successfully',
      });
      expect(result).toEqual(res.json({ message: 'Cookie set successfully' }));
    });

    it('should return an error message if the token is invalid', async () => {
      const token = 'invalid-token';
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const result = await authController.setCookie(token, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
      expect(result).toEqual(res.json({ message: 'Invalid token' }));
    });
  });
});
