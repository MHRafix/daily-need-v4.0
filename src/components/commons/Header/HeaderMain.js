import { useState } from 'react';
import BrandArea from './BrandArea';
import { NavigationBarBigDev, NavigationBarMinDev } from './NavigationBar';
import Topbar from './Topbar';

export default function HeaderMain() {
	const [navbarToggle, setNavbarToggle] = useState(false);
	return (
		<>
			<Topbar />
			<BrandArea
				setNavbarToggle={setNavbarToggle}
				navbarToggle={navbarToggle}
			/>
			<NavigationBarBigDev />
			{navbarToggle && <NavigationBarMinDev />}
		</>
	);
}
