import React from 'react';

const DIVIDE_BY = [
	'', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

class StatisticItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		let size = this.props.options.size || "";
		let labelOrientation = this.props.options.labelOrientation || "";
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
	render(){
		let options = this.props.options;
		let size = options.size || "";
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
					iconSize: item.iconSize
				};

				if(index < data.length)
					params.value = data[index].qText;
				else 
					params.value = '';

				return <StatisticItem key={item.cId} item={params} options={options} />				
			});
		}

		let divideBy = options.divideBy;
		if(divideBy === "auto")
			divideBy = DIVIDE_BY[Math.min(10, items.length)];

		return (
			<div className="qv-object-qsstatistic">
				<div className={`ui ${divideBy} ${size} statistics`}>
				{items}
				</div>
			</div>
		);
	}
}

export default StatisticBlock;