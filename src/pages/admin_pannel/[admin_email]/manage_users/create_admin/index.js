import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPannelBreadcrumb from '../../../../../components/admin_pannel_components/common/admin_pannel_breadcrumb/AdminPannelBreadcrumb';
import AdminPannelLayoutContainer from '../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer';
import { fetcher } from '../../../../../hooks/http_req/DataFetch';
import { storeUserData } from '../../../../../redux/user_data/action';
import AlertToast from '../../../../../utilities/alertToast/AlertToast';
import {
	FormButton,
	FormikTextField,
} from '../../../../../utilities/Form/FormField';
import { CreateAdminFormValidator } from '../../../../../utilities/Formik/Validators/AllFormValidators';
import toastConfig from '../../../../../utilities/toastConfig';
import ErrorPage from '../../../../404';

export default function CreateAdmin({ this_user }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeUserData(this_user));
	});

	if (!this_user?.user_role === 'admin') {
		return <ErrorPage />;
	}

	// formik hook
	const {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	} = CreateAdminFormValidator();

	// alert toast
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	const bread_nav = 'authentication / create admin';
	return (
		<>
			<AdminPannelLayoutContainer
				title='Create Admin'
				description="This is create admin page of 'Daily Needs Grocery' web application dashboard."
			>
				<AdminPannelBreadcrumb
					page_name='create admin'
					breadcrumb_name={bread_nav}
				/>
				<div id='create_user_page_wrapper'>
					<div className='bg-white lg:!p-2.4 xs:p-1.5 rounded-md md:!w-3/6 xs:w-full shadow-xl'>
						{toastOn && <AlertToast toast_config={toast_config} />}
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							<Form>
								<FormikTextField
									form_label='user name'
									type='text'
									name='user_name'
								/>
								<FormikTextField
									form_label='user email'
									type='email'
									name='user_email'
								/>

								<FormButton
									type='submit'
									btn_name='Create Admin'
									processing={processing}
								/>
							</Form>
						</Formik>
					</div>
				</div>
			</AdminPannelLayoutContainer>
		</>
	);
}

// find the right user here
export async function getStaticPaths() {
	const all_users = await fetcher('admin_pannel_api/all_users');
	const user = all_users.map((user) => ({
		params: { admin_email: user.user_email },
	}));
	return {
		paths: user,
		fallback: false,
	};
}

// return the data here
export async function getStaticProps({ params }) {
	const { admin_email } = params;
	const this_user = await fetch(
		`admin_pannel_api/manage_users/single_user/${admin_email}`
	);

	return { props: { this_user }, revalidate: 30 };
}
