import React from 'react';
import StatisticBlock from './statisticBlock';

export default function paint($element, layout) {
	console.log($element, layout);
	console.log($element[0].clientHeight);
	console.log($element[0].scrollHeight);
	React.render(
	  <StatisticBlock kpis={layout.qHyperCube} options={layout.options} element={($element)[0]}/>
	  ,
	  ($element)[0]
	);
}