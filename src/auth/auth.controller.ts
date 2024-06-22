import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('set-cookie')
  async setCookie(@Body('token') token: string, @Res() res: Response) {
    try {
      // Verify the token before setting it as a cookie
      await this.authService.verifyIdToken(token);
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use 'true' in production
        sameSite: 'strict', // or 'lax' based on your requirements
        maxAge: 3600000, // 1 hour in milliseconds
      });
      return res.json({ message: 'Cookie set successfully' });
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

  @Post('verify-token')
  async verifyToken(@Body('idToken') idToken: string) {
    try {
      const decodedToken = await this.authService.verifyIdToken(idToken);
      return { message: 'Token is valid', uid: decodedToken.uid };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
