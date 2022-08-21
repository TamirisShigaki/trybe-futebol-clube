import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private serviceT = new TeamService()) {
    this.serviceT = serviceT;
  }

  public async getTeam(req: Request, res: Response) {
    const result = await this.serviceT.getTeam();

    return res.status(StatusCodes.OK).json(result);
  }
}
