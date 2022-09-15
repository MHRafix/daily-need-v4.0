import nc from 'next-connect';
import { deleteReview } from '../../../../../controllers/client_pannel_api/delete_review';

const handler = nc();

handler.delete(deleteReview);

export default handler;
