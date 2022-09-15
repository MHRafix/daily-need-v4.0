import nc from 'next-connect';
import { userSignup } from '../../../../../controllers/client_pannel_api/signup';

const handler = nc();
handler.post(userSignup);

export default handler;
