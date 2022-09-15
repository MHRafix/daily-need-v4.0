import nc from 'next-connect';
import { addReview } from '../../../../../controllers/client_pannel_api/add_reviews';

const handler = nc();

handler.post(addReview);

export default handler;
