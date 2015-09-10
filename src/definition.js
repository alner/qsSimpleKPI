import {ColorsPickerComponent, IconsPickerComponent} from './definitionComponents';
import {ALL_ICONS} from './iconsDefinitions';

const COLOR_OPTIONS = [
					// Qlik colors
					{
						value: "#B0AFAE",
						label: "",
						tooltip: ""
					},
					{
						value: "#7B7A78",
						label: "",
						tooltip: ""
					},
					{
						value: "#545352",
						label: "",
						tooltip: ""
					},
					{
						value: "#4477AA",
						label: "",
						tooltip: ""
					},
					{
						value: "#7DB8DA",
						label: "",
						tooltip: ""
					},
					{
						value: "#B6D7EA",
						label: "",
						tooltip: ""
					},
					{
						value: "#46C646",
						label: "",
						tooltip: ""
					},
					{
						value: "#F93F17",
						label: "",
						tooltip: ""
					},
					{
						value: "#FFCF02",
						label: "",
						tooltip: ""
					},
					{
						value: "#276E27",
						label: "",
						tooltip: ""
					},
					{
						value: "#FFFFFF",
						label: "white",
						tooltip: "white"
					},
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
		  		];

const SIZE_OPTIONS = [
			{
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
  	//type: "array",
  	//component: "expandable-items",
  	uses : "measures",
  	ref: "qHyperCubeDef.qMeasures",
  	disabledRef : "qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures",
  	min: 1,
  	max: 256,
  	allowAdd: true,
  	allowRemove: true,
  	allowMove: true,
  	items : {
  			uses: "items",
			itemColor: {
	        	type: "string",
	        	ref: "qDef.valueColor",
	        	label: "Color",
	        	expression: "always",
	        	defaultValue: "#808080",
	        	show: true
			},
	        pickItemColor: {
				type: "string",
		  		component: ColorsPickerComponent,
		  		ref: "qDef.valueColor",
		  		defaultValue: "#808080",
		  		options: COLOR_OPTIONS        	
	        },
			itemIcon: {
	        	type: "string",
	        	ref: "qDef.valueIcon",
	        	label: "Icon",
	        	expression: "always",
	        	defaultValue: "",
	        	show: true
	        },
	        pickItemIcon: {
				type: "string",
		  		component: IconsPickerComponent,
		  		ref: "qDef.valueIcon",
		  		defaultValue: "",
		  		options: ALL_ICONS.map(function(item) {
		  			return {label: item, value: item};
		  		})
		  	},
			iconOrder: {
	      		type: "string",
	      		component: "buttongroup",
	      		label: "Icon order",
	      		ref: "qDef.iconOrder",
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
	              return a.qDef.valueIcon;
	            }
	      	},
			iconSize: {
		  		type: "string",
		  		component: "dropdown",
		  		label: "Icon size",
		  		ref: "qDef.iconSize",
				show : function (a) {
	              return a.qDef.valueIcon;
	            },	  		
		  		options: SIZE_OPTIONS,
		  		defaultValue: ""
	  		}
  	}
};

// Additional settings
let settings = {
	uses: "settings",
	items: {
		additionalOptions: {
			type: "items",
			label: "Options",
			translation: "properties.presentation",
			items: {
		      	labelOrientation: {
		      		type: "string",
		      		component: "buttongroup",
		      		label: "Labels orientation",
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
		      		label: "Labels order",
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
			  		options: SIZE_OPTIONS,
			  		defaultValue: ""
		  		},

				divideBy: {
			  		type: "string",
			  		component: "dropdown",
			  		label: "KPIs per row",
			  		ref: "options.divideBy",
			  		defaultValue: "auto",
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
		}
	}
};

export default {
	type: "items",
	component: "accordion",
	items: {
	  kpis,
	  settings
	}
};