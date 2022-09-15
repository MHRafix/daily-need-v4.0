import nc from 'next-connect';
import { myOrders } from '../../../../../controllers/user_dashboard_api/my_orders';

const handler = nc();

handler.get(myOrders);

// function export here
export default handler;
