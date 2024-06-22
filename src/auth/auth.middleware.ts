import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['authToken'];
    console.log('Cookies:', req.cookies); // Log cookies to verify
    if (!token) {
      return res
        .status(401)
        .send({ message: 'No authentication token provided' });
    }

    try {
      const decodedToken = await this.authService.verifyIdToken(token);
      req['user'] = decodedToken; // Attach user info to the request
      next();
    } catch (error) {
      return res.status(403).send({ message: 'Invalid or expired token' });
    }
  }
}
