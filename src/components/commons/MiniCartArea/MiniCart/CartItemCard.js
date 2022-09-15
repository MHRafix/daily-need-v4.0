import { motion } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import useAnimation from '../../../../hooks/animation/useAnimation';
import { handleReduceCart } from '../../../../utilities/handleReduceCart';

export default function CartItemCard({ product }) {
	const dispatch = useDispatch(); // from react-redux

	// animation hook
	const { fadeLeft } = useAnimation();

	return (
		<motion.div
			className='cart_item_wrapper'
			initial='offscreen'
			whileInView='onscreen'
			viewport={fadeLeft.viewport}
			variants={fadeLeft}
		>
			<div className='cart_thumbnail shadow-lg'>
				<Image src={product?.thumbnail} alt='' width={80} height={80} />
			</div>
			<div className='ml-10 !text-left'>
				{product?.prices?.sale_price !== 0 && (
					<div id='stock_slae_badge'>
						<div id='sale_badge'>
							{Math.ceil(
								(product?.prices?.regular_price - product?.prices?.sale_price) /
									(product?.prices?.regular_price / 100)
							)}
							% OFF
						</div>
					</div>
				)}

				{/* remove icon */}
				<div
					onClick={() => handleReduceCart(product?._id, dispatch)}
					id='only_remove_action'
				>
					<AiFillMinusCircle />
				</div>
				<div className='title_price_amount'>
					<NextLink href={`/shop/singleProducts/${product?.slug}`} passHref>
						<h3
							id='product_title'
							className='!text-thin !font-light !text-slate-600'
						>
							{product?.title}
						</h3>
					</NextLink>
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
		</motion.div>
	);
}
