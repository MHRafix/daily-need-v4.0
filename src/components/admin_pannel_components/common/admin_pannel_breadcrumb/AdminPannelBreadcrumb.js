import NextLink from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AdminPannelBreadcrumb({ page_name, breadcrumb_name }) {
	const userInfo = useSelector((state) => state.users.loggedin_user);

	return (
		<>
			<div className='md:!flex justify-between items-center mb-10 xs:grid gap-5'>
				{/* page name */}
				<div id='page_content_title'>
					<h1
						id='content_title'
						className='md:!text-normal xs:text-sm !text-light_purple tracking-wider'
					>
						{page_name}
					</h1>
					<div id='border_line' className='!bg-light_purple'></div>
					<div id='border_line' className='!bg-light_purple'></div>
				</div>

				{/* breadcrumb */}
				{breadcrumb_name && (
					<div className='flex items-center'>
						<NextLink
							href={`/admin_pannel/${userInfo?.user_email}/admin_dashboard`}
							passHref
						>
							<div className='md:!text-normal xs:text-sm text-black3 tracking-wider capitalize font-semibold cursor-pointer hover:text-light_purple hover:duration-300'>
								dashboard
							</div>
						</NextLink>
						&nbsp;
						<div className='text-black4 md:!text-normal xs:text-sm tracking-wider capitalize'>
							/ {breadcrumb_name}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
