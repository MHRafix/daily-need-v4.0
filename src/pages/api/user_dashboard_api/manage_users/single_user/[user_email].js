import nc from 'next-connect';
import { singleUser } from '../../../../../controllers/user_dashboard_api/single_user';

const handler = nc();

handler.get(singleUser);

export default handler;
