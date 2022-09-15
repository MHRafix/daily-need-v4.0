import React from 'react';

export default function ProductPriceSorter() {
	return (
		<div className='product_sorting'>
			<select id='product_sorting'>
				<option value='1'>Sort by popularity</option>
				<option value='2' defaultValue={1}>
					Sort by latest
				</option>
				<option value='3'>Sort by average rating</option>
				<option value='4'>Sort by price low to high</option>
				<option value='5'>Sort by price high to low</option>
			</select>
		</div>
	);
}
