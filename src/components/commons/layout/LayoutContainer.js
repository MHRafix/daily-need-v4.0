import { motion } from 'framer-motion';
import Head from 'next/head';
import { IoIosArrowUp } from 'react-icons/io';
import ScrollToTop from 'react-scroll-to-top';
import FooterCopyrightArea from '../Footer/FooterCopyrightArea';
import Header from '../Header/Header';

export default function LayoutContainer({ children, title, description }) {
	return (
		<motion.div
			className='page_main_wrapper'
			initial={{ opacity: 0.7 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0.7 }}
		>
			<Head>
				<title>{title ? `Daily Needs - ${title}` : 'Daily Needs'}</title>
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* app header is here */}
			<header>
				<Header />
			</header>
			{/* app body is here */}
			<main>
				<div className='container_wrapper'>{children}</div>

				{/* scroll to top btn */}
				<div>
					<ScrollToTop
						smooth={true}
						top={300}
						color='#fff'
						component={<IoIosArrowUp />}
						id='gotop_client_btn'
					/>
				</div>
			</main>

			{/* app footer is here */}
			<footer className='bg-slate-100 mt-20'>
				<FooterCopyrightArea />
			</footer>
		</motion.div>
	);
}
