import { useSelector } from 'react-redux';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import HistoryDownloadContent from './HistoryDownloadContent';

export default function HistoryDownloadMain({ my_orders }) {
	// logged in user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	// breadcrunb navigation
	const bread_string = `${userInfo?.user_name} / my profile / history download`;

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<HistoryDownloadContent my_orders={my_orders} />
			</ProfileContentContainer>
		</>
	);
}
