export default function useAnimation() {
	/**
	 * fade down to up animation
	 * usein: cart table body item
	 */

	const fadeUp = {
		offscreen: {
			y: 50,
			opacity: 0,
			transition: { duration: 0.3 },
		},

		onscreen: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.3 },
		},

		exit: { y: 50, opacity: 0, transition: { duration: 0.3 } },
	};

	/**
	 * fade right to left animation
	 * usein: mini cart item card
	 */

	const fadeLeft = {
		offscreen: {
			x: -50,
			opacity: 0,
			transition: { duration: 0.2 },
		},

		onscreen: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.2, delay: 0.4 },
		},
		exit: { x: 50, opacity: 0, duration: 0.2 },
	};

	/**
	 * fade left to right animation for
	 * mini cart area wrapper
	 */

	const fadeRight = {
		offscreen: {
			x: 100,
			opacity: 0,
			transition: { duration: 0.3 },
		},

		onscreen: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.3 },
		},

		exit: {
			x: 100,
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
	};

	/**
	 * slide down to up animation
	 * usein: product grid and list card
	 */

	const slideUp = {
		offscreen: {
			y: 100,
			opacity: 0,
			transition: { duration: 0.3 },
		},

		onscreen: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},

		exit: {
			y: 0,
			opacity: 0,
			transition: { duration: 0.3 },
		},
	};

	/**
	 * scale small to big animation
	 * usein: admin dashboard summury grid box
	 */

	const pulseZoom = {
		offscreen: {
			scale: 0.7,
			opacity: 0,
			transition: { duration: 0.3 },
		},

		onscreen: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},

		exit: {
			scale: 0.5,
			opacity: 0,
			transition: { duration: 0.3 },
		},
	};

	/**
	 * fade pop animation
	 * usein: admin dashboard tabledataaction plate
	 */

	const fadePop = {
		offscreen: {
			scale: 0.8,
			opacity: 0,
			transition: {
				duration: 0.2,
			},
		},

		onscreen: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.2,
			},
		},

		exit: {
			scale: 0.5,
			opacity: 0,
			transition: {
				duration: 0.2,
			},
		},
	};

	// return all animation here
	return { fadeUp, slideUp, fadeLeft, fadeRight, pulseZoom, fadePop };
}
