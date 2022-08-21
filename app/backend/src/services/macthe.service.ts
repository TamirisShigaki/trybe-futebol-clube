import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import 'dotenv/config';

export default class MactheService {
  constructor(private modelM = Matches) {
    this.modelM = modelM;
  }

  public async getMacthe() {
    const result = await this.modelM.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ] });

    return result;
  }
}
