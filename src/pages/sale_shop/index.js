import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LayoutContainer from '../../components/commons/layout/LayoutContainer';
import SaleProductsShopMain from '../../components/sale_shop_page/SaleProductsShopMain';
import { fetcher } from '../../hooks/http_req/DataFetch';
import { storeAllCategories } from '../../redux/all_data/action';

export default function SaleProductsShop({ sale_products, all_categories }) {
	// categories add to redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(storeAllCategories(all_categories));
	});

	return (
		<>
			<LayoutContainer
				title='Shop'
				description="This is shop page of 'Daily Needs Grocery'"
			>
				<SaleProductsShopMain products_data={sale_products} />
			</LayoutContainer>
		</>
	);
}

// get all data from server
export async function getStaticProps() {
	// sale products
	const sale_products = await fetcher('client_pannel_api/sale_products');

	// all categories
	const all_categories = await fetcher('client_pannel_api/all_categories');

	// props send
	return { props: { sale_products, all_categories }, revalidate: 30 };
}
