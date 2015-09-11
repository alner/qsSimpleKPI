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
		let valueColor = this.props.item.valueColor || "";
		let valueIcon = this.props.item.valueIcon || "";
		let iconOrderFirst = this.props.item.iconOrder === "first";
		let iconSize = this.props.item.iconSize;

		if(iconSize)
			valueIcon += ` ${iconSize}`;

		let valueStyles = {};

		let classes = `ui ${labelOrientation} ${size} statistic`;

		valueStyles.color = valueColor;

		classes = classes.split(" ").filter(function(item){
			return item.trim().length > 0;
		}).join(" ");

		let labelComponent = (
			<div key="lbl" className="label">
		      {this.props.item.label}
		    </div>
		);

		let valueComponent;
		if(iconOrderFirst) {
			valueComponent = (
		    	<div key="val" className="value" style={valueStyles}>				
				  <i className={valueIcon}></i>
				  {this.props.item.value}
				</div>
			);
		} else {
			valueComponent = (
		    	<div key="val" className="value" style={valueStyles}>
				  {this.props.item.value}
				  <i className={valueIcon}></i>
				</div>
			);
		}

		let content = [];
		if(labelOrderFirst) {
			content.push(labelComponent);
			content.push(valueComponent);
		} else {
			content.push(valueComponent);			
			content.push(labelComponent);
		}

		// <div className="ui segment">
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
		};
	}

	componentDidMount(){
		this.checkRequiredSize();
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
			labelOrientation: labelOrientation,
			clientWidth: elementClientWidth, 
			clientHeight: elementClientHeight
		});
	}

	checkRequiredSize(){
		if(this.props.options.autoSize) {
			let size = this.state.size;
			let labelOrientation = this.state.labelOrientation;
			let elementClientWidth = this.props.element.clientWidth;
			let elementClientHeight = this.props.element.clientHeight;			
			let clientWidth = this.state.clientWidth;
			let clientHeight = this.state.clientHeight;
			let element = this.props.element;
			let scrollHeight = element.scrollHeight * 0.8;
			let childHeight = 0;

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
						// set horizontal label (responsive design)
						this.setState({
							labelOrientation: 'horizontal',
							size: SIZE_OPTIONS[0].value,
							clientWidth: elementClientWidth, 
							clientHeight: elementClientHeight
						});						
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
				|| this.state.size != this.props.options.size) {
					this.restoreSize();
				}
		}
	}

	render(){
		let options = this.props.options;
		let size = this.state.size; // || options.size || "";
		let labelOrientation = this.state.labelOrientation;
		let kpis = this.props.kpis;
		let items;
		// this.props.kpis.qMeasureInfo.length > 0
		// kpis.qDataPage.length > 0 && kpis.qDataPage[0].qMatrix.length > 0 && kpis.qDataPage[0].qMatrix[0]
		if(kpis.qMeasureInfo.length > 0 && kpis.qDataPages.length > 0) {
			let data = kpis.qDataPages[0].qMatrix.length > 0 && kpis.qDataPages[0].qMatrix[0];
			items = kpis.qMeasureInfo.map(function(item, index){
				let params = {
					label: item.qFallbackTitle,
					valueColor: item.valueColor,
					valueIcon: item.valueIcon,
					iconOrder: item.iconOrder,
					iconSize: item.iconSize,
					size: size,
					labelOrientation: labelOrientation
				};

				if(index < data.length)
					params.value = data[index].qText;
				else 
					params.value = '';

				return <StatisticItem ref={"child-" + index} key={item.cId} item={params} options={options} />				
			});
		}

		let divideBy = options.divideBy;
		if(divideBy === "auto")
			divideBy = DIVIDE_BY[Math.min(10, items.length)];

		return (
			<div className="qv-object-qsstatistic">
				<div ref="statistics" className={`ui ${divideBy} ${size} statistics`}>
				{items}
				</div>
			</div>
		);
	}
}

export default StatisticBlock;