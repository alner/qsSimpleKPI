import {ColorsComponent, ColorsPickerComponent, IconsPickerComponent} from './definitionComponents';
import {ALL_ICONS} from './iconsDefinitions';

let sizeOptions = [{
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
	  		];

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
        	label: "Color",
        	expression: "always",
        	defaultValue: "#808080",
        	show: true
        },
        pickItemColor: {
			type: "string",
	  		component: ColorsPickerComponent,
	  		ref: "valueColor",
	  		defaultValue: "#808080",
	  		options: [
	  			{
		  			value: "#d01919",
		  			label: "red",
		  			tooltip: "red"
	  			},	  		
	  			{
		  			value: "#f2711c",
		  			label: "orange",
		  			tooltip: "orange"
	  			},
  				{
		  			value: "#fbbd08",
		  			label: "yellow",
		  			tooltip: "yellow"
	  			},
  				{
		  			value: "#b5cc18",
		  			label: "olive",
		  			tooltip: "olive"
	  			},
  				{
		  			value: "#21ba45",
		  			label: "green",
		  			tooltip: "green"
	  			},
  				{
		  			value: "#009c95",
		  			label: "teal",
		  			tooltip: "teal"
	  			},
  				{
		  			value: "#2185d0",
		  			label: "blue",
		  			tooltip: "blue"
	  			},
  				{
		  			value: "#6435c9",
		  			label: "violet",
		  			tooltip: "violet"
	  			},
  				{
		  			value: "#a333c8",
		  			label: "purple",
		  			tooltip: "purple"
	  			},
  				{
		  			value: "#e03997",
		  			label: "pink",
		  			tooltip: "pink"
	  			},
  				{
		  			value: "#975b33",
		  			label: "brown",
		  			tooltip: "brown"
	  			},
  				{
		  			value: "#767676",
		  			label: "grey",
		  			tooltip: "grey"
	  			},
  				{
		  			value: "#1b1c1d",
		  			label: "black",
		  			tooltip: "black"
	  			}
	  		]        	
        },
		itemIcon: {
        	type: "string",
        	ref: "valueIcon",
        	label: "Icon",
        	expression: "always",
        	defaultValue: "",
        	show: true
        },
        pickItemIcon: {
			type: "string",
	  		component: IconsPickerComponent,
	  		ref: "valueIcon",
	  		defaultValue: "",
	  		options: ALL_ICONS.map(function(item) {
	  			return {label: item, value: item};
	  		})
	  	},
		iconOrder: {
      		type: "string",
      		component: "buttongroup",
      		label: "Icon order",
      		ref: "iconOrder",
      		options: [{
      			value: "first",
      			label: "Icon, Value",
      			tooltip: "Icon, Value"
      		},
      		{
      			value: "last",
      			label: "Value, Icon",
      			tooltip: "Value, Icon"
      		}],
      		defaultValue: "first",
      		show : function (a) {
              return a.valueIcon;
            }
      	},
		iconSize: {
	  		type: "string",
	  		component: "dropdown",
	  		label: "Icon size",
	  		ref: "iconSize",
			show : function (a) {
              return a.valueIcon;
            },	  		
	  		options: sizeOptions,
	  		defaultValue: ""
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
	  		options: sizeOptions,
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