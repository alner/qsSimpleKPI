import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getDivideByValue } from './options';
import ValueComponent from './ValueComponent';

const THRESHOLD = 100;
const ICONS_PER_ROW = 20;

class Icon extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate (nextProps) {
    const hasValueChanged = this.props.value !== nextProps.value;
    const hasIconChanged = this.props.valueIcon !== nextProps.valueIcon;
    const hasIconSizeChanged = this.props.iconSize !== nextProps.iconSize;
    const hasInfographicChanged = this.props.infographic !== nextProps.infographic;
    const hasIsOnValueChanged = this.props.isOnValue !== nextProps.isOnValue;
    const hasColumnNumberChanged = this.props.columnNumber !== nextProps.columnNumber;
    return hasValueChanged || hasIconChanged || hasIconSizeChanged || hasInfographicChanged || hasIsOnValueChanged || hasColumnNumberChanged;
  }
  render() {
    let {
      value,
      valueIcon,
      iconSize,
      infographic,
      isOnValue,
      columnNumber
    } = this.props;
    if(infographic && valueIcon) {
      let icons = [];
      if(!isNaN(value) && isFinite(value)) {
        value = Math.min(THRESHOLD, value);
        for (let i = 1; i <= value; i++) {
          icons.push(
            <div id="icon" ref="infographicIcon" key={`${i}_parent_div`} className={`value--icon--wrapper ${iconSize}${isOnValue ? ` on-value` : ``} infographic`}>
              <i key={i} className={`${valueIcon} ${iconSize}`}></i>
            </div>
          );
        }
      }

      return (
        <div id="wrapper" ref="infographicWrapper" className="infographic-icon-set-wrapper" style={{ gridTemplateColumns : `repeat(${columnNumber} ,1fr)` }}>
          {icons}
        </div>
      );
    }
    else if(valueIcon)
      return (<div className={`value--icon--wrapper ${iconSize}${isOnValue ? ` on-value` : ``}`}><i className={`${valueIcon} ${iconSize}`}></i></div>);
    else
      return (<div style={{ display : 'none' }}> </div>);
  }
}

export default class StatisticItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var self = this;
    setTimeout(function(){self.checkRequiredSize();}, 100);
  }

  getIconsColumnNumber(){
    let iconComponentElement = this.refs.icon;
    let wrapperElement;
    let iconElement;
    if(iconComponentElement){
      iconElement = iconComponentElement.refs.infographicIcon;
    }
    if(this.refs.statisticContainer){
      wrapperElement = this.refs.statisticContainer.parentNode;
    }
    let warpperWidth = 0;
    let iconWidth = 0;

    if (wrapperElement && iconElement){
      warpperWidth= wrapperElement.getBoundingClientRect().width;
      iconWidth= iconElement.getBoundingClientRect().width;
    }
    let iconsColumnNumber = 20;
    if ( iconWidth * iconsColumnNumber <= warpperWidth ){
      iconsColumnNumber = 20;
    }
    else if (iconWidth * iconsColumnNumber > warpperWidth){
      iconsColumnNumber = 10;
    }
    return iconsColumnNumber;
  }
  componentDidUpdate() {
    this.checkRequiredSize();
  }

  checkRequiredSize(){
    if(!this.props.onNeedResize)
      return;

    const { hideValue } = this.props.item;
    if(hideValue)
      return this.props.onNeedResize(false);

    let valueElement = ReactDOM.findDOMNode(this.refs['value']);
    if(valueElement && valueElement.firstChild) {
      let valueChild = valueElement.firstChild;
      let childWidth = $(valueChild).width();
      if(childWidth > valueElement.clientWidth) {
        this.props.onNeedResize(true);
      } else
        this.props.onNeedResize(false);
    }
  }

  render(){
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
     let columnNumber = this.getIconsColumnNumber();

    let labelStyles = { padding: "5px 5px", textAlign: textAlignment };
    let valueStyles = { padding: "5px 5px", textAlign: textAlignment };
    if(labelColor)
      labelStyles.color = labelColor.color;

    if(valueColor)
      valueStyles.color = valueColor.color;

    if(fontStyles.bold)
      valueStyles.fontWeight = 'bold';

    if(fontStyles.italic)
      valueStyles.fontStyle = 'italic';

    if(fontStyles.underline)
      valueStyles.textDecoration = 'underline';

    if(fontStyles.fontSize)
      valueStyles.fontSize = fontStyles.fontSize;

    let classes = `ui ${labelOrientation} ${size} statistic`;
    classes = classes.split(" ").filter(function(item){
      return item.trim().length > 0;
    }).join(" ");
    // <i className={`${valueIcon} ${iconSize}`}></i>
    let iconOrderFirst = iconOrder === "first";
    let labelComponent = hideLabel ? null : (
      <div key="lbl" className="label" style={labelStyles}>
        {iconOrderFirst && this.props.item.iconPosition === 'label' ? <Icon ref="icon" columnNumber={columnNumber} valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
        {this.props.item.label}
        {!iconOrderFirst && this.props.item.iconPosition === 'label' ? <Icon ref="icon" columnNumber={columnNumber} valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} /> : null}
      </div>
    );

    let valueComponentProps = {
      key: "val",
      ref: "value",
      measureIndex,
      embeddedItem,
      mainContainerElement,
      services,
      kpisRows,
      isShow
    };
    const icon = () => {
      return (
        <Icon ref="icon" columnNumber={columnNumber} isOnValue={true} valueIcon={valueIcon} iconSize={iconSize} value={numericValue} infographic={infographic} />
        );
      };

    let valueComponent = hideValue ? null : (
      <ValueComponent {...valueComponentProps}>
        {iconOrderFirst && this.props.item.iconPosition === 'value' ? icon : null}
        <span style={valueStyles}>{value}</span>
        {!iconOrderFirst && this.props.item.iconPosition === 'value' ? icon : null}
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
      statisticStyles.flexBasis = divPercent + '%';
    }
    // *** patch for ios dev ***
    // statistic-${index} - allows to use custom style to each measures element
    let statisticItem = (
      <div ref="statisticContainer" className={`statistic statistic-${index+1}`}
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
