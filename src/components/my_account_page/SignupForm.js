import { Form, Formik } from 'formik';
import AlertToast from '../../utilities/alertToast/AlertToast';
import {
	FormButton,
	FormikFileField,
	FormikTextField,
} from '../../utilities/Form/FormField';
import { RegistrationFormValidator } from '../../utilities/Formik/Validators/AllFormValidators';
import toastConfig from '../../utilities/toastConfig';

export default function SignupForm({ btn_name }) {
	const {
		initialValues,
		validationSchema,
		onSubmit,
		setUserpic,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	} = RegistrationFormValidator();

	// toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			{/* message toast alert */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			{/* signup form here */}
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

					<FormikTextField
						form_label='user password'
						type='password'
						name='user_password'
					/>

					<FormikTextField
						form_label='retype password'
						type='password'
						name='cnf_password'
					/>

					<FormikFileField
						form_label='profile pic'
						setState={setUserpic}
						type='file'
						name='user_pic'
						required={true}
					/>

					{!btn_name && (
						<p className='text-light text-black4 tracking-wide my-10'>
							Your personal data will be used to support your experience
							throughout this website, to manage access to your account, and for
							other purposes described in our privacy policy.
						</p>
					)}
					<FormButton
						type='submit'
						btn_name={btn_name || 'Signup Now'}
						processing={processing}
					/>
				</Form>
			</Formik>
		</>
	);
}
