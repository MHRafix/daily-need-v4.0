import nc from 'next-connect';
import { myActiveOrders } from '../../../../controllers/user_dashboard_api/my_active_orders';

// products getting function here
const handler = nc();

handler.get(myActiveOrders);

// function export here
export default handler;
