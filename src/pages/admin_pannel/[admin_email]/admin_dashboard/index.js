import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPannelLayoutContainer from '../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer';
import AdminDashboardMain from '../../../../components/admin_pannel_components/components/admin_dashboard/AdminDashboardMain';
import { fetcher } from '../../../../hooks/http_req/DataFetch';
import ErrorPage from '../../../../pages/404';
import { storeUserData } from '../../../../redux/user_data/action';

export default function AdminDashboard({
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
		if (this_user_email === userInfo?.user_email) {
			dispatch(storeUserData(this_user));
		}
	});

	if (!this_user?.user_role === 'admin') {
		return <ErrorPage />;
	}

	return (
		<>
			<AdminPannelLayoutContainer
				title='Admin Dashboard'
				description="This is admin dashboard of 'Daily Needs Grocery' web application."
			>
				<AdminDashboardMain
					all_orders={all_orders}
					all_users={all_users}
					all_products={all_products}
				/>
			</AdminPannelLayoutContainer>
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

	// all orders
	const all_orders = await fetcher(
		'client_pannel_api/manage_orders/all_orders'
	);

	// all products
	const all_products = await fetcher('client_pannel_api/all_products');

	// all users
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');

	return {
		props: { all_orders, all_products, all_users, this_user },
		revalidate: 30,
	};
}
