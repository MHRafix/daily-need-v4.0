import React from 'react';
import DashboardContentLayout from '../../../../components/admin_pannel_components/admin_pannel_utilities/DashboardLayout/DashboardContentLayout';

export default function ChartLayout({ item_name, labels_array, children }) {
	return (
		<DashboardContentLayout item_name={item_name}>
			<div
				id='chart_indicators_wrapper'
				style={{ margin: 'auto', textAlign: 'center' }}
			>
				{labels_array.map((chart) => (
					<Lebel key={chart._id} chart={chart} />
				))}
			</div>
			<div id='chart_area'>{children}</div>
		</DashboardContentLayout>
	);
}

const Lebel = ({ chart }) => {
	return (
		<div id='chart_indicator'>
			<div
				style={{
					width: '15px',
					height: '15px',
					display: 'block',
					borderRadius: '100px',
					background: `${chart.bg_color}`,
				}}
			></div>
			&nbsp;&nbsp;
			<div id='chart_indicator_label'>{chart.label}</div>
		</div>
	);
};
