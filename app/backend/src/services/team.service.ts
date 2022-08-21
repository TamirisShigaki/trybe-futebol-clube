import Teams from '../database/models/teams';
import 'dotenv/config';

export default class TeamService {
  constructor(private modelT = Teams) {
    this.modelT = modelT;
  }

  public async getTeam() {
    const result = await this.modelT.findAll();

    return result;
  }

  public async getIDTeam(id: number) {
    const result = await this.modelT.findOne({
      where: { id },
      raw: true,
    });

    return result;
  }
}
