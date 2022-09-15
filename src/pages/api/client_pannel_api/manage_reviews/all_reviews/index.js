import nc from 'next-connect';
import { allReviews } from '../../../../../controllers/client_pannel_api/all_reviews';

const handler = nc();

handler.get(allReviews);

// function export here
export default handler;
