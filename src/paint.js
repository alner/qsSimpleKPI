import React from 'react';
import StatisticBlock from './statisticBlock';

export default function paint($element, layout) {
	React.render(
	  <StatisticBlock kpis={layout.qHyperCube} options={layout.options}/>
	  ,
	  ($element)[0]
	);
}