import { Form, Formik } from 'formik';
import AlertToast from '../../utilities/alertToast/AlertToast';
import { FormButton, FormikTextField } from '../../utilities/Form/FormField';
import { LoginFormValidator } from '../../utilities/Formik/Validators/AllFormValidators';
import toastConfig from '../../utilities/toastConfig';

export default function LoginForm() {
	const {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	} = LoginFormValidator();

	// toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			{/* message toast alert */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<FormikTextField
						form_label='your email'
						type='email'
						name='user_email'
					/>

					<FormikTextField
						form_label='your password'
						type='password'
						name='user_password'
					/>

					<FormButton
						type='submit'
						btn_name='Signin Now'
						processing={processing}
					/>
				</Form>
			</Formik>
		</>
	);
}
