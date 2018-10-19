import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InlineCSS from 'react-inline-css';
import { DIVIDE_BY, SIZE_OPTIONS, DEFAULT_SIZE, FONT_SIZE_OPTIONS, getSizeIndex } from './options';
import DimensionEntry from './dimensionEntry';
import StatisticItem from './statisticItem';
import ATTRIBUTES from './definitionAttributes';

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
    this.getSelections = this.getSelections.bind(this);
    this.isSelectedFunction = this.isSelectedFunction.bind(this);
  }

  componentDidMount(){
    var self = this;

    // 3.2 SR2 Printing service patch (timeout strange behaviour, 10 equals to 10 sec (instead of 10 msec) in setTimeout)
    const isPrinting = this.isPrinting();
    const checkRequiredSizeDelay = isPrinting ? 1 : 50; //1
    const readyDelay = isPrinting ? 10 : 10000; // 10

    setTimeout(function(){self.checkRequiredSize();}, checkRequiredSizeDelay);
    // initial resize should not be visible
    setTimeout(function(){ self.componentReady(); }, readyDelay);
  }

  componentDidUpdate() {
    this.checkRequiredSize();
  }

  componentWillReceiveProps(nextProps) {
    this.restoreSize(nextProps);
  }

  componentReady() {
    // initial resize should not be visible
    this.setState({ is_show: true });
    this.props.services.PrintResolver && this.props.services.PrintResolver(); // we are ready... can be printed!
  }

  isPrinting() {
    return this.props.services.QlikComponent.backendApi.isSnapshot
      && this.props.services.Qlik.navigation
      && !this.props.services.Qlik.navigation.inClient;
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
      // this.setState({
      //   is_show: true
      // });
      this.componentReady();
    } else
    if(isNeedResize && this.props.options.autoSize) {
      let size = this.state.size;
      let index = getSizeIndex(size);
      if(index > 0) {
        this.setState({
          size: SIZE_OPTIONS[index - 1].value
        });
      } else {
        if(this.state.valueFontStyleIndex)
          this.setState({ valueFontStyleIndex: this.state.valueFontStyleIndex - 1 });
        else
        if(this.state.valueFontStyleIndex !== 0)
          this.setState({ valueFontStyleIndex: FONT_SIZE_OPTIONS.length - 1 });
      }
    }
  }

  checkRequiredSize(){
    let element = this.props.element;

    let scrollWidth = element.scrollWidth * 0.95;
    let scrollHeight = element.scrollHeight * 0.95;

    if(this.props.options.autoSize) {
      let size = this.state.size;
      let elementClientWidth = this.props.element.clientWidth;
      let elementClientHeight = this.props.element.clientHeight;
      let clientWidth = this.state.clientWidth;
      let clientHeight = this.state.clientHeight;
      let childHeight = 0;

      if(element.clientHeight == element.scrollHeight
      && this.state.size == this.props.options.size
      && !this.state.overflow) return;

      if(this.refs['child-0']) {
        childHeight = ReactDOM.findDOMNode(this.refs['child-0']).clientHeight;
      }

      if(element
        && ((element.clientHeight < scrollHeight
          || childHeight && element.clientHeight < childHeight)
        || ((clientWidth != element.clientWidth
          || clientHeight != element.clientHeight)
           && size != this.props.options.size)
        ))
      {
        if(element.clientHeight < scrollHeight
          || element.clientHeight < childHeight
          || element.clientWidth < scrollWidth) {
          if(this.state.size == SIZE_OPTIONS[0].value
          && this.state.overflow === "auto")
            return;

          let index = getSizeIndex(size);
          if(index > 0) {
            // trying to reduce size ...
            this.setState({
              size: SIZE_OPTIONS[index - 1].value,
              clientWidth: elementClientWidth,
              clientHeight: elementClientHeight,
              prevClientWidth: this.state.clientWidth,
              prevClientHeight: this.state.clientHeight
            });
          }
          else if(index == 0){
            if(this.state.valueFontStyleIndex !== 0) {
              // trying to reduce font size ...
              this.kpiItemResizeHandler(true);
            } else
            if(this.state.overflow !== "auto")
              this.setState({ overflow: "auto" }); // ...show scrollbars
          }
        }
        else
        {
          if(this.state.prevClientWidth > this.state.clientWidth
          || this.state.prevClientHeight > this.state.clientHeight)
            this.restoreSize();
        }
      }
    } else {
      if((this.state.overflow !== "auto")
        && (element.clientHeight < scrollHeight
          || element.clientWidth < scrollWidth))
        this.setState({ overflow: "auto" });
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
        itemSizeIndex = Math.max(0, options.autoSize && deltaSizeIndex > 0 ? itemSizeIndex - deltaSizeIndex + 1 : itemSizeIndex);
        itemSize = SIZE_OPTIONS[itemSizeIndex].value;
      }
      if(index >= data.length) return;
      const isAttrExps = data[index].qAttrExps && data[index].qAttrExps.qValues.length;
      let overridedLabel;
      if(isAttrExps)
        overridedLabel = data[index].qAttrExps.qValues[ATTRIBUTES.overridedLabel.index].qText;
      let params = {
        label: item.ovParams && overridedLabel ? overridedLabel : item.qFallbackTitle,
        value: "",
        measureIndex: mindex,
        numericValue: null,
        hideLabel: item.hideLabel,
        hideValue: item.hideValue,
        labelColor: item.labelColor,
        valueColor: item.valueColor,
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
        let itemIndex = rowindex * (measuresShift + qMeasureInfo.length) + mindex;
        return <StatisticItem ref={"child-" + itemIndex}
          index={itemIndex}
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
    console.log('render <StatisticBlock />');
    const self = this;
    const kpis = this.props.kpis;
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
        let dimShowAsContainer = dimShowAs === 'card' ? `${dimDivideBy} stackable cards` : 'segments';
        let dimLabelsAlignment = '';
        if(dimCenteredLabels) dimLabelsAlignment = 'center aligned';
        let segmentsStyle = {}; //{margin: 0, height: '100%'};
        let segmentStyle = {};
        let array = this.getSelections();
        let arrayOfValues= [];
        if(array){
          arrayOfValues = array;
        }

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
            <div className={`ui ${dimensionsOrientation} ${dimShowAsContainer}`} style={segmentsStyle}>
              {
                kpis.qDataPages[0].qMatrix.map(function(dim, dindex){
                  const dimensionLabel = dim[dimNo].qText;
                  const dimensionIndex = dim[dimNo].qElemNumber;
                  let measures = self.renderKpis(kpis, dindex, divideByNumber);
                  const labelOptions = {
                    alignment: dimLabelsAlignment,
                    isHidden: dimHideLabels,
                    orientation: dimLabelOrientation,
                    size: dimLabelSize,
                    text: dimensionLabel
                  };
                  return (
                    <DimensionEntry
                      isInEditMode={isInEditMode}
                      isSelected={ self.isSelectedFunction(arrayOfValues ,labelOptions.text ) }
                      divideBy={divideBy}
                      dindex={dindex}
                      divideByNumber={divideByNumber}
                      dimNo={dimNo}
                      dimensionIndex={dimensionIndex}
                      label={labelOptions}
                      onToggle={self.onDimensionLabelClick}
                      showAs={dimShowAs}
                      style={segmentStyle}
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
      objectStyle.overflow = this.state.overflow;
      objectStyle.WebkitOverflowScrolling = 'touch'; // nice webkit scorll support
    }

    if(!this.state.is_show) {
      objectStyle.visibility = 'hidden';
    }

    return (
      <InlineCSS namespace={`css-${qId}`} stylesheet={styles} style={{ height: "100%" }}>
        <div className="qv-object-qsstatistic" style={objectStyle}>
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

  getSelections(){
    let selectionsArray = [];
    if (this.props.services.Qlik.currApp().selectionState().selections.length > 0) {
      selectionsArray = this.props.services.Qlik.currApp().selectionState().selections[0].selectedValues.map(a => a.qName);
    }

    return selectionsArray;
  }
  isSelectedFunction (arrayOfValues,label) {
    if(arrayOfValues.indexOf(label) > -1 ){
      return true;
    }else {
      return false;
    }
  }
  onDimensionLabelClick(dimNo, value) {
    const { services } = this.props;
    if (services && services.QlikComponent) {
      services.QlikComponent.selectValues(dimNo, [value], true);
    }
  }
}

export default StatisticBlock;
