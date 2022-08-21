import * as express from 'express';
import TeamController from '../controllers/team.controller';

const router = express.Router();
const teamController = new TeamController();

router.get('/teams', (req, res) => teamController.getTeam(req, res));

export default router;
