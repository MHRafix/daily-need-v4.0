import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPannelLayoutContainer from '../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer';
import ManageCategoryMain from '../../../../components/admin_pannel_components/components/manage_category/ManageCategoryMain';
import { fetcher } from '../../../../hooks/http_req/DataFetch';
import { storeAllCategories } from '../../../../redux/all_data/action';
import { storeUserData } from '../../../../redux/user_data/action';
import ErrorPage from '../../../404';
export default function ManagCategoryProducts({
	all_products,
	all_categories,
	this_user,
}) {
	// store categories to redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(storeUserData(this_user));
		dispatch(storeAllCategories(all_categories));
	});

	if (!this_user?.user_role === 'admin') {
		return <ErrorPage />;
	}

	return (
		<>
			<AdminPannelLayoutContainer
				title='Manage Category'
				description="This is manage category of 'Daily Needs Grocery' web application admin pannel."
			>
				{all_categories.length && (
					<ManageCategoryMain
						all_products={all_products}
						all_categories={all_categories}
					/>
				)}
			</AdminPannelLayoutContainer>
		</>
	);
}

// find the user
export async function getStaticPaths() {
	const all_users = await fetcher('admin_pannel_api/manage_users/all_users');
	const user = all_users.map((user) => ({
		params: { admin_email: user.user_email },
	}));
	return {
		paths: user,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const { admin_email } = params;

	// this user
	const this_user = await fetcher(
		`admin_pannel_api/manage_users/single_user/${admin_email}`
	);

	// all products
	const all_products = await fetcher('client_pannel_api/all_products');

	// all categories
	const all_categories = await fetcher('client_pannel_api/allcategories');

	return {
		props: { all_products, all_categories, this_user },
		revalidate: 30,
	};
}
