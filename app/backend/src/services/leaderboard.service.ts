// import { StatusCodes } from 'http-status-codes';
// import CustomError from '../middlewares/CustomError';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import Calculator from '../utils/calculator';

export default class LeaderBoardService {
  constructor(private modelT = Teams) {
    this.modelT = modelT;
  }

  public async table() {
    const result = await this.modelT.findAll(
      {
        attributes: ['teamName'],
        include: [
          { model: Matches,
            as: 'homeTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] },
          { model: Matches,
            as: 'awayTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] },
        ],
      },
    );

    const table = Calculator.calOrder(result, 'home');
    return table;
  }
}
