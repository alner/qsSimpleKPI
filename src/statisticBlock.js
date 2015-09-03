import React from 'react';

class Statistic extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let size = this.props.options.size || "";
		let labelOrientation = this.props.item.labelOrientation || "";
		let classes = `ui ${labelOrientation} ${size} orange statistic`;
		return (
			<div className={classes}>
			    <div className="label">
			      {this.props.item.label}
			    </div>	  
			    <div className="value">
			      {this.props.item.value}
			    </div>
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