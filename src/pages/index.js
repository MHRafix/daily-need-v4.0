import LayoutContainer from '../components/commons/layout/LayoutContainer';
import HomeMain from '../components/home_page/HomeMain';
import { fetcher } from '../hooks/http_req/DataFetch';

export default function Home({
	all_products,
	all_categories,
	all_sliders,
	all_brands,
}) {
	return (
		<>
			<LayoutContainer
				title='Organic Food and Grocery'
				description="This is home page of 'Daily Needs Grocery'"
			>
				<HomeMain
					all_products={all_products}
					all_categories={all_categories}
					all_sliders={all_sliders}
					all_brands={all_brands}
				/>
			</LayoutContainer>
		</>
	);
}

export async function getStaticProps() {
	const all_products = await fetcher('client_pannel_api/all_products');
	const all_categories = await fetcher('client_pannel_api/all_categories');
	const all_sliders = await fetcher('client_pannel_api/all_sliders');
	const all_brands = await fetcher('client_pannel_api/all_brands');

	return {
		props: { all_products, all_categories, all_sliders, all_brands },
		revalidate: 30,
	};
}
