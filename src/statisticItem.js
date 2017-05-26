import React, {Component} from 'react';
import {getDivideByValue} from './options';
import senseDragDropSupport from './senseDragDropSupport';
import ValueComponent from './ValueComponent';


class Icon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      value,
      valueIcon,
      iconSize,
      infographic
    } = this.props;
    if(infographic) {
      let icons = [];
      if(!isNaN(value) && isFinite(value)) {
        value = Math.min(1000, value);
        for (let i = 0; i < value; ++i)
          icons.push(<i key={i} className={`${valueIcon} ${iconSize}`}></i>);
      }

      return (
        <span>
          {icons}
        </span>
      )
    }
    else
      return (<i className={`${valueIcon} ${iconSize}`}></i>);
  }
};

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
    //let embeddedItem = this.props.item.embeddedItem;
    if(!this.props.onNeedResize) // || (embeddedItem && embeddedItem.trim().length > 0)
      return;

    let valueElement = React.findDOMNode(this.refs['value']);
    if(valueElement && valueElement.firstChild) {
      let valueChild = valueElement.firstChild;
      let childWidth = $(valueChild).width();
      //let childHeight = $(valueChild).height();
      if(childWidth > valueElement.clientWidth) {
          this.props.onNeedResize(true);
      } else
        this.props.onNeedResize(false);
    }
  }

  render(){
    //let size = this.props.item.size || "";
    const index = this.props.index;
    const services = this.props.services;
    const {
      hideLabel,
      hideValue,
      labelOrientation = "",
      labelOrder,
      iconOrder,
      labelColor,
      value, // for Dual contains text repr
      measureIndex,
      numericValue, // for Dual contains numeric repr
      valueColor = "",
      valueIcon,
      iconSize = "",
      size = "",
      fontStyles,
      onClick,
      textAlignment = "center",
      infographic,
      embeddedItem,
      mainContainerElement,
      kpisRows,
      isShow
    } = this.props.item;

    let labelStyles = {padding: "0px 5px", textAlign: textAlignment};
    let valueStyles = {padding: "0px 5px", textAlign: textAlignment, color: valueColor};
    // if(embeddedItem && hideLabel)
    //  valueStyles.marginTop = `${QLIK_COMP_TOOLBAR_HEIGHT}px`;

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
    // <i className={`${valueIcon} ${iconSize}`}></i>
    let iconOrderFirst = iconOrder === "first";
    let labelComponent = hideLabel ? null : (
      <div key="lbl" className="label" style={labelStyles}>
        {iconOrderFirst && this.props.item.iconPosition === 'label' ? <Icon valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
        {this.props.item.label}
        {!iconOrderFirst && this.props.item.iconPosition === 'label' ? <Icon valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
      </div>
    );

    let valueComponentProps = {
        key: "val",
        ref: "value",
        measureIndex,
        embeddedItem,
        mainContainerElement,
        valueStyles,
        services,
        kpisRows,
        isShow
    };
    let valueComponent = hideValue ? null : (
        <ValueComponent {...valueComponentProps}>
            {iconOrderFirst && this.props.item.iconPosition === 'value' ? <Icon valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
            {value /*!infographic ? value : null*/}
            {!iconOrderFirst && this.props.item.iconPosition === 'value' ? <Icon valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
        </ValueComponent>
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
