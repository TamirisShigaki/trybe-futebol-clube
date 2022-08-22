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
    try {
      const result = await this.modelM.create({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
      });
      return result;
    } catch (error) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
  }

  public async setMatche(id: number) {
    await this.modelM.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatche(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const result = await this.modelM.findByPk(id);

    if (!result) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'There is no match with this ID',
      );
    }

    await this.modelM.update({
      homeTeamGoals, awayTeamGoals,
    }, { where: { id } });
  }
}
