import nc from 'next-connect';
import { brandSlider } from '../../../../controllers/client_pannel_api/brand_slider';

// products getting function here
const handler = nc();

handler.get(brandSlider);

// function export here
export default handler;
