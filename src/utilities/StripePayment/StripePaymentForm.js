import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
const stripePromise = loadStripe(
	`pk_test_51L9MSjFF4UAQKQfLTjespR8ODtWurBNGc035vjhYRd7j9kOLsb2kSSsFbnONQMPnuLfLamvNLjxCoUtg1IANYccP00VAykTik2`
);

export default function StripePaymentForm({ amount, order_id }) {
	return (
		<div id='stripe_payment_form'>
			<Elements stripe={stripePromise}>
				<PaymentForm payable_amount={amount} order_id={order_id} />
			</Elements>
		</div>
	);
}
