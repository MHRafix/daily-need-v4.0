import nc from 'next-connect';
import { saleProduct } from '../../../../controllers/client_pannel_api/sale_product';

// products getting function here
const handler = nc();

handler.get(saleProduct);

// function export here
export default handler;
