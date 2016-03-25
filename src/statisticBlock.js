import React, {Component} from 'react';
import InlineCSS from 'react-inline-css';
import {DIVIDE_BY, SIZE_OPTIONS, FONT_SIZE_OPTIONS, getSizeIndex} from './options';
import StatisticItem from './statisticItem';

class StatisticBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: props.options.size,
      clientWidth: props.element.clientWidth,
      clientHeight: props.element.clientHeight,
      overflow: null,
      valueFontStyleIndex: null
    };
  }

  componentDidMount(){
    var self = this;
    setTimeout(function(){self.checkRequiredSize();}, 100);
  }

  componentDidUpdate() {
    this.checkRequiredSize();
  }

  componentWillReceiveProps(nextProps) {
    this.restoreSize();
  }

  restoreSize(){
    let elementClientWidth = this.props.element.clientWidth;
    let elementClientHeight = this.props.element.clientHeight;
    let size = this.props.options.size;
    this.setState({
      size: size,
      overflow: null,
      clientWidth: elementClientWidth,
      clientHeight: elementClientHeight,
      valueFontStyleIndex: null
    });
  }

  kpiItemResizeHandler() {
    if(this.props.options.autoSize) {
      let size = this.state.size;
      let index = getSizeIndex(size);
      if(index > 0) {
        this.setState({
          size: SIZE_OPTIONS[index - 1].value
        });
      } else {
        if(this.state.valueFontStyleIndex)
          this.setState({valueFontStyleIndex: this.state.valueFontStyleIndex - 1});
        else
        if(this.state.valueFontStyleIndex !== 0)
          this.setState({valueFontStyleIndex: FONT_SIZE_OPTIONS.length - 1});
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
        childHeight = React.findDOMNode(this.refs['child-0']).clientHeight;
      }

      if(element &&
        ((element.clientHeight < scrollHeight
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
          if(index > 0)
            this.setState({
              size: SIZE_OPTIONS[index - 1].value,
              clientWidth: elementClientWidth,
              clientHeight: elementClientHeight,
              prevClientWidth: this.state.clientWidth,
              prevClientHeight: this.state.clientHeight
            });
          else if(index == 0){
            if(this.state.overflow !== "auto")
              this.setState({overflow: "auto"});
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
          this.setState({overflow: "auto"});
    }
  }

  renderKpis(kpis, rowindex){
    const self = this;
    const numberFormatter = this.props.options.numberFormatter;
    const labelOrientation = this.props.options.labelOrientation; //this.state.labelOrientation;

    let options = this.props.options;
    let size = this.state.size;

    const currentSizeIndex = getSizeIndex(size);
    const originalSizeIndex = getSizeIndex(this.props.options.size);
    let deltaSizeIndex = 0;
    if(originalSizeIndex !== -1 && currentSizeIndex !== -1) {
      deltaSizeIndex = originalSizeIndex - currentSizeIndex;
    }

    const measuresShift = kpis.qDimensionInfo.length;
    const qMeasureInfo = kpis.qMeasureInfo;
    let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[rowindex];
    const dimensionValue = measuresShift > 0 && data[0].qText; // first dimension only
    return qMeasureInfo.map(function(item, mindex){
      let index = measuresShift + mindex;
      let itemSize = item.size;
      if(deltaSizeIndex > 0) {
        let itemSizeIndex = getSizeIndex(itemSize);
        itemSizeIndex = Math.max(0, deltaSizeIndex > 0 ? itemSizeIndex - deltaSizeIndex : itemSizeIndex);
        itemSize = SIZE_OPTIONS[itemSizeIndex].value;
      }
      let params = {
        label: item.qFallbackTitle,
        value: "",
        hideLabel: item.hideLabel,
        labelColor: item.labelColor,
        valueColor: item.valueColor,
        valueIcon: item.valueIcon,
        iconPosition: item.iconPosition,
        iconOrder: item.iconOrder,
        iconSize: item.iconSize,
        ovParams: item.ovParams,
        size: item.ovParams ? itemSize : size,
        labelOrder: item.ovParams ? item.labelOrder : options.labelOrder,
        labelOrientation: item.ovParams ? item.labelOrientation : labelOrientation,
        fontStyles: {},
        kpiLink: item.kpiLink,
        useLink: item.useLink
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
        if(item.qIsAutoFormat && numberFormatter) {
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
          onNeedResize={self.kpiItemResizeHandler.bind(self)} />
        }
      else
        return null;
    });
  }

  render(){
    const self = this;
    const kpis = this.props.kpis;
    let {
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
      styles = ''
    } = this.props.options;

    let items;

    if(kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {

      if(divideBy === "auto")
        divideBy = DIVIDE_BY[Math.min(10, kpis.qDataPages[0].qMatrix[0].length - kpis.qDimensionInfo.length)];

      // Dimension:
      if(kpis.qDimensionInfo.length > 0) {
        if(dimDivideBy === "auto")
          dimDivideBy = DIVIDE_BY[Math.min(10, kpis.qDimensionInfo[0].qCardinal)];

        let dimShowAsContainer = dimShowAs === 'card' ? `${dimDivideBy} stackable cards`  : 'segments';
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
          <div className={`ui ${dimensionsOrientation} ${dimShowAsContainer}`} style={segmentsStyle}>
          {
            kpis.qDataPages[0].qMatrix.map(function(dim, dindex){
              const dimensionLabel = dim[0].qText; // could be only one dimension!
              let measures = self.renderKpis(kpis, dindex);
              return (
              <div className={`ui ${dimShowAs}`} style={segmentStyle}>
                {dimHideLabels ? null : <a className={`ui ${dimLabelSize} ${dimLabelOrientation} ${dimLabelsAlignment} label`}>{dimensionLabel}</a>}
                <div ref="statistics" className={`ui ${divideBy} statistics`}>
                {measures}
                </div>
              </div>)
            })
          }
          </div>
        );
      } else {
        // ${size}
        items = (
          <div ref="statistics" className={`ui ${divideBy} statistics`}>
            {self.renderKpis(kpis, 0)}
          </div>);
      }
    }

    let objectStyle = {};
    if(this.state.overflow)
      objectStyle.overflow = this.state.overflow;

    return (
      <div className="qv-object-qsstatistic" style={objectStyle}>
        <InlineCSS stylesheet={styles}>
          {items}
        </InlineCSS>
      </div>
    );
  }

  onKPIClick(kpi) {
    const services = this.props.services;
    const isAllowOpenSheet = (this.props.services.State
      && !this.props.services.State.isInEditMode());
    if(kpi.useLink && isAllowOpenSheet && services.Routing) {
      let linkId;
      if (typeof(kpi.kpiLink) === "string")
        linkId = kpi.kpiLink
      else
        linkId = kpi.kpiLink && kpi.kpiLink.id;

      if(linkId)
        services.Routing.goToSheet(linkId, 'analysis');
    }
  }
}

export default StatisticBlock;
