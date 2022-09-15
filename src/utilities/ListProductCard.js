import { motion } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import useAnimation from '../hooks/animation/useAnimation';
import AlertToast from './alertToast/AlertToast';
import { handleAddToCart } from './handleCart';
import toastConfig from './toastConfig';

export default function ListProductCard({ product_data }) {
	// toast state here
	const [toastOn, setToastOn] = useState(false);
	const [toastType, setToastType] = useState('');
	const [toastText, setToastText] = useState('');

	const dispatch = useDispatch(); // from react-redux
	const [qty, setQty] = useState(1); // product qty state

	// card animation hook
	const { slideUp } = useAnimation();

	// destructuring product here
	const {
		_id,
		slug,
		title,
		thumbnail,
		prices,
		stock_available,
		additional_info,
		product_status,
	} = product_data;

	const { description, weight } = additional_info;
	const { regular_price, sale_price } = prices;

	// alert toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			{/* toast alert */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			{/* product list view card  */}
			<motion.div
				id='product_card_list_style'
				initial='offscreen'
				whileInView='onscreen'
				variants={slideUp}
			>
				<div id='card_header_list'>
					<div id='stock_slae_badge'>
						{sale_price !== 0 && (
							<div id='sale_badge'>
								{Math.ceil(
									(regular_price - sale_price) / (regular_price / 100)
								)}
								% OFF
							</div>
						)}
						{stock_available > 0 ? (
							<div id='stock_status_green'></div>
						) : (
							<div id='stock_status_red'></div>
						)}
					</div>
					<NextLink href={`/shop/singleProducts/${slug}`} passHref>
						<div id='product_thumbnail'>
							<Image
								priority={true}
								id='product_thumbnail'
								src={thumbnail}
								alt='product_thumbnail'
								width='200'
								height='200'
							/>
						</div>
					</NextLink>
				</div>
				<div id='card_body_list'>
					<NextLink href={`/shop/singleProducts/${slug}`} passHref>
						<h3 id='product_title_list'>{title}</h3>
					</NextLink>
					<h5 id='stock_status_list'>
						<BsCheckCircleFill />
						&nbsp;&nbsp;<strong id='stronger'>{product_status}</strong>&nbsp;
						<span style={{ color: '#666' }}>
							{weight > 0 ? `- ${weight} kg` : null}
						</span>
					</h5>
					<div id='product_price'>
						<span id={sale_price !== 0 ? 'regular_price' : 'sale_price'}>
							৳ {regular_price}
						</span>

						{sale_price !== 0 && <span id='sale_price'>৳ {sale_price}</span>}
					</div>
					<div className='!my-2 text-black3'>{description.slice(0, 170)}</div>
					<div id='add_to_cart_area_list'>
						<button
							id='qty_controller'
							onClick={() => {
								if (qty > 1) {
									setQty((prevQty) => prevQty - 1);
								} else {
									setToastOn(true);
									setToastType('warning_toast');
									setToastText('Minimum quantity limit exceed!');
								}
							}}
						>
							-
						</button>
						<span id='cart_qty'>{qty}</span>
						<button
							id='qty_controller'
							onClick={() => {
								if (qty < 10) {
									setQty((prevQty) => prevQty + 1);
								} else {
									setToastOn(true);
									setToastType('warning_toast');
									setToastText('Maximum quantity limit exceed!');
								}
							}}
						>
							+
						</button>
					</div>
					<div id='add_to_cart_btn'>
						{stock_available > 0 ? (
							<button
								id='cart_btn_list'
								onClick={() =>
									handleAddToCart(
										setToastOn,
										setToastType,
										setToastText,
										product_data,
										dispatch,
										_id,
										qty
									)
								}
							>
								<MdOutlineShoppingCart /> &nbsp; Add to cart
							</button>
						) : (
							<NextLink href={`/shop/singleProducts/${_id}`} passHref>
								<button id='cart_btn_list'>Read more</button>
							</NextLink>
						)}
					</div>
				</div>
			</motion.div>
		</>
	);
}
