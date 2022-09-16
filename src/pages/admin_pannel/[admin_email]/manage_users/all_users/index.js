import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPannelLayoutContainer from '../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer';
import ManageAllUsersMain from '../../../../../components/admin_pannel_components/components/manage_users/ManageAllUsersMain';
import { fetcher } from '../../../../../hooks/http_req/DataFetch';
import ErrorPage from '../../../../../pages/404';
import { storeUserData } from '../../../../../redux/user_data/action';

export default function ManageAllUsers({ all_users, this_user }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeUserData(this_user));
	});

	if (!this_user?.user_role === 'admin') {
		return <ErrorPage />;
	}

	return (
		<>
			<AdminPannelLayoutContainer
				title='Manage Users'
				description="This is manage users of 'Daily Needs Grocery' web application admin pannel."
			>
				<ManageAllUsersMain all_users={all_users} />
			</AdminPannelLayoutContainer>
		</>
	);
}

// find the right user here
export async function getStaticPaths() {
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');
	const user = all_users.map((user) => ({
		params: { admin_email: user.user_email },
	}));
	return {
		paths: user,
		fallback: 'blocking',
	};
}

// return the data here
export async function getStaticProps({ params }) {
	const { admin_email } = params;
	const this_user = await fetcher(
		`admin_pannel_api/manage_users/single_user/${admin_email}`
	);

	// all users
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');

	return { props: { all_users, this_user }, revalidate: 30 };
}
