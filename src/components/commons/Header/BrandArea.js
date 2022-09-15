import Cookie from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toggle_profile_navigation } from '../../../fake_data/all_fakedata';
import Logo from '../../../images/logo/logo.webp';
import MiniCart from '../MiniCartArea/MiniCart/MiniCart';
import AccountLinks from './AccountLinks';

export default function BrandArea({ setNavbarToggle, navbarToggle }) {
	const cart_list = useSelector((state) => state.cart_product.cart_list);

	// search dynamic query setup here using handleSearch function
	const [cartActive, setCartActive] = useState(false);
	const [keyword, setKeyword] = useState('');
	const router = useRouter();
	const handleSearch = (e) => {
		if (keyword === '') {
			alert('Empty input is not accepted!');
		} else {
			router.push(`/search_shop/${keyword}`);
		}
	};

	// logged in user data here
	const user_loggedin =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	return (
		<div className='brand_area_wrapper'>
			<div className='container_wrapper'>
				<div className='brand_area'>
					<div className='brand_wrapper'>
						<Image src={Logo} alt='site logo' width={127} height={38} />
					</div>
					<div className='serach_area'>
						<input
							onChange={(e) => setKeyword(e.target.value)}
							className='search_field'
							type='search'
							placeholder='Enter keyword here...'
							required
						/>
						<button className='btn btn-search' onClick={handleSearch}>
							Search
						</button>
					</div>
					<div className='cart_area'>
						<div
							onClick={() => setCartActive(true)}
							className='header_action_icon'
						>
							<span className='cart_badge'>
								<MdShoppingCart />
								<span className='cart_counter'>{cart_list.length}</span>
							</span>
							<span className='xs:hidden lg:!block'>My Cart</span>
						</div>

						{/* // account link component */}
						<AccountLinks
							toggle_menu={{ menus: toggle_profile_navigation, dep: true }}
						/>
						<div className='header_action_icon2'>
							{navbarToggle ? (
								<button
									className='cart_badge !mr-0'
									onClick={() => setNavbarToggle(false)}
								>
									✖
								</button>
							) : (
								<button
									className='cart_badge !mr-0'
									onClick={() => setNavbarToggle(true)}
								>
									<FaBars />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* {cartActive && ( */}
			<MiniCart
				cart_products={cart_list}
				cartState={setCartActive}
				cartActive={cartActive}
			/>
			{/* )} */}
		</div>
	);
}
