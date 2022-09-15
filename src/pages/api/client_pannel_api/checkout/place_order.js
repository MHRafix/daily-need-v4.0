import nc from 'next-connect';
import { placeOrder } from '../../../../controllers/client_pannel_api/place_order';

const handler = nc();
handler.post(placeOrder);

export default handler;
