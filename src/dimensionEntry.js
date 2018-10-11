import React, { Component, PropTypes } from 'react';

class DimensionEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSelected: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    const {
      dimNo,
      dimensionIndex
    } = this.props;

    this.setState({
      isSelected: !this.state.isSelected
    });
    this.props.onToggle(dimNo, dimensionIndex);
  }

  render () {
    const {
      children,
      showAs,
      style,
      label,
      divideBy,
      dindex,
      divideByNumber
    } = this.props;
    const { isSelected } = this.state;

    const isSelectedClass = isSelected ? ' is-selected' : '';

    return (
      <div className={`ui ${showAs}${isSelectedClass}`} style={style}>
        {label.isHidden ? null : <a className={`ui ${label.size} ${label.orientation} ${label.alignment} label`} onClick={this.handleClick}>{label.text}</a>}
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
  label: PropTypes.shape({
    isHidden: PropTypes.bool,
    orientation: PropTypes.string,
    alignment: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  showAs: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default DimensionEntry;
