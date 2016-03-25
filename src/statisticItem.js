import React, {Component} from 'react';
import {getDivideByValue} from './options';

export default class StatisticItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var self = this;
    setTimeout(function(){self.checkRequiredSize();}, 100);
  }

  componentDidUpdate() {
    this.checkRequiredSize();
  }

  checkRequiredSize(){
    if(!this.props.onNeedResize)
      return;

    let valueElement = React.findDOMNode(this.refs['value']);
    if(valueElement.firstChild) {
      let valueChild = valueElement.firstChild;
      let childWidth = $(valueChild).width();
      //let childHeight = $(valueChild).height();
      if(childWidth > valueElement.clientWidth) {
          this.props.onNeedResize();
      }
    }
  }

  render(){
    //let size = this.props.item.size || "";
    const index = this.props.index;
    const {
      hideLabel,
      labelOrientation = "",
      labelOrder,
      iconOrder,
      labelColor,
      valueColor = "",
      valueIcon,
      iconSize = "",
      size = "",
      fontStyles,
      onClick
    } = this.props.item;

    //let labelOrderFirst = labelOrder === "first";
    // const hideLabel = this.props.item.hideLabel;
    // const onItemClick = this.props.item.onClick;
    //let labelOrientation = this.props.item.labelOrientation || "";
    //let labelColor = this.props.item.labelColor;
    // let valueColor = this.props.item.valueColor || "";
    //let valueIcon = this.props.item.valueIcon || "";
    // let iconSize = this.props.item.iconSize;
    // let fontStyles = this.props.item.fontStyles;

    let labelStyles = {padding: "0px 5px"};
    let valueStyles = {padding: "0px 5px", color: valueColor};

    if(labelColor)
      labelStyles.color = labelColor;

    if(fontStyles.bold)
      valueStyles.fontWeight = 'bold';

    if(fontStyles.italic)
      valueStyles.fontStyle = 'italic';

    if(fontStyles.underline)
      valueStyles.textDecoration = 'underline';

    if(fontStyles.fontSize)
      valueStyles.fontSize = fontStyles.fontSize;

      // valueStyles.color = valueColor;
    let classes = `ui ${labelOrientation} ${size} statistic`;
    classes = classes.split(" ").filter(function(item){
      return item.trim().length > 0;
    }).join(" ");

    let iconOrderFirst = iconOrder === "first";
    let labelComponent = hideLabel ? null : (
      <div key="lbl" className="label" style={labelStyles}>
        {iconOrderFirst && this.props.item.iconPosition === 'label' ? <i className={`${valueIcon} ${iconSize}`}></i> : null}
        {this.props.item.label}
        {!iconOrderFirst && this.props.item.iconPosition === 'label' ? <i className={`${valueIcon} ${iconSize}`}></i> : null}
      </div>
    );

    let valueComponent = (
        <div key="val" ref="value" className="value" style={valueStyles}>
          {iconOrderFirst && this.props.item.iconPosition === 'value' ? <i className={`${valueIcon} ${iconSize}`}></i> : null}
          {this.props.item.value}
          {!iconOrderFirst && this.props.item.iconPosition === 'value' ? <i className={`${valueIcon} ${iconSize}`}></i> : null}
        </div>
      );

    let content = [];
    if(labelOrder === "first") {
      content.push(labelComponent);
      content.push(valueComponent);
    } else {
      content.push(valueComponent);
      content.push(labelComponent);
    }

    let statisticStyles = {};
    if (onClick) {
      statisticStyles.cursor = "pointer";
    }
    // *** patch for ios devices ***
    let divPercent = getDivideByValue(this.props.options.divideBy);
    if(divPercent) {
      statisticStyles.width = divPercent + '%';
    }
    // *** patch for ios dev ***
    // statistic-${index} - allows to use custom style to each measures element
    let statisticItem = (
      <div className={`statistic statistic-${index+1}`}
          style={statisticStyles}
          onClick={onClick}>
        <div className={`ui one ${size} statistics`}>
          <div className={classes}>
            {content}
          </div>
        </div>
      </div>
    );

    return statisticItem;
  }
}
