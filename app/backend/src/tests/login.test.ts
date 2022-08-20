import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/login.service';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const login = {
    email: 'admin@admin.com',
    password: 'secret_admin',
}
describe('#Login', () => {
  it('Verifica se retorna o status 200 (ok)', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves('token');

    const response = await chai.request(app).post('/login').send(login)
    expect(response.status).to.equal(200);
  });
});
