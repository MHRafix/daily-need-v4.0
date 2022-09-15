import nc from 'next-connect';
import { userSignin } from '../../../../../controllers/client_pannel_api/signin';

const handler = nc();

handler.post(userSignin);

export default handler;
