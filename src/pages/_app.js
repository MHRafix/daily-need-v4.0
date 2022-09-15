import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { wrapper } from '../redux/store';
import '../styles/index.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
	const queryClient = new QueryClient();

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
