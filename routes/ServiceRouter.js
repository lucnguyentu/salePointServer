import express from 'express';
import { newService } from '../controllers/ServiceController.js';

const router = express.Router();

router.get('/new', newService);

export default router;
