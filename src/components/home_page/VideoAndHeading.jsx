const VideoAndHeading = () => {
	return (
		<div className='space-y-8'>
			<div className='text-center px-4 py-5 bg-purple-950 text-white rounded-xl mt-5 mx-4'>
				<h2 className='text-xl font-bold'>১০০% সুতি কাপড়ের সালাত লং খিমার।</h2>
			</div>
			<section className='text-center px-4 py-5 bg-purple-950 text-white rounded-xl mt-5 mx-4'>
				<h2 className='text-xl md:text-4xl font-bold mb-4'>
					রাসূলুল্লাহ (সা.) বলেন,
				</h2>
				<h2 className='text-3xl font-bold mb-4'>
					لا تقبل صلاة الحائض إلا بخمار
				</h2>
				<p className='mt-2 text-xl font-semibold'>
					খিমার পরিধান ছাড়া কোনো প্রাপ্ত বয়স্কা নারীর নামাজ কবূল হবেনা।
					(তিরমিজি ৩৭৭, মিশকাত ৭৬২ ও আবু দাউদ ৬৪১)
				</p>
			</section>
			{/* <div className='mx-auto px-4'>
				<div className='relative !w-full h-[400px] overflow-hidden rounded-2xl shadow-lg bg-black aspect-video'>
					<video
						ref={videoRef}
						className='absolute inset-0 w-full h-full object-fill rounded-2xl'
						src='/video.mp4'
						controls={false} // hide default controls
					/>

					<button
						onClick={handleTogglePlay}
						className='absolute inset-0 flex items-center justify-center'
					>
						<div className='bg-black/50 rounded-full p-6 hover:bg-black/70 transition'>
							{isPlaying ? (
								<Pause className='w-10 h-10 text-white' />
							) : (
								<Play className='w-10 h-10 text-white' />
							)}
						</div>
					</button>
				</div>
			</div> */}
		</div>
	);
};

export default VideoAndHeading;
