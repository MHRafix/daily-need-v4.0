import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutContainer from '../../../../components/commons/layout/LayoutContainer';
import VerifyUserDetailsMain from '../../../../components/my_profile_page/verify_user_page/VerifyUserDetailsMain';
import { fetcher } from '../../../../hooks/http_req/DataFetch';
import { storeUserData } from '../../../../redux/user_data/action';
import ErrorPage from '../../../404';

export default function Verifyuser({ loggedin_user }) {
	// store user_data to redux
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const user_email = loggedin_user.user_email;

	// loogedin user cookie
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	useEffect(() => {
		if (user_email === userInfo.user_email) {
			dispatch(storeUserData(loggedin_user));
		} else {
			setError(true);
		}
	}, [user_email, userInfo?.user_email, dispatch, loggedin_user]);

	if (error) {
		return <ErrorPage />;
	}

	return (
		<>
			<LayoutContainer
				title='Verify User'
				description="This is verify user page of 'Daily Needs Grocery' web application!"
			>
				<VerifyUserDetailsMain />
			</LayoutContainer>
		</>
	);
}

// find the exact user
export async function getStaticPaths() {
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');
	const user = all_users.map((user) => ({
		params: { user_email: user.user_email },
	}));
	return {
		paths: user,
		fallback: 'blocking',
	};
}

// filter user orders from all orders
export async function getStaticProps({ params }) {
	const { user_email } = params;

	// user data
	const loggedin_user = await fetcher(
		`user_dashboard_api/manage_users/single_user/${user_email}`
	);

	return { props: { loggedin_user }, revalidate: 30 };
}
