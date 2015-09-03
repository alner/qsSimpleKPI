import React from 'react';

class Statistic extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let size = this.props.options.size || "";
		let labelOrientation = this.props.options.labelOrientation || "";
		let labelOrderFirst = this.props.options.labelOrder === "first";
		let classes = `ui ${labelOrientation} ${size} orange statistic`;		

		let labelComponent = (
			<div className="label">
		      {this.props.item.label}
		    </div>
		);

		let valueComponent = (
		    <div className="value">
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

		return (
			<div className="qv-object-qsstatistic">
			{kpis}
			</div>
		);
	}
}

export default StatisticBlock;