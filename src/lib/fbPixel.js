// lib/pixel.ts
const options = {
	autoConfig: true,
	debug: false,
};

let ReactPixel = null;

const loadPixel = async () => {
	if (!ReactPixel) {
		const mod = await import('react-facebook-pixel');
		ReactPixel = mod.default;
	}
	return ReactPixel;
};

export const initFacebookPixel = async (pixelId) => {
	if (typeof window === 'undefined') return; // 🚀 server এ run হবে না
	const pixel = await loadPixel();
	pixel.init(pixelId, {}, options);
};

export const trackPageView = async () => {
	if (typeof window === 'undefined') return;
	const pixel = await loadPixel();
	pixel.pageView();
};

export const trackEvent = async (event, data = {}) => {
	if (typeof window === 'undefined') return;
	const pixel = await loadPixel();
	pixel.track(event, data);
};
