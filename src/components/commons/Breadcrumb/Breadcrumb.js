import NextLink from 'next/link';
import React from 'react';

export default function Breadcrumb({ bread_nav }) {
	return (
		<div className='breadcrumb_wrapper flex'>
			<NextLink href='/' passHref>
				<button className='home_nav'>Home </button>
			</NextLink>
			<div className='tracking-wider capitalize'>&nbsp;/ {bread_nav}</div>
		</div>
	);
}
