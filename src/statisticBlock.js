import React from 'react';
import {DIVIDE_BY, SIZE_OPTIONS} from './options';

class StatisticItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let size = this.props.item.size || "";
    let labelOrientation = this.props.item.labelOrientation || "";
    let labelOrderFirst = this.props.options.labelOrder === "first";
    let labelColor = this.props.item.labelColor;
    let valueColor = this.props.item.valueColor || "";
    let valueIcon = this.props.item.valueIcon || "";
    let iconOrderFirst = this.props.item.iconOrder === "first";
    let iconSize = this.props.item.iconSize;
    let fontStyles = this.props.item.fontStyles;

    if(iconSize)
      valueIcon += ` ${iconSize}`;

    let labelStyles = {padding: "0px 5px"};
    let valueStyles = {padding: "0px 5px"};

    if(labelColor)
      labelStyles.color = labelColor;

    if(fontStyles.bold)
      valueStyles.fontWeight = 'bold';

    if(fontStyles.italic)
      valueStyles.fontStyle = 'italic';

    if(fontStyles.underline)
      valueStyles.textDecoration = 'underline';

    let classes = `ui ${labelOrientation} ${size} statistic`;

    valueStyles.color = valueColor;

    classes = classes.split(" ").filter(function(item){
      return item.trim().length > 0;
    }).join(" ");

    let labelComponent = (
      <div key="lbl" className="label" style={labelStyles}>
        {iconOrderFirst && this.props.item.iconPosition === 'label' ? <i className={valueIcon}></i> : null}
        {this.props.item.label}
        {!iconOrderFirst && this.props.item.iconPosition === 'label' ? <i className={valueIcon}></i> : null}
      </div>
    );

    let valueComponent = (
        <div key="val" className="value" style={valueStyles}>
          {iconOrderFirst && this.props.item.iconPosition === 'value' ? <i className={valueIcon}></i> : null}
          {this.props.item.value}
          {!iconOrderFirst && this.props.item.iconPosition === 'value' ? <i className={valueIcon}></i> : null}
        </div>
      );

    let content = [];
    if(labelOrderFirst) {
      content.push(labelComponent);
      content.push(valueComponent);
    } else {
      content.push(valueComponent);
      content.push(labelComponent);
    }

    return (
      <div className={classes}>
        {content}
      </div>
    );
  }
}

class StatisticBlock extends React.Component {
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
    if(this.props.options.autoSize) {
      let size = this.state.size;
      let labelOrientation = this.state.labelOrientation;
      let elementClientWidth = this.props.element.clientWidth;
      let elementClientHeight = this.props.element.clientHeight;
      let clientWidth = this.state.clientWidth;
      let clientHeight = this.state.clientHeight;
      let element = this.props.element;
      let scrollHeight = element.scrollHeight * 0.95;
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
        if(element.clientHeight < scrollHeight || element.clientHeight < childHeight) {
          if(this.state.size == SIZE_OPTIONS[0].value && this.state.labelOrientation == 'horizontal')
            return;

          let index = SIZE_OPTIONS.map(function(item){
            return item.value;
          }).indexOf(size);

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
        if(this.state.labelOrientation != this.props.options.labelOrientation
        || this.state.overflow
        || this.state.size != this.props.options.size) {
          this.restoreSize();
        }
    }
  }

  renderKpis(kpis, rowindex){
    let numberFormatter = this.props.numberFormatter;
    let options = this.props.options;
    let size = this.state.size;
    let labelOrientation = this.state.labelOrientation;
    const measuresShift = kpis.qDimensionInfo.length;
    const qMeasureInfo = kpis.qMeasureInfo;
    let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[rowindex];
    return qMeasureInfo.map(function(item, mindex){
      let index = measuresShift + mindex;
      let params = {
        label: item.qFallbackTitle,
        labelColor: item.labelColor,
        valueColor: item.valueColor,
        valueIcon: item.valueIcon,
        iconPosition: item.iconPosition,
        iconOrder: item.iconOrder,
        iconSize: item.iconSize,
        size: size,
        labelOrientation: labelOrientation,
        fontStyles: {}
      };

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

      return <StatisticItem ref={"child-" + index} key={item.cId} item={params} options={options} />
    });
  }

  render(){
    const self = this;
    let options = this.props.options;
    let dimLabelsOrientation = options.dimLabelOrientation;
    let dimOrientation = options.dimensionsOrientation;
    let size = this.state.size; // || options.size || "";
    let kpis = this.props.kpis;
    let items;
    let objectStyle = {};
    if(this.state.overflow)
      objectStyle.overflow = this.state.overflow;

    let divideBy = options.divideBy;

    // this.props.kpis.qMeasureInfo.length > 0
    // kpis.qDataPage.length > 0 && kpis.qDataPage[0].qMatrix.length > 0 && kpis.qDataPage[0].qMatrix[0]
    if(kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {

      if(divideBy === "auto")
        divideBy = DIVIDE_BY[Math.min(10, kpis.qDataPages[0].qMatrix[0].length - kpis.qDimensionInfo.length)];

      //let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[0];
      if(kpis.qDimensionInfo.length > 0) {
        items = (
          <div className={`ui ${dimOrientation} segments`}>
          {
            kpis.qDataPages[0].qMatrix.map(function(dim, dindex){
              const dimensionLabel = dim[0].qText; // could be only one dimension!
              let measures = self.renderKpis(kpis, dindex);
              return (
              <div className={'ui segment'}>
                <a className={`ui ${options.dimLabelSize} ${dimLabelsOrientation} label`}>{dimensionLabel}</a>
                <div ref="statistics" className={`ui ${divideBy} ${size} statistics`}>
                {measures}
                </div>
              </div>)
            })
          }
          </div>
        );
      } else {
        items = (
          <div ref="statistics" className={`ui ${divideBy} ${size} statistics`}>
            {self.renderKpis(kpis, 0)}
          </div>);
      }
    }

    return (
      <div className="qv-object-qsstatistic" style={objectStyle}>
          {items}
      </div>
    );
  }
}

export default StatisticBlock;
