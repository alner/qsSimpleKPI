import React from 'react';
import ReactDOM from 'react-dom';
import StatisticBlock from './statisticBlock';
import NumberFormatter from './numberFormatter';

const DEFAULT_AUTO_FORMAT = "0A";

function getNumberFormatter(localeInfo, NumberFormatter) {
  if(localeInfo && NumberFormatter) {
    let decimalSeparator = localeInfo.qDecimalSep;
    let thousandSep = localeInfo.qThousandSep;
    return new NumberFormatter(localeInfo, DEFAULT_AUTO_FORMAT, thousandSep, decimalSeparator, 'U');
  } else {
    return undefined;
  }
}

function doPaint(
  $element,
  layout,
  numberFormatter,
  qlik,
  Routing,
  State,
  DragDropService,
  resolve,
  self
) {
  try {
    ReactDOM.render(
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
        element={$element[0]}
      />,
      $element[0]
    );
  } catch (error) {
    console.log(error);
  }
}

let wasZoomedId;
function unmountIfZoomed($element, layout, { options }) {
  if((options && options.isZoomed && wasZoomedId !== layout.qInfo.qId)
  || (options && !options.isZoomed && wasZoomedId === layout.qInfo.qId)){
    ReactDOM.unmountComponentAtNode(($element)[0]);
    if(options.isZoomed)
      wasZoomedId = layout.qInfo.qId;
    else
      wasZoomedId = undefined;
  }
}

export default function setupPaint({
  qlik,
  Routing,
  DragDropService,
  LoadedPromise,
  listeners
}) {
  let numberFormatter;
  let localeInfo;

  return function paint($element, layout) {
    let self = this;

    if(!localeInfo) {
      localeInfo = (self.backendApi && self.backendApi.localeInfo);
      if(!localeInfo)
        try {
          const app = qlik.currApp();
          if(app)
            localeInfo = app.model.layout.qLocaleInfo;
        } catch(err) {
          console.log(err);
        }
    }
    if (!numberFormatter) {
      numberFormatter = getNumberFormatter(localeInfo, NumberFormatter);
    }

    const State = {
      isInEditMode: self.inEditState && self.inEditState.bind(self),
      isInAnalysisMode: self.inAnalysisState && self.inAnalysisState.bind(self)
    };

    const PromiseClass = qlik.Promise || window.Promise; // for backward compatibility
    // It waits for all promises before "print" (after the styles has been loaded, see. component.js)
    // LoadedPromise,
    return PromiseClass.all([
      LoadedPromise,
      new PromiseClass(function(resolve, reject) {
        listeners.paint = () => {
          doPaint(
            $element,
            layout,
            numberFormatter,
            qlik,
            Routing,
            State,
            DragDropService,
            resolve,
            self
          );
        };
        unmountIfZoomed($element, layout, self);

        doPaint(
          $element,
          layout,
          numberFormatter,
          qlik,
          Routing,
          State,
          DragDropService,
          resolve,
          self,
          LoadedPromise
        );
      })
    ]);
  };
}
