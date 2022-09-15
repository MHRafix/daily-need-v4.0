import React, { useEffect, useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { AiOutlineBarChart, AiOutlineHome } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaShippingFast } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function TrackingStepper() {
	const track_result = useSelector((state) => state.products.track_result);
	const [step, setStep] = useState(1);
	const [notice, setNotice] = useState(
		'Your order is pending. We will confirm as soon as possible!'
	);
	const status = track_result?.order_overview?.order_status;

	useEffect(() => {
		if (status === 'inprogress') {
			setStep((step) => step + 1);
			setNotice(
				'Your order confirm successfully! We are working with your it.'
			);
		} else if (status === 'deliver') {
			setStep((step) => step + 2);
			setNotice('Your order deliver to your address. Please wait for it!');
		} else if (status === 'shipped') {
			setStep((step) => step + 3);
			setNotice(
				'Your order successfully shipped. Thank you for being with us!'
			);
		}
	}, [status]);
	return (
		<>
			<div className='order_id text-center'>
				<h3 className='text-medium tracking-wider font-bold text-black2'>
					{`#${track_result?._id}`.toUpperCase()}
				</h3>

				<p className='tracking-wider text-green text-normal font-semibold lg:!w-2/4 xs:w-full mx-auto my-5'>
					{notice}
				</p>
			</div>

			<Stepper
				activeStep={step}
				connectorStateColors
				connectorStyleConfig={{
					size: 3,
					activeColor: '#ff7600',
					disabledColor: '#ccc',
					completedColor: '#2bd891',
				}}
				styleConfig={{
					size: 45,
					activeBgColor: '#ff7600',
					completedBgColor: '#2bd891',
					inactiveBgColor: '#ccc',
				}}
			>
				<Step label='Pending'>
					<BiLoaderCircle size={25} />
				</Step>
				<Step label='Inprogress'>
					<AiOutlineBarChart size={25} />
				</Step>
				<Step label='On Delivery'>
					<FaShippingFast size={25} />
				</Step>
				<Step label='Shipped'>
					<AiOutlineHome size={25} />
				</Step>
			</Stepper>
		</>
	);
}
