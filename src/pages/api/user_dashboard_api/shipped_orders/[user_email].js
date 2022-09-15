// shipped orders for history download
import nc from 'next-connect';
import { shippedOrders } from '../../../../controllers/user_dashboard_api/shipped_orders';

// products getting function here
const handler = nc();

handler.get(shippedOrders);

// function export here
export default handler;
