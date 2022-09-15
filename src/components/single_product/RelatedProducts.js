import React from 'react';
import { useSelector } from 'react-redux';

export default function RelatedProducts({ tags }) {
	// all products from redux store
	const all_products = useSelector((state) => state.products.all_products);

	const related_products = all_products.filter((product) => tags.includes(''));

	// console.log(related_products);

	return <div>Feature is comming soon ...!</div>;
}
