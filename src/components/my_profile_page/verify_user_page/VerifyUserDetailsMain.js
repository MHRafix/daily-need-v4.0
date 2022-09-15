import { useSelector } from 'react-redux';
import { MyProfileErrMssg } from '../../../utilities/AlertMessage';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import VerifyUserContent from './VerifyUserContent';

export default function VerifyUserDetailsMain() {
	// logged in user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	const bread_string = `${userInfo?.user_name} / My Profile / user verification`;

	if (!userInfo?.user_email) {
		// prevent fake user
		const bread_string = 'fake user';

		return (
			<MyProfileErrMssg
				bread_string={bread_string}
				message='You are not logged in. Please login to explore more!'
			/>
		);
	}

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<VerifyUserContent />
			</ProfileContentContainer>
		</>
	);
}
