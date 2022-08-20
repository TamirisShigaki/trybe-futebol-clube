import * as express from 'express';
import LoginController from '../controllers/login.controller';
import Token from '../middlewares/auth/token';
import 'express-async-errors';

const router = express.Router();
const login = new LoginController();

router.get('/login/validate', Token.validateToken, (req, res) => LoginController
  .validateLogin(req, res));

router.post('/login', (req, res) => login.login(req, res));

export default router;
