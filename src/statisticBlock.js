import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InlineCSS from 'react-inline-css';
import { DIVIDE_BY, SIZE_OPTIONS, DEFAULT_SIZE, FONT_SIZE_OPTIONS, getSizeIndex  } from './options';
import DimensionEntry from './dimensionEntry.container';
import StatisticItem from './statisticItem';
import ATTRIBUTES from './definitionAttributes';
import encodeForHTML from './encoder';

const checkRequiredSizeDelay = 1;
const readyDelay = 10;

class StatisticBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_show: false, // initial resize should not be visible
      size: props.options.size,
      clientWidth: props.element.clientWidth,
      clientHeight: props.element.clientHeight,
      overflow: null,
      valueFontStyleIndex: null
    };
    this.componentReady = this.componentReady.bind(this);
    this.kpiItemResizeHandler = this.kpiItemResizeHandler.bind(this);
    this.onDimensionLabelClick = this.onDimensionLabelClick.bind(this);
  }

  componentDidMount(){
    var self = this;
    this.handleIdCheckResize = setTimeout(function(){self.checkRequiredSize();}, checkRequiredSizeDelay);
    // initial resize should not be visible
    this.handleIdComponentReady = setTimeout(function(){ self.componentReady(); }, readyDelay);
  }
  componentWillUnmount(){
    clearTimeout(this.handleIdComponentReady);
    clearTimeout(this.handleIdCheckResize);
    clearTimeout(this.handleIdResolveUpdatePromise);
  }

  componentDidUpdate() {
    var self = this;
    this.checkRequiredSize();
    // Resolve promise for undo/redo to work (QB-1858)
    // Use same delay in componentReady so it doesn't resolve to early
    this.handleIdResolveUpdatePromise = setTimeout(function(){ self.resolveUpdatePromise(); }, readyDelay);
  }

  componentWillReceiveProps(nextProps) {
    this.restoreSize(nextProps);
  }

  componentReady() {
    // initial resize should not be visible
    this.setState({ is_show: true });
    this.props.services.PrintResolver && this.props.services.PrintResolver();
  }

  resolveUpdatePromise(){
    this.props.services.PrintResolver && this.props.services.PrintResolver();
  }

  restoreSize(props){
    const from_props = props || this.props;
    const elementClientWidth = from_props.element.clientWidth;
    const elementClientHeight = from_props.element.clientHeight;
    const size = from_props.options.size;
    this.setState({
      is_show: true,
      size: size,
      overflow: null,
      clientWidth: elementClientWidth,
      clientHeight: elementClientHeight,
      valueFontStyleIndex: null
    });
  }

  kpiItemResizeHandler(isNeedResize) {
    if(!isNeedResize && !this.state.is_show) {
      this.componentReady();
    }
  }
  checkRequiredSize(){
    let element = this.props.element;

    const scrollWidth = element.scrollWidth * 0.95;
    const scrollHeight = element.scrollHeight * 0.95;
    const shouldShowScrollBar = (element.clientHeight < scrollHeight || element.clientWidth < scrollWidth);
    if (this.state.overflow !== "auto" && shouldShowScrollBar) {
      this.setState({ overflow: "auto" });
    }
  }

  // Interpolates the two given colors by the given mix:
  // 0 => color1, 1 => color2, 0.5 => 50% of each
  interpolateColors(color1, color2, mix) {
    const c1 = parseInt('0x' + color1.color.substr(1));
    const c1r = c1 >> 16;
    const c1g = c1 >> 8 & 0xff;
    const c1b = c1 & 0xff;
    const c2 = parseInt('0x' + color2.color.substr(1));
    const c2r = c2 >> 16;
    const c2g = c2 >> 8 & 0xff;
    const c2b = c2 & 0xff;

    const clampedMix = Math.min(1, Math.max(0, mix));
    const cr = c1r + clampedMix * (c2r - c1r);
    const cg = c1g + clampedMix * (c2g - c1g);
    const cb = c1b + clampedMix * (c2b - c1b);

    const colorInt = (cr << 16) + (cg << 8) + (cb | 0);
    let colorHex = '#';
    if (colorInt <= 0xff) {
      colorHex += '0000';
    } else if (colorInt <= 0xffff) {
      colorHex += '00';
    }

    return {
      color: `${colorHex}${colorInt.toString(16)}`,
      index: -1
    }
  }

  getConditionalColor(measureColoring, measureValue) {
    const gradient = measureColoring.gradient;
    const lastSegment = gradient.limits.length;

    // Find segment
    let segment = 0;
    for (let i = 0; i < gradient.limits.length; i++) {
      if (measureValue >= gradient.limits[i]) {
        segment++;
      } else {
        break;
      }
    }

    let limitIndex;
    if (segment == 0) {
      limitIndex = 0;
    } else if (segment == lastSegment) {
      limitIndex = gradient.limits.length - 1;
    } else {
      // Determine what half of the segment the measure value is in
      const lowLimit = gradient.limits[segment - 1];
      const highLimit = gradient.limits[segment];
      if (measureValue - lowLimit < highLimit - measureValue) {
        limitIndex = segment - 1;
      } else {
        limitIndex = segment;
      }
    }

    if (gradient.breakTypes[limitIndex]) {
      // Soft break (interpolate)
      let center = gradient.limits[limitIndex];
      let width;
      if (lastSegment == 1) {
        // No defined edges, so use limit as width
        width = Math.max(2, 2 * Math.abs(gradient.limits[0]));
      } else if (segment == 0) {
        // First segment
        // This segment has no defined start, so base gradient width on width of next segment
        width = gradient.limits[limitIndex + 1] - gradient.limits[limitIndex];
      } else if (segment == lastSegment) {
        // Last segment
        // This segment has no defined end, so base gradient width on width of previous segment
        width = gradient.limits[limitIndex] - gradient.limits[limitIndex - 1];
      } else {
        // A segment in-between limits
        width = gradient.limits[segment] - gradient.limits[segment - 1];
      }

      const mix = ((measureValue - center) / width) + 0.5;
      return this.interpolateColors(
        gradient.colors[limitIndex], gradient.colors[limitIndex + 1], mix);

    } else {
      // Hard break (no interpolation)
      return gradient.colors[segment];
    }
  }

  renderKpis(kpis, rowindex, itemsPerRow){
    const self = this;
    const mainContainerElement = this.props.element;
    const numberFormatter = this.props.options.numberFormatter;
    const labelOrientation = this.props.options.labelOrientation; //this.state.labelOrientation;
    const services = this.props.services;
    const isShow = this.state.is_show;
    let options = this.props.options;
    let size = this.state.size;

    const currentSizeIndex = getSizeIndex(size);
    const originalSizeIndex = getSizeIndex(options.size);
    let deltaSizeIndex = 0;
    if(originalSizeIndex !== -1 && currentSizeIndex !== -1) {
      deltaSizeIndex = originalSizeIndex - currentSizeIndex;
    }

    const measuresShift = kpis.qDimensionInfo.length;
    const qMeasureInfo = kpis.qMeasureInfo;
    let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[rowindex];
    const dimensionValue = measuresShift > 0 && data[0].qText; // first dimension only
    let rows = Math.ceil(qMeasureInfo.length / itemsPerRow);
    return qMeasureInfo.map(function(item, mindex){
      let index = measuresShift + mindex;
      let itemSize = item.ovParams && item.size !== DEFAULT_SIZE ? item.size : options.size;
      if(deltaSizeIndex > 0) {
        let itemSizeIndex = getSizeIndex(itemSize);
        itemSizeIndex = Math.max(0, deltaSizeIndex > 0 ? itemSizeIndex - deltaSizeIndex + 1 : itemSizeIndex);
        itemSize = SIZE_OPTIONS[itemSizeIndex].value;
      }
      if(index >= data.length) return;
      const isAttrExps = data[index].qAttrExps && data[index].qAttrExps.qValues.length;
      let overridedLabel;
      if(isAttrExps)
        overridedLabel = data[index].qAttrExps.qValues[ATTRIBUTES.overridedLabel.index].qText;

      let valueColor = item.valueColor;
      if (item.conditionalValueColor
        && item.coloring
        && item.coloring.gradient
        && item.coloring.gradient.limitType === "absolute") {
        valueColor = self.getConditionalColor(item.coloring, data[index].qNum);
      }

      let params = {
        label: item.ovParams && overridedLabel ? overridedLabel : item.qFallbackTitle,
        value: "",
        measureIndex: mindex,
        numericValue: null,
        hideLabel: item.hideLabel,
        hideValue: item.hideValue,
        labelColor: item.labelColor,
        valueColor: valueColor,
        valueIcon: item.valueIcon,
        iconPosition: item.iconPosition,
        iconOrder: item.iconOrder,
        iconSize: item.iconSize,
        ovParams: item.ovParams,
        size: itemSize,
        labelOrder: item.ovParams ? item.labelOrder : options.labelOrder,
        labelOrientation: item.ovParams ? item.labelOrientation : labelOrientation,
        fontStyles: {},
        kpiLink: item.kpiLink,
        useLink: item.useLink,
        textAlignment: item.textAlignment,
        infographic: item.infographic,
        embeddedItem: item.embeddedItem,
        mainContainerElement: mainContainerElement,
        kpisRows: rows,
        isShow
      };
      params.onClick = self.onKPIClick.bind(self, params);


      let fontStyles = item.fontStyles && item.fontStyles.split(',');
      fontStyles && fontStyles.forEach(function(value){
        params.fontStyles[value] = value;
      });

      if(self.state.valueFontStyleIndex >= 0
      && self.state.valueFontStyleIndex < FONT_SIZE_OPTIONS.length)
        params.fontStyles.fontSize = FONT_SIZE_OPTIONS[self.state.valueFontStyleIndex];

      if(index < data.length) {
        params.value = data[index].qText;
        params.numericValue = data[index].qNum;
        if(item.qIsAutoFormat
        && item.autoFormatTemplate && item.autoFormatTemplate.length > 0
        && numberFormatter) {
          let value = data[index].qNum;
          if(!isNaN(value) && isFinite(value)) {
            if(item.autoFormatTemplate)
              params.value = numberFormatter.format(value, item.autoFormatTemplate);
            else
              params.value = numberFormatter.format(value, options.DEFAULT_AUTO_FORMAT); //formatValue
          }
        }
      }

      if(!item.groupByDimension
      || (item.groupByDimension && item.groupByDimensionValue === dimensionValue)) {
        let itemIndex = rowindex * (measuresShift + qMeasureInfo.length - 1) + mindex;
        return <StatisticItem ref={"child-" + itemIndex}
          index={itemIndex}
          measureCount={qMeasureInfo.length}
          key={item.cId}
          item={params}
          options={options}
          services={services}
          onNeedResize={self.kpiItemResizeHandler} />;
      }
      else
        return null;
    });
  }

  render(){
    const self = this;
    const { kpis, selections } = this.props;
    let {
      qId,
      dimLabelOrientation,
      dimLabelSize,
      dimHideLabels,
      dimCenteredLabels,
      dimensionsOrientation,
      dimHideBorders,
      dimHideInternalBorders,
      dimShowAs = 'segment',
      dimDivideBy = 'auto',
      divideBy,
      backgroundColor,
      verticalAlign = "top-aligned-items",
      styles = ''
    } = this.props.options;

    let items;

    if(kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {
      if(divideBy === "auto")
        divideBy = DIVIDE_BY[ Math.min(10, kpis.qDataPages[0].qMatrix[0].length - kpis.qDimensionInfo.length)];

      let divideByNumber = Math.max(1, DIVIDE_BY.indexOf(divideBy));

      // Dimension:
      if(kpis.qDimensionInfo.length > 0) {
        const dimNo = 0; // only one dimension allowed!
        if(dimDivideBy === "auto")
          dimDivideBy = DIVIDE_BY[Math.min(10, kpis.qDimensionInfo[dimNo].qCardinal)];
        let isInEditMode = this.props.services.State.isInEditMode();
        let inStoryMode = this.props.services.QlikComponent.options.selections;
        let EditModeClass = isInEditMode ? 'edit-mode' : '';
        let dimShowAsContainer = dimShowAs === 'card' ? `${dimDivideBy} stackable cards` : 'segments';
        let dimLabelsAlignment = '';
        if(dimCenteredLabels) dimLabelsAlignment = 'center aligned';
        let segmentsStyle = {}; //{margin: 0, height: '100%'};
        let segmentStyle = {};

        if(dimHideInternalBorders) segmentStyle.border = "0";
        if(dimHideBorders) {
          segmentsStyle.border = "0";
          segmentsStyle.boxShadow = "none";
          segmentStyle.boxShadow = "none";
          if(dimShowAs === 'card') {
            segmentStyle.border = "0";
          }
        }
        items = (
          <div className={`${verticalAlign}`}>
            <div className={`ui ${dimensionsOrientation} ${dimShowAsContainer} ${EditModeClass}`} ref="parent" style={segmentsStyle}>
              {
                kpis.qDataPages[0].qMatrix.map(function(dim, dindex){
                  let dimensionLabel = dim[dimNo].qText;
                  if (typeof(dimensionLabel) === 'undefined' || dimensionLabel === '')
                  {
                    dimensionLabel = '-';
                  }
                  const dimensionIndex = dim[dimNo].qElemNumber;
                  let measures = self.renderKpis(kpis, dindex, divideByNumber);
                  let aMeasureHasInfographicIcons = false;
                  let iconSize = '';
                  if(measures){
                    for(var i = 0 ; i < measures.length ; i++){
                      if(measures[i]){
                        if (measures[i].props.item.infographic === true){
                          aMeasureHasInfographicIcons = true;
                          iconSize = measures[i].props.item.iconSize;
                        }
                      }
                    }
                  }
                  const labelOptions = {
                    alignment: dimLabelsAlignment,
                    isHidden: dimHideLabels,
                    orientation: dimLabelOrientation,
                    size: dimLabelSize,
                    text: dimensionLabel
                  };
                  return (
                    <DimensionEntry
                      key={dimensionIndex}
                      dimension={dim}
                      isInEditMode={isInEditMode}
                      inStoryMode={inStoryMode}
                      divideBy={divideBy}
                      dindex={dindex}
                      divideByNumber={divideByNumber}
                      dimNo={dimNo}
                      dimensionIndex={dimensionIndex}
                      label={labelOptions}
                      onToggle={self.onDimensionLabelClick}
                      showAs={dimShowAs}
                      style={segmentStyle}
                      dimDivideBy={dimDivideBy}
                      aMeasureHasInfographicIcons={aMeasureHasInfographicIcons}
                      iconSize={iconSize}
                    >
                      {measures}
                    </DimensionEntry>
                  );
                })
              }
            </div>
          </div>
        );
      } else {
        items = (
          <div className={`${verticalAlign}`}>
            <div ref="statistics" className={`ui ${divideBy} statistics`}>
              {self.renderKpis(kpis, 0, divideByNumber)}
            </div>
          </div>);
      }
    }

    let objectStyle = {
    };
    if(backgroundColor) objectStyle.backgroundColor = backgroundColor.color;
    if(this.state.overflow) {
      objectStyle.WebkitOverflowScrolling = 'touch'; // nice webkit scorll support
    }

    if(!this.state.is_show) {
      objectStyle.visibility = 'hidden';
    }

    return (
      <InlineCSS namespace={`css-${qId}`} stylesheet={encodeForHTML(styles)} style={{ height: "100%" }}>
        <div className={`qv-object-qsstatistic ${this.props.services.State.isInEditMode() ? 'edit-mode' : ''}`} style={objectStyle}>
          {items}
        </div>
      </InlineCSS>
    );
  }

  onKPIClick(kpi) {
    const services = this.props.services;
    const isAllowOpenSheet = (this.props.services.State
      && !this.props.services.State.isInEditMode());
    if(kpi.useLink && isAllowOpenSheet /*&& services.Routing*/) {
      let linkId;
      if (typeof(kpi.kpiLink) === "string")
        linkId = kpi.kpiLink;
      else
        linkId = kpi.kpiLink && kpi.kpiLink.id;

      if(linkId) {
        //services.Routing.goToSheet(linkId, 'analysis');
        services.Qlik.navigation.gotoSheet(linkId);
      }
    }
  }

  onDimensionLabelClick(dimensionNumber, value) {
    const { services } = this.props;
    if (services && services.QlikComponent) {
      services.QlikComponent.selectValues(dimensionNumber, [value], true);
    }
  }
}

export default StatisticBlock;
