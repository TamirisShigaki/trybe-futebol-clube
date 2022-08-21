import * as express from 'express';
import MactheController from '../controllers/macthe.controller';
import 'express-async-errors';

const router = express.Router();
const mactheController = new MactheController();

router.get('/matches', (req, res) => mactheController.getMacthe(req, res));

export default router;
