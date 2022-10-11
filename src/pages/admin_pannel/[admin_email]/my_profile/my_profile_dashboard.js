import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPannelLayoutContainer from '../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer';
import { fetcher } from '../../../../hooks/http_req/DataFetch';
import ErrorPage from '../../../../pages/404';
import { storeUserData } from '../../../../redux/user_data/action';

export default function MyProfileDashboard({
	all_orders,
	all_users,
	all_products,
	this_user,
}) {
	// store categories to redux
	const dispatch = useDispatch();
	const this_user_email = this_user.user_email;
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	useEffect(() => {
		if (this_user_email === userInfo.user_email) {
			dispatch(storeUserData(this_user));
		}
	});

	if (!this_user?.user_role === 'admin') {
		return <ErrorPage />;
	}

	return (
		<>
			<AdminPannelLayoutContainer
				title='Admin Profile Dashboard'
				description="This is admin profile dashboard of 'Daily Needs Grocery' web application."
			></AdminPannelLayoutContainer>
		</>
	);
}

// find the user
export async function getStaticPaths() {
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');
	const user = all_users.map((user) => ({
		params: { admin_email: user.user_email },
	}));
	return {
		paths: user,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const { admin_email } = params;
	const this_user = await fetcher(
		`admin_pannel_api/manage_users/single_user/${admin_email}`
	);

	return {
		props: { this_user },
		revalidate: 30,
	};
}
