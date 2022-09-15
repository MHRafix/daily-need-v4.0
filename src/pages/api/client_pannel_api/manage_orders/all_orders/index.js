import nc from 'next-connect';
import { allOrders } from '../../../../../controllers/client_pannel_api/all_orders';

const handler = nc();

handler.get(allOrders);

// function export here
export default handler;
