import React from 'react';

const DIVIDE_BY = [
	'', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

class Statistic extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		let size = this.props.options.size || "";
		let labelOrientation = this.props.options.labelOrientation || "";
		let labelOrderFirst = this.props.options.labelOrder === "first";
		let valueColor = this.props.item.valueColor || "";
		let valueIcon = this.props.item.valueIcon || "";
		let valueStyles = {};

		let classes = `ui ${labelOrientation} ${size} statistic`;

		valueStyles.color = valueColor;

		classes = classes.split(" ").filter(function(item){
			return item.trim().length > 0;
		}).join(" ");

		let labelComponent = (
			<div className="label">
		      {this.props.item.label}
		    </div>
		);

		let valueComponent = (
		    <div className="value" style={valueStyles}>
		      <i className={valueIcon} style={{fontSize: '100%'}}></i>
		      {this.props.item.value}
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

		// <div className="ui segment">
		return (
			<div className={classes}>
			    {content}
		  	</div>
		);
	}
}

class StatisticBlock extends React.Component {
	render(){
		let options = this.props.options;
		let size = options.size || "";
		let kpis = this.props.kpis.map(function(item){
			return <Statistic key={item.cId} item={item} options={options} />
		});

		/*<div className="ui segments">*/
		let divideBy = options.divideBy;
		if(divideBy === "auto")
			divideBy = DIVIDE_BY[Math.min(10, kpis.length)];

		return (
			<div className="qv-object-qsstatistic">
				<div className={`ui ${divideBy} ${size} statistics`}>
				{kpis}
				</div>
			</div>
		);
	}
}

export default StatisticBlock;