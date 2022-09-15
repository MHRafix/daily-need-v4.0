import nc from 'next-connect';
import { homeSlider } from '../../../../controllers/client_pannel_api/home_slider';

// products getting function here
const handler = nc();

handler.get(homeSlider);

// function export here
export default handler;
