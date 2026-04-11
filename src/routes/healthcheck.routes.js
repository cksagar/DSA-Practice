import express from 'express';
import { healthcheckController } from '../controllers/healthcheck.controllers.js';
const router = express.Router();

router.route('/').get(healthcheckController);

export default router;
