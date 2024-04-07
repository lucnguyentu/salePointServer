import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

export const processPayment = catchAsyncErrors(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'VND',
        metadata: {
            company: '3L1K',
        },
    });

    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
