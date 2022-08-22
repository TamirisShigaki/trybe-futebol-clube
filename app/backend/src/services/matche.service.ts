import { StatusCodes } from 'http-status-codes';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IMatche from '../interfaces/matche.interface';
import CustomError from '../middlewares/CustomError';
import 'dotenv/config';

export default class MatcheService {
  constructor(private modelM = Matches) {
    this.modelM = modelM;
  }

  public async getMatche() {
    const result = await this.modelM.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ] });

    return result;
  }

  public async createMatche(data: IMatche) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;

    if (homeTeam === awayTeam) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const result = await this.modelM.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });

    return result;
  }

  public async setMatche(id: number) {
    await this.modelM.update({ inProgress: false }, { where: { id } });
  }
}
