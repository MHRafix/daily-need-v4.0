import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import useAnimation from '../../../hooks/animation/useAnimation';

export default function OrderProduct({ product }) {
	// animation hook
	const { fadeUp } = useAnimation();

	return (
		<motion.div
			className='flex items-center shadow-sm'
			initial='offscreen'
			whileInView='onscreen'
			viewport={fadeUp.viewport}
			variants={fadeUp}
		>
			<div className='cart_item_wrapper w-4/6'>
				<div className='cart_thumbnail shadow-lg'>
					<Image
						src={product?.thumbnail}
						alt='order_card'
						width={70}
						height={70}
					/>
				</div>
				<div className='ml-10 !text-left'>
					<div className='title_price_amount'>
						<h3
							id='product_title'
							className='!text-thin !font-light !text-slate-600 !cursor-default'
						>
							{product?.title}
						</h3>
						{product?.additional_info?.weight > 0 && (
							<>
								<span className='text-thin font-light tracking-wider'>
									- {product?.additional_info?.weight} kg
								</span>
								<br />
							</>
						)}

						<span className='font-semibold text-black my-2 tracking-wider text-sm'>
							{product?.quantity} x ৳
							{product?.prices?.sale_price !== 0
								? product?.prices?.sale_price
								: product?.prices?.regular_price}
						</span>
					</div>
				</div>
			</div>
			<div className='w-2/6'>
				৳ &nbsp;
				{(
					product?.quantity *
					(product?.prices?.sale_price !== 0
						? product?.prices?.sale_price
						: product?.prices?.regular_price)
				).toFixed(2)}
			</div>
		</motion.div>
	);
}
