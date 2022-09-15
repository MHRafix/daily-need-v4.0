import { useSelector } from 'react-redux';
import { MyProfileErrMssg } from '../../../utilities/AlertMessage';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import TrackOrdersContent from './TrackOrdersContent';

export default function TrackOrdersMain({ active_orders }) {
	// loggedin user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	const bread_string = `${userInfo?.user_name} / my profile / dashboard`;

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<TrackOrdersContent active_orders={active_orders} />
			</ProfileContentContainer>
		</>
	);
}
