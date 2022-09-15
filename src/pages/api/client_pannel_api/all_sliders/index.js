import nc from 'next-connect';

// products getting function here
const handler = nc();

handler.get(homeSlider);

// function export here
export default handler;
