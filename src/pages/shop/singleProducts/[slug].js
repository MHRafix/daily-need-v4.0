import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LayoutContainer from '../../../components/commons/layout/LayoutContainer';
import SignleProductMain from '../../../components/single_product/SignleProductMain';
import { fetcher } from '../../../hooks/http_req/DataFetch';
import {
	addAllProducts,
	addCutomerAccess,
	storeAllReviews,
} from '../../../redux/all_data/action';

export default function SingleProduct({
	all_products,
	single_product,
	all_reviews,
	all_orders,
}) {
	const Router = useRouter();
	const { slug } = Router.query;
	let access = false;

	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	const user_orders = all_orders?.filter(
		(order) => order?.user_email === userInfo?.user_email
	);

	user_orders?.map((order) => {
		const isExist = order.products_data.find(
			(product) => product.slug === slug
		);
		if (isExist) {
			access = true;
		}
	});

	// set reviews to redux store
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(storeAllReviews(all_reviews));
		dispatch(addAllProducts(all_products));
		if (access) {
			dispatch(addCutomerAccess(true));
		} else {
			dispatch(addCutomerAccess(false));
		}
	});

	// bread cruimb navigation making here
	const bread_string = `${single_product?.category} / ${single_product?.title}`;
	return (
		<>
			<LayoutContainer
				title={single_product?.title}
				description={`This is single product page of ${single_product?.title} of Daily Needs Grocery`}
			>
				<SignleProductMain
					bread_string={bread_string}
					single_product={single_product}
				/>
			</LayoutContainer>
		</>
	);
}

// find the path
export async function getStaticPaths() {
	const all_products = await fetcher('client_pannel_api/all_products');
	const slug = all_products.map((product) => ({
		params: { slug: product.slug },
	}));
	return {
		paths: slug,
		fallback: false,
	};
}

// find single product
export async function getStaticProps({ params }) {
	const { slug } = params;

	// all product
	const all_products = await fetcher('client_pannel_api/all_products');

	// single product
	const single_product = await fetcher(
		`client_pannel_api/single_product/${slug}`
	);

	// all reviews
	const all_reviews = await fetcher(
		'client_pannel_api/manage_reviews/all_reviews'
	);

	// find this product reviews only
	const this_reviews = all_reviews.filter(
		(review) =>
			review.product_id === single_product?._id && review.product_slug === slug
	);

	// all orders
	const all_orders = await fetcher(
		'client_pannel_api/manage_orders/all_orders'
	);

	// return the all data as props
	return {
		props: {
			all_products,
			single_product,
			all_reviews: this_reviews,
			all_orders,
		},
		revalidate: 10,
	};
}
