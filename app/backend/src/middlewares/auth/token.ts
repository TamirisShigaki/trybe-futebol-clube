import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import IUser from '../../interfaces/user.interface';
import CustomError from '../CustomError';

const secret = process.env.JWT_SECRET || 'senhasecreta';

export default class Token {
  static newToken(data: Omit<IUser, 'password'>): string {
    const jwtConfig: JWT.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = JWT.sign({ data }, secret, jwtConfig);

    return token;
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'Token notFound');
      }

      const data = JWT.verify(token, secret);
      req.body.user = data;
      return next();
    } catch (error) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  }
}
