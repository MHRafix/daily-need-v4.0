import nc from 'next-connect';
import { verifyUser } from '../../../../../controllers/client_pannel_api/verify_user';

const handler = nc();

handler.post(verifyUser);

export default handler;
