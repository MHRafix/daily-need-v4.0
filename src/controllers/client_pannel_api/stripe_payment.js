/**
 * stripe payment controller
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => {
	const paymentInfo = req.body;
	const amount = paymentInfo.payable_amount * 100;
	const paymentIntent = await stripe.paymentIntents.create({
		currency: 'bdt',
		amount: amount,
		payment_method_types: ['card'],
	});

	// response back
	if (paymentIntent?.client_secret) {
		res
			.status(200)
			.json({ success: true, clientSecret: paymentIntent.client_secret });
	} else {
		res.status(404).json({ error: 'Client secret is not found!' });
	}
};
