import React from 'react';
import StatisticBlock from './statisticBlock';

export default function setupPaint(paramaters) {
  const DEFAULT_AUTO_FORMAT = '0A';
  let numberFormatter;
  if(paramaters.NumberFormatter && paramaters.qlik) {
    let localeInfo;
    try {
      localeInfo = paramaters.qlik.currApp().model.layout.qLocaleInfo;
    } finally {
      let decimalSeparator = (localeInfo && localeInfo.qDecimalSep) || ".";
      let thousandSep = (localeInfo && localeInfo.qThousandSep) || ",";
      numberFormatter = new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U'); // '', '', 'U'
    }
  }

  return function paint($element, layout) {
    React.render(
      <StatisticBlock
        kpis={layout.qHyperCube}
        options={{
          ...layout.options,
          numberFormatter,
          DEFAULT_AUTO_FORMAT
        }}
        services={{
          Routing: paramaters.Routing,
          State: paramaters.State
        }}
        element={($element)[0]}/>
      ,($element)[0]
    );
  }
}
