import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({ path: "config/config.env" });

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        // Create a payment intent with the amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'pkr',
            metadata: { integration_check: 'accept_a_payment' },
        });

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendStripeApiKey = (req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
};