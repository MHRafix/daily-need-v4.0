/**
 * data fetcher
 */

export const fetcher = async (end_point) => {
	const products = await fetch(
		`https://daily-need.vercel.app/api/${end_point}`
	);
	const all_products = await products.json();

	return all_products;
};
