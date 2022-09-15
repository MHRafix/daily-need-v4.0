import nc from 'next-connect';
import { limitedProducts } from '../../../../controllers/client_pannel_api/limited_products';

const handler = nc();

handler.get(limitedProducts);

// function export here
export default handler;
