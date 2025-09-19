import Image from 'next/image';
import Loader from '../../images/loader/loader.gif';

export const FormTextField = ({ form_label, required, form, disabled }) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<input
				type={'text'}
				id='field_input'
				{...form.register}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
};

export const FormTextArea = ({
	form_label,
	cols,
	form,
	rows,
	required,
	disabled,
}) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<textarea
				id='field_input'
				cols={cols}
				rows={rows}
				{...form.register}
				required={required}
				disabled={disabled}
			></textarea>
		</div>
	);
};

// form button
export const FormButton = ({ type, btn_name, processing, disable }) => {
	return (
		<div id='field_wrapper' className='!w-full mt-2'>
			{processing ? (
				<button
					type={type}
					id='form_btn_disabled'
					className='lg:!w-full !w-full'
					disabled={disable}
				>
					Loading...
					<Image src={Loader} alt='loader gif' width={100} height={90} />
				</button>
			) : (
				<button
					type={type}
					id='form_btn'
					className='lg:!w-full !w-full'
					disabled={disable}
				>
					{btn_name}
				</button>
			)}
		</div>
	);
};
