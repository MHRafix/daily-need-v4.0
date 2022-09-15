import nc from 'next-connect';
import { updateOrder } from '../../../../../controllers/client_pannel_api/update_order';

const handler = nc();

handler.post(updateOrder);

export default handler;
