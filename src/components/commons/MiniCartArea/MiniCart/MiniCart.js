import { AnimatePresence, motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';
import useAnimation from '../../../../hooks/animation/useAnimation';
import CartItemCard from './CartItemCard';
export default function MiniCart({ cart_products, cartState, cartActive }) {
	// animation hook
	const { fadeRight } = useAnimation();

	// calculate total_amount of carted products
	let total_amount = 0;
	if (cart_products) {
		for (const products of cart_products) {
			total_amount =
				products?.prices?.sale_price > 0
					? total_amount + products?.prices?.sale_price * products?.quantity
					: total_amount + products?.prices?.regular_price * products?.quantity;
		}
	}

	return (
		<AnimatePresence>
			{cartActive && (
				<motion.div
					className='mini_cart_wrapper_active shadow-lg'
					initial='offscreen'
					exit={fadeRight.exit}
					whileInView='onscreen'
					viewport={fadeRight.viewport}
					variants={fadeRight}
				>
					<div className='cart_header_area'>
						<div className='cart_header'>
							My Cart &nbsp;&nbsp;
							<span className='text-green'>({cart_products.length} items)</span>
						</div>
						<div
							onClick={() => cartState(false)}
							id='qty_controller'
							className='!text-medium font-light cursor-pointer'
						>
							&times;
						</div>
					</div>
					{cart_products.length > 0 ? (
						<>
							<div className='cart_content_area' style={{ height: '58%' }}>
								{cart_products.map((product) => (
									<CartItemCard key={product._id} product={product} />
								))}
							</div>
							<div className='cart_footer_area'>
								<div className='py-2 flex justify-between items-center text-slate-500 font-semibold tracking-wide !text-sm'>
									<div className='text-slate-500'>Subtotal</div>
									<div className='font-semibold'>
										৳ {total_amount.toFixed(2)}
									</div>
								</div>
								<div className='location_push_btn'>
									<NextLink href='/cart_list' passHref>
										<button className='location_pushBtn'>View Cart</button>
									</NextLink>

									<NextLink href='/checkout' passHref>
										<button className='location_pushBtn'>Go Checkout</button>
									</NextLink>
								</div>
							</div>
						</>
					) : (
						<div className='cart_footer_area shadow-sm'>
							No Product added in cart!
						</div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
