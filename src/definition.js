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
      	labelOrientation: {
      		type: "string",
      		component: "buttongroup",
      		label: "Label orientation",
      		ref: "labelOrientation",
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
        item: {
        	type: "string",
        	ref: "value",
        	label: "Expression",
        	expression: "always",
        	show: true
        }
  	}
};

// Additional options
let options = {
	label: "Options",
	items: {
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