import React, { Component, PropTypes } from 'react';

class DimensionEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSelectedState: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.hidePointerCursor = this.hidePointerCursor.bind(this);
    this.isSelectedFun = this.isSelectedFun.bind(this);
  }
  // componentDidUpdate() {
  //   this.props.logit();

  hidePointerCursor () {
    const { isInEditMode } = this.props;
    if(!isInEditMode){
      return
    }else{
      return "default"
    }
  }
  // }
  componentDidMount(){
    console.log(this.props.label.text , this.props.isSelected);
    
    console.log("mount");
    
    this.isSelectedFun();
  }
  shouldComponentUpdate(nextProps , nextState){
    if(nextProps == this.props){
      return false
    }
    if (nextState == this.state){
      return true
    }else {
      return false
    }
  }
  componentDidUpdate(){
    console.log("update");
    this.isSelectedFun();
  }
  handleClick () {
    const {
      dimNo,
      dimensionIndex,
      isInEditMode
    } = this.props;
    if (!isInEditMode){
      this.setState({
        isSelected: !this.state.isSelected
      });
      this.props.onToggle(dimNo, dimensionIndex);
      console.log("dimInd" + dimensionIndex);
      this.isSelectedFun();
      // const { isSelected } = this.props;
    
      // const isSelectedClass = false
      // setInterval(function(){
      //   isSelectedClass = isSelected ? ' is-selected' : '';
  
      // },0); 
    }else{
      return
    }
  }
  isSelectedFun () {
    const { isSelected } = this.props;
    if (isSelected == true){
      this.setState({isSelectedState : true});
    }else{
      this.setState({isSelectedState : false});
      
    }
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
    const { isSelectedState } = this.state;
    const { isSelected } = this.props;
    
     const  isSelectedClass = isSelected ? ' is-selected' : '';
   
      // isSelectedClass = isSelectedState ? ' is-selected' : '';


    return (
      <div className={`ui ${showAs}${isSelectedClass}`} style={style}>
        {label.isHidden ? null : <a className={`ui ${label.size} ${label.orientation} ${label.alignment} label`} onClick={this.handleClick} style={{cursor: this.hidePointerCursor()}}>{label.text} </a>}
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
