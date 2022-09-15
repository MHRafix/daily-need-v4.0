import { ErrorMessage, Field } from 'formik';
import Image from 'next/image';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uuid from 'react-uuid';
import Loader from '../../images/loader/loader.gif';

// custom text field
export const FormTextField = ({
	form_label,
	type,
	required,
	setState,
	defaultValue,
	disabled,
}) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<input
				type={type}
				id='field_input'
				defaultValue={defaultValue}
				onChange={(e) => setState(e.target.value)}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
};

// custom file field
export const FormFileField = ({ required, setState }) => {
	return (
		<div>
			<label
				id='input_label'
				htmlFor='file'
				style={{
					width: '200px',
					height: '200px',
					display: 'block',
					margin: '10px auto',
				}}
			>
				<div id='file_field_wrapper'>
					<FaCloudUploadAlt />
					<input
						type='file'
						id='file'
						accept='image/*'
						onChange={(e) => setState(e.target.files[0])}
						required={required}
					/>
				</div>
			</label>
		</div>
	);
};

// custom commetn field
export const FormTextArea = ({ form_label, cols, rows, required }) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<textarea id='field_input' cols={cols} rows={rows}></textarea>
		</div>
	);
};

// custom form button
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

// formik form text field
export const FormikTextField = ({ form_label, type, name }) => {
	const style = {
		padding: '8px',
		border: '1px solid #564d4d24',
		borderRadius: '2px',
		outline: 'none',
		width: '100%',
		margin: '4px 0px',
		fontSize: '15px',
		color: '#333',
		textDecoration: 'none',
		fontWeight: 400,
	};

	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='label'>
				{form_label}
				{/* {required && <span id="required_sign">*</span>} */}
				<span id='required_sign'>*</span>
			</label>
			<br />
			<Field type={type} name={name} id={name} style={style} />
			&nbsp;
			<span className='text-red-500 text-light'>
				<ErrorMessage name={name} />
			</span>
		</div>
	);
};

// formik form select input
export const FormikSelectField = ({ form_label, options, name }) => {
	const style = {
		padding: '8px',
		border: '1px solid #564d4d24',
		borderRadius: '2px',
		outline: 'none',
		width: '100%',
		margin: '4px 0px',
		fontSize: '15px',
		color: '#333',
	};

	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='label'>
				{form_label}
				{/* {required && <span id="required_sign">*</span>} */}
				<span id='required_sign'>*</span>
			</label>
			<br />
			<Field as='select' name={name} id={name} style={style}>
				{options.map((option) => (
					<option key={uuid()} value={option.category}>
						{option.category.toUpperCase()}
					</option>
				))}
			</Field>
			&nbsp;
			<span className='text-red-500 text-light'>
				<ErrorMessage name={name} />
			</span>
		</div>
	);
};

// formik file field
export const FormikFileField = ({
	form_label,
	setState,
	type,
	name,
	required,
}) => {
	const style = {
		padding: '8px',
		border: '1px solid #564d4d24',
		borderRadius: '2px',
		outline: 'none',
		width: '100%',
		margin: '4px 0px',
		fontSize: '15px',
		color: '#333',
	};

	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
				{/* <span id="required_sign">*</span> */}
			</label>
			<br />
			<input
				type={type}
				accept='image/*'
				onChange={(e) => setState(e.target.files[0])}
				required={required}
				name={name}
				id={name}
				style={style}
			/>
			&nbsp;
		</div>
	);
};
