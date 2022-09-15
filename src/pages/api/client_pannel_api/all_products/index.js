import nc from 'next-connect';
import { allProducts } from '../../../../controllers/client_pannel_api/all_products';

const handler = nc();

handler.get(allProducts);

// function export here
export default handler;
