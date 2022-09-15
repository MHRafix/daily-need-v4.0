import { useSelector } from 'react-redux';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import MyAllOrdersContent from './MyAllOrdersContent';

export default function MyAllOrdersMain({ my_orders }) {
	// loggedin user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	// breadcrunb navigation
	const bread_string = `${userInfo?.user_name} / my profile / manage all orders`;

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<MyAllOrdersContent my_orders={my_orders} />
			</ProfileContentContainer>
		</>
	);
}
