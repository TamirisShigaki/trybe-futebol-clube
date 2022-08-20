import { compareSync } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import Users from '../database/models/users';
import Token from '../middlewares/auth/token';
import CustomError from '../middlewares/CustomError';

export default class LoginService {
  constructor(private modelU = Users) {
    this.modelU = modelU;
  }

  public async login(email: string, password: string) {
    LoginService.validateUser(email, password);

    const result = await this.modelU.findOne({
      where: { email },
      raw: true,
    });

    if (!result) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const validatePass = compareSync(password, result.password);

    if (!validatePass) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = Token.newToken(result);

    return token;
  }

  static validateUser(email: string, password: string) {
    const { error } = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).validate({ email, password });

    if (error) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }
  }
}
