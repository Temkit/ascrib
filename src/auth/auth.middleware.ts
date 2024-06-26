import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: string | undefined;

    // Check for token in cookie
    const cookieToken = req.cookies['authToken'];
    if (cookieToken) {
      token = cookieToken;
    }

    // If no cookie token, check for bearer token in Authorization header
    if (!token) {
      const authHeader = req.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    console.log('Token found:', token); // Log the token for debugging

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
