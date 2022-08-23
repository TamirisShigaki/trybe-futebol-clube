import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private serviceL = new LeaderBoardService()) {
    this.serviceL = serviceL;
  }

  public async table(req: Request, res: Response) {
    const result = await this.serviceL.table();

    return res.status(StatusCodes.OK).json(result);
  }
}
