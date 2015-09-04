import {HelloWorldComponent} from './definitionComponents';
console.log(HelloWorldComponent);

// Kpi array
let kpis = {
  	label: "KPIs",
  	type: "array",
  	ref: "kpis",
  	min: 1,
  	allowAdd: true,
  	allowRemove: true,
  	allowMove: true,
  	addTranslation : "Add item",
  	items : {
		label : {
			type : "string",
			ref : "label",
			label : "Label",
			show : true,
			defaultValue: "New expression"
        },
        item: {
        	type: "string",
        	ref: "value",
        	label: "Expression",
        	expression: "always",
        	defaultValue: "1",
        	show: true
        },
        itemColor: {
        	type: "string",
        	ref: "valueColor",
        	label: "Value color",
        	expression: "optional",
        	defaultValue: "blue",
        	show: true
        }        
  	}
};

// Additional options
let options = {
	label: "Options",
	type: "items",
	items: {
      	labelOrientation: {
      		type: "string",
      		component: "buttongroup",
      		label: "Label orientation",
      		ref: "options.labelOrientation",
      		options: [{
      			value: "horizontal",
      			label: "Horizontal",
      			tooltip: "Horizontal"
      		},
      		{
      			value: "",
      			label: "Vertical",
      			tooltip: "Vertical"
      		}],
      		defaultValue: ""
      	},

      	labelOrder: {
      		type: "string",
      		component: "buttongroup",
      		label: "Label order",
      		ref: "options.labelOrder",
      		options: [{
      			value: "first",
      			label: "Label, Value",
      			tooltip: "Label, Value"
      		},
      		{
      			value: "last",
      			label: "Value, Label",
      			tooltip: "Value, Label"
      		}],
      		defaultValue: "first"
      	},      	

		size: {
	  		type: "string",
	  		component: "dropdown",
	  		label: "Size",
	  		ref: "options.size",
	  		options: [{
	  			value: "mini",
	  			label: "Mini",
	  			tooltip: "Mini"
	  		},
	  		{
	  			value: "tiny",
	  			label: "Tiny",
	  			tooltip: "Tiny"
	  		},
	  		{
	  			value: "small",
	  			label: "Small",
	  			tooltip: "Small"
	  		},
	  		{
	  			value: "",
	  			label: "Normal",
	  			tooltip: "Normal"
	  		},
	  		{
	  			value: "large",
	  			label: "Large",
	  			tooltip: "Large"
	  		},
	  		{
	  			value: "huge",
	  			label: "Huge",
	  			tooltip: "Huge"
	  		}		  		
	  		],
	  		defaultValue: ""
  		},

		divideBy: {
	  		type: "string",
	  		component: "dropdown",
	  		label: "KPIs per row",
	  		ref: "options.divideBy",
	  		defaultValue: "",
	  		options: [
	  		{
	  			value: "",
	  			label: "Not set",
	  			tooltip: "Not set"
	  		},
	  		{
	  			value: "auto",
	  			label: "Auto",
	  			tooltip: "Auto"
	  		},	  		
	  		{
	  			value: "one",
	  			label: "1",
	  			tooltip: "One"
	  		},
	  		{
	  			value: "two",
	  			label: "2",
	  			tooltip: "Two"
	  		},
	  		{
	  			value: "three",
	  			label: "3",
	  			tooltip: "Three"
	  		},
	  		{
	  			value: "four",
	  			label: "4",
	  			tooltip: "Four"
	  		},
	  		{
	  			value: "five",
	  			label: "5",
	  			tooltip: "Four"
	  		},
	  		{
	  			value: "six",
	  			label: "6",
	  			tooltip: "Six"
	  		},
	  		{
	  			value: "seven",
	  			label: "7",
	  			tooltip: "Seven"
	  		},
	  		{
	  			value: "eight",
	  			label: "8",
	  			tooltip: "Eight"
	  		},
	  		{
	  			value: "nine",
	  			label: "9",
	  			tooltip: "Nine"
	  		},
	  		{
	  			value: "ten",
	  			label: "10",
	  			tooltip: "Ten"
	  		}
	  		]
	  	},

	  	test: {
			type: "string",
	  		label: "Hello World",
	  		component: HelloWorldComponent,//'HelloWorldComponent',
	  		ref: "options.test",
	  		defaultValue: "",
	  		options: [
	  			{
		  			value: "red",
		  			label: "red",
		  			tooltip: "red"
	  			},	  		
	  			{
		  			value: "orange",
		  			label: "orange",
		  			tooltip: "orange"
	  			},
  				{
		  			value: "yellow",
		  			label: "yellow",
		  			tooltip: "yellow"
	  			},
  				{
		  			value: "olive",
		  			label: "olive",
		  			tooltip: "olive"
	  			},
  				{
		  			value: "green",
		  			label: "green",
		  			tooltip: "green"
	  			},
  				{
		  			value: "teal",
		  			label: "teal",
		  			tooltip: "teal"
	  			},
  				{
		  			value: "blue",
		  			label: "blue",
		  			tooltip: "blue"
	  			},
  				{
		  			value: "violet",
		  			label: "violet",
		  			tooltip: "violet"
	  			},
  				{
		  			value: "purple",
		  			label: "purple",
		  			tooltip: "purple"
	  			},
  				{
		  			value: "pink",
		  			label: "pink",
		  			tooltip: "pink"
	  			},
  				{
		  			value: "brown",
		  			label: "brown",
		  			tooltip: "brown"
	  			},
  				{
		  			value: "grey",
		  			label: "grey",
		  			tooltip: "grey"
	  			},
  				{
		  			value: "black",
		  			label: "black",
		  			tooltip: "black"
	  			}
	  		]
	  	}
	}
};	  	

export default {
	type: "items",
	component: "accordion",
	items: {
	  kpis,
	  options
	}
};