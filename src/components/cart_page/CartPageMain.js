import NextLink from 'next/link';
import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '../../utilities/AlertMessage';
import Breadcrumb from '../commons/Breadcrumb/Breadcrumb';
import CartTable from './CartTable';
import CheckoutTable from './CheckoutTable';

export default function CartPageMain() {
	const carted_products = useSelector((state) => state.cart_product.cart_list);
	const bread_string = 'Cart';

	if (!carted_products.length) {
		return (
			<>
				<Breadcrumb bread_nav={bread_string} />
				<>
					<ErrorMessage message='No products added in cart!' />
					<div className='flex items-center' style={{ marginTop: '10px' }}>
						<span>
							<NextLink href='/shop/grid_shop' passHref>
								<button
									id='cart_btn'
									className='!rounded-sm !text-light'
									style={{ textTransform: 'capitalize' }}
								>
									continue shopping &nbsp;
									<MdShoppingCart className='!text-normal' />
								</button>
							</NextLink>
						</span>
					</div>
				</>
			</>
		);
	}

	return (
		<>
			<Breadcrumb bread_nav={bread_string} />
			<CartTable carted_products={carted_products} />
			<CheckoutTable carted_products={carted_products} />
		</>
	);
}
