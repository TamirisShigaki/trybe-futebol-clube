import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatcheService from '../services/matche.service';

export default class MatcheController {
  constructor(private serviceM = new MatcheService()) {
    this.serviceM = serviceM;
  }

  public async getMatche(_req: Request, res: Response) {
    const result = await this.serviceM.getMatche();

    return res.status(StatusCodes.OK).json(result);
  }

  public async createMatche(req: Request, res: Response) {
    const result = await this.serviceM.createMatche(req.body);

    return res.status(StatusCodes.CREATED).json(result);
  }
}
