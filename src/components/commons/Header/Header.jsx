const Header = ({ productData }) => {
	return (
		<header className='flex justify-between items-center px-4 py-4 shadow-md border-b'>
			<h1 className='text-2xl font-bold'>RihlaMart</h1>
			<div className='flex gap-3'>
				<img
					// onClick={() => window.open(productData?.facebook, '_blank')}
					src='https://cdn-icons-png.flaticon.com/128/15047/15047435.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
				/>
				<img
					// onClick={() =>
					// 	window.open(
					// 		`https://wa.me/${productData?.whatsappNumber}`,
					// 		'_blank'
					// 	)
					// }
					src='https://cdn-icons-png.flaticon.com/128/3670/3670051.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
				/>
				<img
					// onClick={() =>
					// 	(window.location.href = `tel:${productData?.whatsappNumber}`)
					// }
					src='https://cdn-icons-png.flaticon.com/128/724/724664.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
				/>
			</div>
		</header>
	);
};

export default Header;
