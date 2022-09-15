import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../commons/Breadcrumb/Breadcrumb';
import ProfileContentContainer from '../my_profile_dashboard/ProfileContentContainer';
import EditAccountContent from './EditAccountContent';

export default function EditAccountDetailsMain() {
	const router = useRouter();

	// loggedin user data
	const userInfo = useSelector((state) => state.users.loggedin_user);

	// check is user verfiyed or not
	const user_isverified =
		Cookie.get('user_verify') && JSON.parse(Cookie.get('user_verify'));

	// if is not verified then redirect to login page
	useEffect(() => {
		if (!user_isverified) {
			router.push(`/my_account/${userInfo?.user_email}/my_profile/verify_user`);
		}
	});

	// breadcrumb
	const bread_string = `${userInfo?.user_name} / my profile / edit account details`;

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<ProfileContentContainer>
				<EditAccountContent />
			</ProfileContentContainer>
		</>
	);
}
