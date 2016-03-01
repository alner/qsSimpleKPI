import React, {Component} from 'react';
//import styler from 'react-styling';
import InlineCSS from 'react-inline-css';
import {DIVIDE_BY, SIZE_OPTIONS, getSizeIndex} from './options';
import StatisticItem from './statisticItem';

class StatisticBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: props.options.size,
      labelOrientation: props.options.labelOrientation,
      clientWidth: props.element.clientWidth,
      clientHeight: props.element.clientHeight,
      overflow: null
    };
  }

  componentDidMount(){
    //this.checkRequiredSize();
    var self = this;
    setTimeout(function(){self.checkRequiredSize();}, 100);
    //this.setState({isMounted: true}); // force update
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
    let labelOrientation = this.props.options.labelOrientation;
    let size = this.props.options.size;
    this.setState({
      size: size,
      overflow: null,
      labelOrientation: labelOrientation,
      clientWidth: elementClientWidth,
      clientHeight: elementClientHeight
    });
  }

  checkRequiredSize(){
    //if(!this.state.isMounted) return;
    let element = this.props.element;
    let scrollWidth = element.scrollWidth * 0.95;
    let scrollHeight = element.scrollHeight * 0.95;

    if(this.props.options.autoSize) {
      let size = this.state.size;
      let labelOrientation = this.state.labelOrientation;
      let elementClientWidth = this.props.element.clientWidth;
      let elementClientHeight = this.props.element.clientHeight;
      let clientWidth = this.state.clientWidth;
      let clientHeight = this.state.clientHeight;
      // let element = this.props.element;
      // let scrollWidth = element.scrollWidth * 0.95;
      // let scrollHeight = element.scrollHeight * 0.95;
      let childHeight = 0;

      if(element.clientHeight == element.scrollHeight
      && this.state.size == this.props.options.size
      && !this.state.overflow) return;

      if(this.refs['child-0']) {
        childHeight = React.findDOMNode(this.refs['child-0']).clientHeight;
      }
      if(element &&
        (
           (element.clientHeight < scrollHeight || element.clientHeight < childHeight)
        || ((clientWidth != element.clientWidth || clientHeight != element.clientHeight)
           && (size != this.props.options.size)
           )
        || (size != SIZE_OPTIONS[0].value && labelOrientation != this.props.options.labelOrientation)
        )
      )
      {
        if(element.clientHeight < scrollHeight || element.clientHeight < childHeight
        || element.clientWidth < scrollWidth) {
          if(this.state.size == SIZE_OPTIONS[0].value && this.state.labelOrientation == 'horizontal')
            return;

          let index = getSizeIndex(size);
          if(index > 0)
            this.setState({
              size: SIZE_OPTIONS[index - 1].value,
              clientWidth: elementClientWidth,
              clientHeight: elementClientHeight
            });
          else if(index == 0){
            if(this.state.overflow !== "auto")
              this.setState({overflow: "auto"});
            /*
            this.setState({
              //labelOrientation: 'horizontal',
              size: SIZE_OPTIONS[0].value,
              clientWidth: elementClientWidth,
              clientHeight: elementClientHeight
            });
            */
          }
        }
        else
        if(size != SIZE_OPTIONS[0].value
        && labelOrientation != this.props.options.labelOrientation) {
          // restore label orientation
          this.setState({
            labelOrientation: this.props.options.labelOrientation
          });
        }
        else
        {
          this.restoreSize();
        }
      }
    } else {
        if(element.clientHeight < scrollHeight || element.clientWidth < scrollWidth) {
          if(this.state.overflow !== "auto")
            this.setState({overflow: "auto"});
        }
        // else
        // if(this.state.labelOrientation != this.props.options.labelOrientation
        // || this.state.overflow
        // || this.state.size != this.props.options.size) {
        //   this.restoreSize();
        // }
    }
  }

  renderKpis(kpis, rowindex){
    const self = this;
    let numberFormatter = this.props.numberFormatter;
    let options = this.props.options;
    let size = this.state.size;

    const currentSizeIndex = getSizeIndex(size);
    const originalSizeIndex = getSizeIndex(this.props.options.size);
    let deltaSizeIndex = 0;
    if(originalSizeIndex !== -1 && currentSizeIndex !== -1) {
      deltaSizeIndex = originalSizeIndex - currentSizeIndex;
    }

    let labelOrientation = this.state.labelOrientation;
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
        hideLabel: item.hideLabel,
        labelColor: item.labelColor,
        valueColor: item.valueColor,
        valueIcon: item.valueIcon,
        iconPosition: item.iconPosition,
        iconOrder: item.iconOrder,
        iconSize: item.iconSize,
        ovParams: item.ovParams,
        size: item.ovParams ? itemSize : size,
        //itemLabelOrientation: item.ovParams ? item.labelOrientation : labelOrientation,
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

      if(index < data.length) {
        params.value = data[index].qText;
        if(item.qIsAutoFormat && numberFormatter) {
          let value = data[index].qNum;
          if(!isNaN(value) && isFinite(value)) {
            params.value = numberFormatter.formatValue(value);
          }
        }
      }
      else
        params.value = '';

      if(!item.groupByDimension
      || (item.groupByDimension && item.groupByDimensionValue === dimensionValue))
        return <StatisticItem ref={"child-" + index} index={index} key={item.cId} item={params} options={options} />
      else
        return null;
    });
  }

  render(){
    const self = this;
    let options = this.props.options;
    let dimLabelsOrientation = options.dimLabelOrientation;
    let dimOrientation = options.dimensionsOrientation;
    const styles = this.props.options.styles || '';
    const dimHideLabel = options.dimHideLabels;
    const dimHideBorders = options.dimHideBorders;
    const dimHideInternalBorders = options.dimHideInternalBorders;
    //let size = this.state.size; // || options.size || "";
    let kpis = this.props.kpis;
    let items;
    let objectStyle = {};
    if(this.state.overflow)
      objectStyle.overflow = this.state.overflow;

    let divideBy = options.divideBy;

    // kpis.qDataPage.length > 0 && kpis.qDataPage[0].qMatrix.length > 0 && kpis.qDataPage[0].qMatrix[0]
    if(kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {

      if(divideBy === "auto")
        divideBy = DIVIDE_BY[Math.min(10, kpis.qDataPages[0].qMatrix[0].length - kpis.qDimensionInfo.length)];

      //let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[0];
      if(kpis.qDimensionInfo.length > 0) {
        let segmentsStyle = {margin: 0, height: '100%'};
        if(dimHideBorders) {
          segmentsStyle.border = "0";
          segmentsStyle.boxShadow = "none";
        }

        let segmentStyle = {};
        if(dimHideInternalBorders) segmentStyle.border = "0";

        items = (
          <div className={`ui ${dimOrientation} segments`} style={segmentsStyle}>
          {
            kpis.qDataPages[0].qMatrix.map(function(dim, dindex){
              const dimensionLabel = dim[0].qText; // could be only one dimension!
              let measures = self.renderKpis(kpis, dindex);
              return (
              <div className={'ui segment'} style={segmentStyle}>
                {dimHideLabel ? null : <a className={`ui ${options.dimLabelSize} ${dimLabelsOrientation} label`}>{dimensionLabel}</a>}
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
      services.Routing.goToSheet(kpi.kpiLink && kpi.kpiLink.id, 'analysis');
    }
  }
}

export default StatisticBlock;
