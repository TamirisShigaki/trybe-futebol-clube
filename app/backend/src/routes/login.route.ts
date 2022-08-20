import * as express from 'express';
import LoginController from '../controllers/login.controller';
import 'express-async-errors';

const router = express.Router();
const login = new LoginController();

router.post('/login', (req, res) => login.login(req, res));

export default router;
