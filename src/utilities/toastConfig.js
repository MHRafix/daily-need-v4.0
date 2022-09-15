import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { MdCloudDone } from 'react-icons/md';

export default function toastConfig(setToastOn, toastType, toastText) {
	// handle close toast here
	const handleRemoveToast = () => {
		setToastOn(false);
	};

	// auto close toast after ther 5000ms delay
	if (toastText) {
		setTimeout(() => {
			setToastOn(false);
		}, 5000);
	}

	// toast setting configuration here
	const toast_config = {
		toastStyle: toastType,
		alertText: toastText,
		toastIcon:
			toastType === 'error_toast' ? <BiErrorCircle /> : <MdCloudDone />,

		handleRemoveToast: handleRemoveToast,
	};

	return { toast_config };
}
