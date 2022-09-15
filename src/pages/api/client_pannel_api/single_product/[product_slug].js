import nc from 'next-connect';
import { singleProduct } from '../../../../controllers/client_pannel_api/single_product';

const handler = nc();

handler.get(singleProduct);

export default handler;
