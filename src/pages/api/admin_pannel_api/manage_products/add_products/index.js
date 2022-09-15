import nc from 'next-connect';
import { addProducts } from '../../../../../controllers/admin_pannel_api/add_product';
const handler = nc();

handler.post(addProducts);

export default handler;
