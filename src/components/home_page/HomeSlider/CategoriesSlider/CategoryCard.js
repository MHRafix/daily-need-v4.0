import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

export default function CategoryCard({ category_data, all_products }) {
	const matched_products = all_products?.filter(
		(product) => product?.category === category_data?.category
	);

	return (
		<NextLink href={`/categories/${category_data?.category}`} passHref>
			<div className='category_card_wrapper'>
				<div className='category_image'>
					<Image
						className='catImg'
						src={category_data?.cat_image}
						alt='category_image'
						width={80}
						height={80}
					/>
				</div>
				<div className='cat_det'>
					<h1 className='cat_name capitalize'>{category_data?.category}</h1>
					<p className='cat_items_qty'>
						{matched_products?.length} &nbsp; Items
					</p>
				</div>
			</div>
		</NextLink>
	);
}
