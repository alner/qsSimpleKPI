import React, { Component, PropTypes } from 'react';

class DimensionEntry extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.hidePointerCursor = this.hidePointerCursor.bind(this);
  }

  hidePointerCursor () {
    const { isInEditMode } = this.props;
    if(!isInEditMode){
      return "pointer";
    }else{
      return "default";
    }
  }
  handleClick () {
    const {
      dimNo,
      dimensionIndex
    } = this.props;
    this.props.onToggle(dimNo, dimensionIndex);
  }
  render () {
    const {
      children,
      showAs,
      style,
      label,
      divideBy
    } = this.props;
    const { isSelected } = this.props;
    const isSelectedClass = isSelected ? ' is-selected' : '';

    return (
      <div className={`ui ${showAs}${isSelectedClass}`} style={style}>
        {label.isHidden
          ? null
          : (
            <a
              className={`ui ${label.size} ${label.orientation} ${label.alignment} label`}
              onClick={this.handleClick}
              style={{ cursor: this.hidePointerCursor() }}
            >{label.text}</a>
          )
        }
        <div className={`ui ${divideBy} ${label.alignment} statistics`}>
          {children}
        </div>
      </div>
    );
  }
}

DimensionEntry.propTypes = {
  children: PropTypes.node.isRequired,
  dimensionIndex: PropTypes.number,
  dimNo: PropTypes.number,
  dindex: PropTypes.any,
  divideBy: PropTypes.any,
  divideByNumber: PropTypes.any,
  isInEditMode: PropTypes.bool,
  isSelected: PropTypes.bool,
  label: PropTypes.shape({
    isHidden: PropTypes.bool,
    orientation: PropTypes.string,
    alignment: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func,
  showAs: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default DimensionEntry;
