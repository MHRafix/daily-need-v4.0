import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { initFacebookPixel, trackPageView } from '../lib/fbPixel';
import { wrapper } from '../redux/store';
import '../styles/index.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
	const queryClient = new QueryClient();
	useEffect(() => {
		initFacebookPixel('25103151619292816'); // Replace with your actual ID
		trackPageView(); // Track first page load
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<AnimatePresence mode='wait'>
					<Component {...pageProps} />
				</AnimatePresence>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default wrapper.withRedux(MyApp);
