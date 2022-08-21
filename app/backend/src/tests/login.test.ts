import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/login.service';
import Users from '../database/models/users';
import IUser from '../interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import CustomError from '../middlewares/CustomError';
import { StatusCodes } from 'http-status-codes';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const login = {
    email: 'admin@admin.com',
    password: 'secret_admin',
}

const incorrectPassword = {
  email: 'admin@admin.com',
  password: '123456',
}


describe('#Login', () => {
  it('Verifica se retorna o status 200 (ok)', async () => {
    sinon.stub(LoginService.prototype, 'login').resolves('token');

    const response = await chai.request(app).post('/login').send(login)
    expect(response.status).to.equal(200);

    sinon.restore();
  });

  it('Verifica se retorna o status 401', async () => {
    sinon.stub(LoginService.prototype, 'login').callsFake(() => {throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')});

    const response = await chai.request(app).post('/login').send(incorrectPassword)
    expect(response.status).to.equal(401);

    expect(response.body.message).to.equal('Incorrect email or password')

    sinon.restore();
  });
});
