import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { header_navigation } from '../../../fake_data/all_fakedata';
import { reduceCookie } from '../../../redux/cart_products/action';
import CartDataFetch from '../../../utilities/CartDataFetch';

// big device navigation here
export function NavigationBarBigDev() {
	const dispatch = useDispatch();

	// fetching all data from the server
	const { carted_products } = CartDataFetch();

	setTimeout(() => {
		if (carted_products.length) {
			dispatch(reduceCookie(carted_products));
		}
	}, 100);

	return (
		<div className='navigation_wrapper'>
			<div className='container_wrapper'>
				<div className='navbars'>
					{header_navigation.map((link) => (
						<NextLink key={link._id} href={link.href} passHref>
							<button className='nav_link_href'>{link.menu_name}</button>
						</NextLink>
					))}
				</div>
			</div>
		</div>
	);
}

// mini device navigation here
export function NavigationBarMinDev() {
	// handle search input here
	const [keyword, setKeyword] = useState('');
	const router = useRouter();
	const handleSearch = (e) => {
		if (keyword === '') {
			alert('Empty input is not accepted!');
		} else {
			router.push(`/search_shop/${keyword}`);
		}
	};

	// call the animation and init here
	// const { steps_navigation } = animation();

	return (
		// <Animate steps={steps_navigation}>
		<div className='mini_navigation_wrapper'>
			<div className='container_wrapper'>
				{/* search area in mini navbars */}
				<div className='serach_area2'>
					<input
						onChange={(e) => setKeyword(e.target.value)}
						className='search_field !w-full mb-3'
						type='search'
						placeholder='Enter keyword here...'
						required
					/>
					<button className='btn btn-search !w-full' onClick={handleSearch}>
						Search By Name
					</button>
				</div>
				<div className='mini_navbars'>
					{header_navigation.map((link) => (
						<NextLink key={link._id} href={link.href} passHref>
							<div className='nav_link_href_big'>{link.menu_name}</div>
						</NextLink>
					))}
				</div>
			</div>
		</div>
		// </Animate>
	);
}
