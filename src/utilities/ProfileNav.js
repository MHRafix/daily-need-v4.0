import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ProfileNav({ menu_data }) {
	const userInfo = useSelector((state) => state.users.loggedin_user);
	const { href, menu_name, menu_icon } = menu_data;
	const router = useRouter();
	const { asPath } = router;
	const active_path = `/my_account/${userInfo.user_email}/my_profile${href}`;

	return (
		<NextLink
			href={`/my_account/${userInfo.user_email}/my_profile${href}`}
			passHref
		>
			<div
				id={
					active_path === asPath ? 'profile_nav_active' : 'profile_nav_normal'
				}
			>
				{menu_icon} &nbsp; {menu_name}
			</div>
		</NextLink>
	);
}
