import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import ScrollToTop from 'react-scroll-to-top';
import AdminPannelLeftNavigation from '../AdminPannelNavigation/AdminPannelLeftNavigation';
import AdminPannelTopNavigation from '../AdminPannelNavigation/AdminPannelTopNavigation';

export default function AdminPannelLayoutContainer({
	children,
	title,
	description,
}) {
	const [navigationOn, setNavigationOn] = useState(false);

	return (
		<div className='page_main_wrapper'>
			<Head>
				<title>{title ? `Daily Needs - ${title}` : 'Daily Needs'}</title>
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* app header is here */}
			<div className='dasboard_page_content_layout'>
				<div className='layout_wrapper flex justify-between'>
					{/* admin pannel header here */}
					<header
						className={
							navigationOn
								? 'admin_pannel_left_header_none'
								: 'admin_pannel_left_header_half'
						}
					>
						<div className='left_navigation'>
							<AdminPannelLeftNavigation setNavigationOn={setNavigationOn} />
						</div>
					</header>

					{/* admin pannel body is here */}
					<main
						className={
							navigationOn ? 'admin_pannel_body_full' : 'admin_pannel_body_half'
						}
					>
						<div className='right_content_body lg:!w-full xs:w-screen'>
							<div className='grid'>
								<div className='lg:!p-1.4 xs:p-1 bg-white border-b-1 border-b-slate-200 lg:!w-full xs:w-screen'>
									<AdminPannelTopNavigation
										setNavigationOn={setNavigationOn}
										navigationOn={navigationOn}
									/>
								</div>
								<div className='lg:!p-1.4 xs:p-1 xs:pr-1.5 text-normal lg:!w-full xs:w-screen overflow-hidden'>
									{children}
								</div>

								{/* scroll to top btn */}
								<div>
									<ScrollToTop
										smooth={true}
										top={300}
										color='#fff'
										component={<IoIosArrowUp />}
										id='expand_btn'
									/>
								</div>

								<div className='p-1.5 border-t-1 border-t-slate-300'>
									{/* admin pannel footer is here */}
									<footer className='text-center'>
										<div className='text-sm tracking-wider'>
											Copyright © 2022. &nbsp;
											<Link href='https://rafix.netlify.app/' passHref>
												<a target='_blank' className='text-green font-semibold'>
													Mehedi Hasan Rafiz
												</a>
											</Link>
											&nbsp; All rights reserved
										</div>
									</footer>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
