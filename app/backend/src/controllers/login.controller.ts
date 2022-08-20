import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private serviceL = new LoginService()) {
    this.serviceL = serviceL;
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.serviceL.login(email, password);

    return res.status(StatusCodes.OK).json({ token: result });
  }

  static validateLogin(req:Request, res:Response) {
    const { user } = req.body;

    return res.status(StatusCodes.OK).json({ role: user.data.role });
  }
}
