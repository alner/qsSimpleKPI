import React from 'react';
import StatisticBlock from './statisticBlock';

export default function setupPaint(paramaters) {
  let numberFormatter;
  if(paramaters.NumberFormatter && paramaters.qlik) {
    let localeInfo;
    try {
      localeInfo = paramaters.qlik.currApp().model.layout.qLocaleInfo;
    } finally {
      numberFormatter = new NumberFormatter(localeInfo, '0A', '', '', 'U');
    }
  }

  return function paint($element, layout) {
    React.render(
      <StatisticBlock kpis={layout.qHyperCube} numberFormatter={numberFormatter} options={layout.options} element={($element)[0]}/>
      ,($element)[0]
    );
  }
}
