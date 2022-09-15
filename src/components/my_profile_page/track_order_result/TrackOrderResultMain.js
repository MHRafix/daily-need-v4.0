import { useSelector } from 'react-redux';
import { MyProfileErrMssg } from '../../../utilities/AlertMessage';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import TrackOrderResultContent from './TrackOrderResultContent';

export default function TrackOrdersResultMain() {
	// loggedin user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	const bread_string = `${userInfo?.user_name} / my profile / track order result`;

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<TrackOrderResultContent />
			</ProfileContentContainer>
		</>
	);
}
