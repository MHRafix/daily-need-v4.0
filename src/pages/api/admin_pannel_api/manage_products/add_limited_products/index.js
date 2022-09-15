import nc from 'next-connect';
import { addLimitedProducts } from '../../../../../controllers/admin_pannel_api/add_limited_products';

const handler = nc();

handler.post(addLimitedProducts);

export default handler;
