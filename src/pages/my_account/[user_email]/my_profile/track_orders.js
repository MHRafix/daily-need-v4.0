import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutContainer from '../../../../components/commons/layout/LayoutContainer';
import TrackOrdersMain from '../../../../components/my_profile_page/track_orders/TrackOrdersMain';
import { fetcher } from '../../../../hooks/http_req/DataFetch';
import { storeUserData } from '../../../../redux/user_data/action';
import ErrorPage from '../../../404';

export default function TrackOrder({ active_orders, loggedin_user }) {
	// store user_data to redux
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const user_email = loggedin_user?.user_email;
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	useEffect(() => {
		if (user_email === userInfo?.user_email) {
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
				title='Track Orders'
				description="This is Track Order page of 'Daily Needs Grocery' application!"
			>
				<TrackOrdersMain active_orders={active_orders} />
			</LayoutContainer>
		</>
	);
}

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

export async function getStaticProps({ params }) {
	const { user_email } = params;

	const loggedin_user = await fetcher(
		`user_dashboard_api/manage_users/single_user/${user_email}`
	);

	const active_orders = await fetcher(
		`user_dashboard_api/my_active_orders/${user_email}`
	);

	return { props: { active_orders, loggedin_user }, revalidate: 30 };
}
