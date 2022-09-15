import nc from 'next-connect';
import { trackOrder } from '../../../../controllers/user_dashboard_api/track_order';

// products getting function here
const handler = nc();

handler.get(trackOrder);

// function export here
export default handler;
