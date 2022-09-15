import nc from 'next-connect';
import { stripePayment } from '../../../../controllers/client_pannel_api/stripe_payment';

// products getting function here
const handler = nc();

handler.post(stripePayment);

// function export here
export default handler;
