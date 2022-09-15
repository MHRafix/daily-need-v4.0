import axios from 'axios';
import { useState } from 'react';

export default function useUpdateReq() {
	// toast state here
	const [toastOn, setToastOn] = useState(false);
	const [toastType, setToastType] = useState('');
	const [toastText, setToastText] = useState('');

	const handleUpdate = async (end_point) => {
		const cnfDel = window.confirm('Are you sure ?');
		if (cnfDel) {
			try {
				const { data } = await axios.put(`/api/${end_point}`);

				if (data?.success) {
					setToastType('success_toast');
					setToastOn(true);
					setToastText(data?.success);
				} else {
					setToastType('error_toast');
					setToastOn(true);
					setToastText(data?.error);
				}
			} catch (err) {
				setToastType('error_toast');
				setToastOn(true);
				setToastText(err.message);
			}
		}
	};

	return {
		toastOn,
		setToastOn,
		toastType,
		toastText,
		handleUpdate,
	};
}
