import { useSelector } from 'react-redux';
import { stock_data, type_data } from '../../fake_data/all_fakedata';
import FilterCard from '../../utilities/FilterCard';
import FilterCategoryCard from '../../utilities/FilterCategoryCard';
import MultiRangeSlider from '../../utilities/MultiRangeSlider';
import SidebarPartContainer from '../commons/layout/SidebarPartContainer';

export default function ShopSidebar({ priceRangeData }) {
	const { setMinRange, setMaxRange } = priceRangeData;
	const all_categories = useSelector((state) => state.products.all_categories);
	return (
		<div className='sidebar_wrapper'>
			<SidebarPartContainer filterer_name='filter by price'>
				<MultiRangeSlider
					min={1}
					max={10000}
					onChange={({ min, max }) => {
						setMinRange(min);
						setMaxRange(max);
					}}
				/>
			</SidebarPartContainer>

			<SidebarPartContainer filterer_name='product categories'>
				{all_categories?.map((category) => (
					<FilterCategoryCard
						key={category._id}
						filter_type='categories'
						data={category}
					/>
				))}
			</SidebarPartContainer>

			<SidebarPartContainer filterer_name='product status'>
				{stock_data.map((stock) => (
					<FilterCard
						key={stock._id}
						filter_type='product_status'
						data={stock}
					/>
				))}
			</SidebarPartContainer>

			<SidebarPartContainer filterer_name='product type'>
				{type_data.map((type) => (
					<FilterCard key={type._id} filter_type='product_type' data={type} />
				))}
			</SidebarPartContainer>
		</div>
	);
}
