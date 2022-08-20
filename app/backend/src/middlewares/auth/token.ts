import 'dotenv/config';
import * as JWT from 'jsonwebtoken';
import IUser from '../../interfaces/user.interface';

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
}
