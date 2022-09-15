import NextLink from 'next/link';
import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { MdCloudDone } from 'react-icons/md';
import AlertToast from '../../utilities/alertToast/AlertToast';

export default function CheckoutTable({ carted_products }) {
	// calculate total cart amount here
	let total_amount = 0;
	if (carted_products) {
		for (const products of carted_products) {
			total_amount =
				products?.prices?.sale_price > 0
					? total_amount + products?.prices?.sale_price * products?.quantity
					: total_amount + products?.prices?.regular_price * products?.quantity;
		}
	}

	// toast state here
	const [toastOn, setToastOn] = useState(false);
	const [toastType, setToastType] = useState('');
	const [toastText, setToastText] = useState('');

	// handle close toast here
	const handleRemoveToast = () => {
		setToastOn(false);
	};

	// auto close toast after ther 3000ms delay
	if (toastOn) {
		setTimeout(() => {
			setToastOn(false);
		}, 3000);
	}

	// toast setting configuration here
	const toast_config = {
		toastStyle: toastType,
		alertText: toastText,
		toastIcon:
			toastType === 'error_toast' ? <BiErrorCircle /> : <MdCloudDone />,
		handleRemoveToast: handleRemoveToast,
	};

	// handle coupon code discount here
	const [userCoupon, setUserCoupon] = useState('');

	const handleCouponCode = (e) => {
		e.preventDefault();

		const coupon_code = 'gfhdgfdgf';

		if (coupon_code === userCoupon) {
			setToastOn(true);
			setToastType('success_toast');
			setToastText('Wow, congrats!');
		} else {
			setToastOn(true);
			setToastType('error_toast');
			setToastText('Coupon code is invalid!');
		}
	};

	return (
		<>
			{/* alert message toast here */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			<div className='checkout_table_wrapper'>
				<div className='checkout_table_title'>Cart Totals</div>
				<div className='checkout_table'>
					<div className='table_checkout'>
						<div className='table_head_check'>
							<div className='table_head_check_item'>Subtotal</div>
							<div className='table_head_check_item1'>
								৳ {total_amount.toFixed(2)}
							</div>
						</div>
						<div className='table_head_check'>
							<div className='table_head_check_item'>Shipping</div>
							<div className='table_head_check_item1'>
								<h1 className='shipping_calculate'>
									৳ {((total_amount / 100) * 3).toFixed(2)}
								</h1>
								<button className='text-info_color tracking-wide'>
									Address
								</button>
							</div>
						</div>
						<div className='table_head_check'>
							<div className='table_head_check_item'>Total</div>
							<div className='table_head_check_item1'>
								<h1 className='shipping_calculate font-semibold tracking-wider'>
									৳ {(total_amount + (total_amount / 100) * 3).toFixed(2)}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className='grid_layout layout_two'>
					<form
						onSubmit={handleCouponCode}
						className='lg:flex justify-end items-center'
					>
						<input
							type='text'
							className='p-extra_padding3 mt-4 rounded-sm outline-none border border-slate-300 lg:!w-2/4 !w-full'
							placeholder='Enter coupon code...'
							required
							onChange={(e) => setUserCoupon(e.target.value)}
						/>
						&nbsp;&nbsp;
						<button
							id='cart_btn'
							className='!rounded-sm !ml-0 !py-1 lg:!w-1/4 !w-full lg:!mt-4 !mt-0'
						>
							Apply Coupon
						</button>
					</form>
					<div className='checkout_btn ml-auto !mt-0 !w-full'>
						<NextLink href='/checkout' passHref>
							<button id='cart_btn' className='!rounded-sm !ml-0 !py-1 !w-full'>
								PROCEED TO CHECKOUT
							</button>
						</NextLink>
					</div>
				</div>
			</div>
		</>
	);
}
