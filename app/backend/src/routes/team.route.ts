import * as express from 'express';
import TeamController from '../controllers/team.controller';
import 'express-async-errors';

const router = express.Router();
const teamController = new TeamController();

router.get('/teams', (req, res) => teamController.getTeam(req, res));
router.get('/teams/:id', (req, res) => teamController.getIdTeam(req, res));
export default router;
