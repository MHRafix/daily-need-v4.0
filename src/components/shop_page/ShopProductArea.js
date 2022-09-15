import Cookie from 'js-cookie';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductPagination from '../../hooks/pagination/ProductPagination';
import GridProductCard from '../../utilities/GridProductCard';
import ItemsSorter from '../../utilities/layout_changer/ItemsSorter';
import ProductPriceSorter from '../../utilities/layout_changer/ProductPriceSorter';
import ViewType from '../../utilities/layout_changer/ViewType';
import ListProductCard from '../../utilities/ListProductCard';

export default function ShopProductArea({
	products_data,
	sidebaron,
	setsidebaron,
}) {
	// is grid or list layout on from cookies
	const layout_status = Cookie.get('layout_changer')
		? JSON.parse(Cookie.get('layout_changer'))
		: true;
	const [grid, setGrid] = useState(layout_status);

	// pagination config here
	const [itemsPerPage, setItemsPerPage] = useState(9);

	const { handlePageClick, pageCount, currentItems } = ProductPagination(
		products_data,
		itemsPerPage
	);

	// product view type change config
	const view_type_config = { setGrid, grid, sidebaron, setsidebaron };

	return (
		<div className='shop_product_area'>
			{/* shop controler */}
			<div className='shop_controller'>
				<ViewType view_type={view_type_config} />
				<div className='flex items-center'>
					<ItemsSorter setItems={setItemsPerPage} item={itemsPerPage} />
					&nbsp;&nbsp;
					<ProductPriceSorter />
				</div>
			</div>

			{grid ? (
				<div className='grid_shop_products'>
					{currentItems?.map((product, i) => (
						<GridProductCard key={i} product_data={product} />
					))}
				</div>
			) : (
				<div className='list_shop_products'>
					{currentItems?.map((product, i) => (
						<ListProductCard key={i} product_data={product} />
					))}
				</div>
			)}
			{/* pagination product  */}
			{products_data?.length > itemsPerPage && (
				<div className='pagination'>
					<ReactPaginate
						breakLabel='...'
						nextLabel='>'
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel='<'
						renderOnZeroPageCount={null}
					/>
				</div>
			)}
		</div>
	);
}
