import express from 'express';
import { uploadProcessData } from '../config/firebase.js';

const router = express.Router();

router.get('/up', async (req, res, next) => {
    await uploadProcessData();
    res.send("Success");
});

router.get('/hi', (req, res, next) => {
    res.send("Success");
});

export default router;
