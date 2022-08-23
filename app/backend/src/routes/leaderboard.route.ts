import * as express from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';
import 'express-async-errors';

const router = express.Router();
const leaderBoardController = new LeaderBoardController();

router.get('/leaderboard/home', (req, res) => leaderBoardController.table(req, res));

export default router;
