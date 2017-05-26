import React, { render } from 'react';
import StatisticBlock from './statisticBlock';
import NumberFormatter from './numberFormatter';

const DEFAULT_AUTO_FORMAT = '0A';

function getNumberFormatter(localeInfo, NumberFormatter) {
  //let localeInfo = backendApi.localeInfo;
  if(localeInfo && NumberFormatter) {
    let decimalSeparator = localeInfo.qDecimalSep; // || ".";
    let thousandSep = localeInfo.qThousandSep; // || ",";
    return new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U'); // '', '', 'U'
  } else {
    return undefined;
  }
}

let wasZoomedId;
function unmountIfZoomed($element, layout, { options }) {
  if((options && options.isZoomed && wasZoomedId !== layout.qInfo.qId)
  || (options && !options.isZoomed && wasZoomedId === layout.qInfo.qId)){
    // qs 3.0 patch
    //$element.empty();
    React.unmountComponentAtNode(($element)[0]);
    if(options.isZoomed)
      wasZoomedId = layout.qInfo.qId;
    else
      wasZoomedId = undefined;
  }
}

// {qlik, Routing, State, NumberFormatter, DragDropService, Deffered}
export default function setupPaint({
  qlik,
  Routing,
//  NumberFormatter,
  DragDropService,
  LoadedPromise
}) {
    let numberFormatter;
    let localeInfo;
    // if(NumberFormatter && qlik) { // NumberFormatter && qlik
    //   let localeInfo;
    //   try {
    //     //localeInfo = qlik.currApp().model.layout.qLocaleInfo;
    //   } finally {
    //     let decimalSeparator = (localeInfo && localeInfo.qDecimalSep) || ".";
    //     let thousandSep = (localeInfo && localeInfo.qThousandSep) || ",";
    //     //numberFormatter = new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U'); // '', '', 'U'
    //   }
    // }

  return function paint($element, layout) {
    let self = this;

    if(!localeInfo) { // && self.backendApi && self.backendApi.localeInfo
      localeInfo = qlik.currApp().model.layout.qLocaleInfo; //self.backendApi && self.backendApi.localeInfo;
    }
    if(!numberFormatter) {
      numberFormatter = getNumberFormatter(localeInfo, NumberFormatter);
    }

    const State = {
      isInEditMode: self.inEditState && self.inEditState.bind(self),
      isInAnalysisMode: self.inAnalysisState && self.inAnalysisState.bind(self)
    };

    const PromiseClass = qlik.Promise || window.Promise; // for backward compatibility
    // It waits for all promises before "print" (after the styles has been loaded, see. component.js)
    // LoadedPromise, 
    return PromiseClass.all([LoadedPromise, new PromiseClass(function(resolve, reject){

      unmountIfZoomed($element, layout, self);

      render(
        <StatisticBlock
          kpis={layout.qHyperCube}
          options={{
            ...layout.qInfo,
            ...layout.options,
            numberFormatter,
            DEFAULT_AUTO_FORMAT
          }}
          services={{
            Routing,
            State,
            Qlik: qlik,
            DragDropService,
            QlikComponent: self,
            PrintResolver: resolve
          }}
          element={($element)[0]}/>
        ,($element)[0]
      );
    })]);
  }  
}
