import Cookie from 'js-cookie';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
// import { AiFillWarning } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import useAnimation from '../../hooks/animation/useAnimation';
import { qtyDecrease, qtyIncrease } from '../../redux/cart_products/action';
import AlertToast from '../../utilities/alertToast/AlertToast';
import { handleReduceCart } from '../../utilities/handleReduceCart';
import toastConfig from '../../utilities/toastConfig';

export default function TableBody({ carted_products }) {
	// toast state here
	const [toastOn, setToastOn] = useState(false);
	const [toastType, setToastType] = useState('');
	const [toastText, setToastText] = useState('');

	// animation hook
	const { fadeUp } = useAnimation();

	// destructure product data
	const { _id, slug, thumbnail, title, prices, quantity } = carted_products;
	const dispatch = useDispatch();

	// toast config here
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			{/* toast alert  */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			<motion.div
				className='table_body'
				initial='offscreen'
				whileInView='onscreen'
				viewport={fadeUp.viewport}
				variants={fadeUp}
			>
				<div className='table_body_item'>
					{thumbnail && (
						<Image
							src={thumbnail}
							alt='carted items thumbnail'
							width={80}
							height={80}
						/>
					)}
				</div>
				<div className='table_body_item'>
					<NextLink href={`/shop/singleProducts/${slug}`} passHref>
						<h3 className='capitalize text-light text-black3 cursor-pointer hover:text-info_color hover:duration-300'>
							{title}
						</h3>
					</NextLink>
				</div>
				<div className='table_body_item'>
					৳{' '}
					{prices?.sale_price === 0
						? prices?.regular_price
						: prices?.sale_price}
				</div>
				<div className='table_body_item'>
					<div id='add_to_cart_area'>
						<button
							id='qty_controller'
							onClick={() => {
								handleUpdateCart(
									setToastOn,
									setToastType,
									setToastText,
									dispatch,
									qtyDecrease,
									_id,
									false
								);
							}}
						>
							-
						</button>
						<span id='cart_qty'>{quantity}</span>
						<button
							id='qty_controller'
							onClick={() =>
								handleUpdateCart(
									setToastOn,
									setToastType,
									setToastText,
									dispatch,
									qtyIncrease,
									_id,
									true
								)
							}
						>
							+
						</button>
					</div>
				</div>
				<div className='table_body_item'>
					৳{' '}
					{(prices?.sale_price === 0
						? prices?.regular_price * quantity
						: prices?.sale_price * quantity
					).toFixed(2)}
				</div>
				<div className='table_body_item'>
					<span
						onClick={() => handleReduceCart(_id, dispatch)}
						className='bg-red-500 text-white cursor-pointer text-semi_medium px-extra_padding3 !rounded-sm'
						id='cart_btn'
					>
						✖
					</span>
				</div>
			</motion.div>
		</>
	);
}

const handleUpdateCart = (
	setToastOn,
	setToastType,
	setToastText,
	dispatch,
	updateDep,
	_id,
	dependency
) => {
	const carted_products =
		Cookie.get('cart_product_ids') &&
		JSON.parse(Cookie.get('cart_product_ids'));

	if (carted_products) {
		const selected_product = carted_products.find(
			(product) => product._id === _id
		);
		if (dependency) {
			if (selected_product.quantity < 10) {
				selected_product.quantity = selected_product.quantity + 1;
				dispatch(updateDep(_id));
			} else {
				setToastOn(true);
				setToastType('error_toast');
				setToastText('Maximum quantity limit exceed!');
			}
		} else {
			if (selected_product.quantity > 1) {
				selected_product.quantity = selected_product.quantity - 1;
				dispatch(updateDep(_id));
			} else {
				setToastOn(true);
				setToastType('error_toast');
				setToastText('Minimum quantity limit exceed!');
			}
		}

		const rest_cart = carted_products.filter((product) => product._id !== _id);

		rest_cart.push(selected_product);
		Cookie.set('cart_product_ids', JSON.stringify(rest_cart));
	}
};
