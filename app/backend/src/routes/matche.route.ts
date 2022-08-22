import * as express from 'express';
import MatcheController from '../controllers/matche.controller';
import Token from '../middlewares/auth/token';
import 'express-async-errors';

const router = express.Router();
const matcheController = new MatcheController();

router.get('/matches', (req, res) => matcheController.getMatche(req, res));
router.post('/matches', Token.validateToken, (req, res) => matcheController.createMatche(req, res));
router.patch('/matches/:id/finish', (req, res) => matcheController.setMatche(req, res));
router.patch('/matches/:id', (req, res) => matcheController.updateMatche(req, res));

export default router;
