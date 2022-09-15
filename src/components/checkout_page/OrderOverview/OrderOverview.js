import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductPagination from '../../../hooks/pagination/ProductPagination';
import OrderProduct from './OrderProduct';

export default function OrderOverview({ carted_products, net_total }) {
	// paginatio config here
	const [itemsPerPage, setItemsPerPage] = useState(5);

	const { handlePageClick, pageCount, currentItems } = ProductPagination(
		carted_products,
		itemsPerPage
	);

	return (
		<div className='cart_table'>
			<div className='table_full'>
				<div className='flex bg-slate-100 border-b-1 border-slate-200 py-1'>
					<div className='text-black2 text-normal tracking-wider font-semibold w-4/6'>
						Product Details
					</div>
					<div className='text-black2 text-normal tracking-wider font-semibold w-2/6'>
						Subtotal
					</div>
				</div>
				{carted_products.length ? (
					<>
						<div>
							{currentItems?.map((product, i) => (
								<OrderProduct key={i} product={product} />
							))}
						</div>
						<div className='flex items-center justify-between px-2 text-black2 tracking-wider font-semibold mt-5'>
							<div className='text-left'>Payable Amount (+shipping):</div>
							<div className='pr-2'>৳ {net_total} </div>
						</div>

						<hr className='text-slate-100 mt-3' />
						{/* pagination */}
						{carted_products?.length > itemsPerPage && (
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
					</>
				) : (
					<div className='my-5 text-black2 tracking-wide'>Loading Data....</div>
				)}
			</div>
		</div>
	);
}
