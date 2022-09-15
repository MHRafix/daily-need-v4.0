import Image from 'next/image';
import React from 'react';
import Loader from '../images/loader/table_loader.gif';

export default function CustomLoader() {
	return (
		<div className='custom_loader'>
			<Image src={Loader} alt='data_loader' width={300} height={230} />
		</div>
	);
}
