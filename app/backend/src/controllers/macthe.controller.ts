import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MactheService from '../services/macthe.service';

export default class MactheController {
  constructor(private serviceM = new MactheService()) {
    this.serviceM = serviceM;
  }

  public async getMacthe(_req: Request, res: Response) {
    const result = await this.serviceM.getMacthe();

    return res.status(StatusCodes.OK).json(result);
  }
}
