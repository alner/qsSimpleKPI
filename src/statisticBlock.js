import React from 'react';

const DIVIDE_BY = [
	'', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

const COLORS = {
	red: 'red',
	orange: 'orange',
	yellow: 'yellow',
	olive: 'olive',
	green: 'green',
	teal: 'teal',
	blue: 'blue',
	violet: 'violet',
	purple: 'purple',
	pink: 'pink',
	brown: 'brown',
	grey: 'grey',
	black: 'black'
};

class Statistic extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let size = this.props.options.size || "";
		let labelOrientation = this.props.options.labelOrientation || "";
		let labelOrderFirst = this.props.options.labelOrder === "first";
		let valueColor = this.props.item.valueColor || "";
		let valueStyles = {};

		let classes = `ui ${labelOrientation} ${size} statistic`;

		if(COLORS[valueColor]) {
			classes = classes.concat(` ${valueColor}`);
		}
		else {
			valueStyles.color = valueColor;			
		}

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
		let kpis = this.props.kpis.map(function(item){
			return <Statistic key={item.cId} item={item} options={options} />
		});

		/*<div className="ui segments">*/
		let divideBy = options.divideBy;
		if(divideBy === "auto")
			divideBy = DIVIDE_BY[Math.min(10, kpis.length)];

		return (
			<div className="qv-object-qsstatistic">
				<div className={`ui ${divideBy} statistics`}>
				{kpis}
				</div>
			</div>
		);
	}
}

export default StatisticBlock;