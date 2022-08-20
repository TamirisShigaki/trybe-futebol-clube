import Users from '../database/models/users';
import Token from '../middlewares/auth/token';

export default class LoginService {
  constructor(private modelU = Users) {
    this.modelU = modelU;
  }

  public async login(email: string) {
    const result = await this.modelU.findOne({
      where: { email },
      raw: true,
    });

    if (!result) {
      throw new Error('Usuario não encontrado');
    }

    const token = Token.newToken(result);

    return token;
  }
}
