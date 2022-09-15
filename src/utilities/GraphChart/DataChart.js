import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

export default function DataChart({ data }) {
	ChartJS.register(
		CategoryScale,
		LineController,
		LineElement,
		BarElement,
		PointElement,
		LinearScale
	);

	return (
		<div className='!px-1 h-per_10'>
			{data.length ? (
				<Line data={data} />
			) : (
				<h1 className='text-normal font-normal py-1' style={{ color: 'red' }}>
					No purchased payment data found!
				</h1>
			)}
		</div>
	);
}
