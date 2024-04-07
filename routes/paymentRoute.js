import express from 'express';
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payment/process', processPayment);
router.get('/stripeapikey', sendStripeApiKey);

export default router;
