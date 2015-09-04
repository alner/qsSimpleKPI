function _getRefs(data, refName) {
	let ref = data;
	let name = refName;
	let props = refName.split('.');
	if(props.length > 0) {
		for(let i = 0; i < props.length - 1; ++i) {
			if(ref[props[i]])
				ref = ref[props[i]];
		}
		name = props[props.length - 1];
	}
	return {ref, name};
}

function setRefValue(data, refName, value) {
	let {ref, name} = _getRefs(data, refName);
	ref[name] = value;
}

function getRefValue(data, refName) {
	let {ref, name} = _getRefs(data, refName);
	return ref[name];
}

/*{{option.label}}*/

let HelloWorldComponent = {
	template:
		`<div class="pp-component pp-buttongroup-component" ng-if="visible" tcl="buttongroup">
			<div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
				{{label}}
			</div>
			<div class="value">	
				<div class="qv-object-qsstatistic" ng-if="!loading">
						<button ng-repeat="option in options track by option.value" 
							class="ui mini icon {{option.value}} button"
							ng-disabled="readOnly"
							style="margin: 2px;" 
							ng-class="{ \'basic\': option.value == value}"
							qva-activate="select(option.value)" tid="{{option.value}}" data-icon="{{definition.icon}}"
							q-title-translation="{{option.tooltip || option.label}}">
							<i class="check circle icon" ng-if="option.value == value"></i>
							<i class="icon" ng-if="option.value != value"></i>
						</button>
				</div>
				<div class="pp-loading-container" ng-if="loading">
					<div class="pp-loader qv-loader"></div>
				</div>
				<div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
			</div>
		</div>`
	,	
	controller: 
		["$scope", function(c){
			console.log('c.definition and c.data');
				console.log(c.definition);
				console.log(c.data);

			function initOptions() {
				c.loading = true;
				c.errorMessage = "";
				c.label = c.definition.label;
				c.options = c.definition.options;
				c.value = getRefValue(c.data, c.definition.ref);
				c.visible = true;
				c.loading = false;
			}
			initOptions();

			// see template
			c.select = function (a) {
				console.log(a);
				c.value = a;
				setRefValue(c.data, c.definition.ref, a);
				"function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
				c.$emit("saveProperties");
			};

			c.$on("datachanged", function () {
				initOptions;
			});
		}]
};


export default {
	HelloWorldComponent
}
