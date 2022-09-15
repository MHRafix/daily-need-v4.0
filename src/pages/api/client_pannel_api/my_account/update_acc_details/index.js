import nc from 'next-connect';
import { updateAccDetails } from '../../../../../controllers/client_pannel_api/update_acc';

const handler = nc();

handler.post(updateAccDetails);

export default handler;
