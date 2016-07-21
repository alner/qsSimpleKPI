import React from 'react';
import StatisticBlock from './statisticBlock';

// {qlik, Routing, State, NumberFormatter, DragDropService, Deffered}
export default function setupPaint({qlik, Routing, State, NumberFormatter, DragDropService}) {
  const DEFAULT_AUTO_FORMAT = '0A';
  let wasZoomedId;
  let numberFormatter;
  if(NumberFormatter && qlik) {
    let localeInfo;
    try {
      localeInfo = qlik.currApp().model.layout.qLocaleInfo;
    } finally {
      let decimalSeparator = (localeInfo && localeInfo.qDecimalSep) || ".";
      let thousandSep = (localeInfo && localeInfo.qThousandSep) || ",";
      numberFormatter = new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U'); // '', '', 'U'
    }
  }

  return function paint($element, layout) {
    let self = this;
    return new qlik.Promise(function(resolve, reject){
      if((self.options && self.options.isZoomed)
      || (wasZoomedId && wasZoomedId === layout.qInfo.qId)){
        // qs 3.0 patch
        //$element.empty();
        React.unmountComponentAtNode(($element)[0]);
        if(self.options.isZoomed) wasZoomedId = layout.qInfo.qId;
        else wasZoomedId = undefined;
      }
      React.render(
        <StatisticBlock
          kpis={layout.qHyperCube}
          options={{
            ...layout.options,
            numberFormatter,
            DEFAULT_AUTO_FORMAT
          }}
          services={{
            Routing,
            State,
            Qlik: qlik,
            DragDropService,
            QlikComponent: this,
            PrintResolver: resolve
          }}
          element={($element)[0]}/>
        ,($element)[0]
      );

      //setTimeout(function(){ resolve(); }, 8000);
      //resolve();
    });
  }
}
