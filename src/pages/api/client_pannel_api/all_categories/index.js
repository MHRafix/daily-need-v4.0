import nc from 'next-connect';
import { allCategories } from '../../../../controllers/client_pannel_api/all_categories';

// products getting function here
const handler = nc();

handler.get(allCategories);

// function export here
export default handler;
