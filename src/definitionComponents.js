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

/*
let ColorsComponent = {
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
							qva-activate="select(option.value)" tid="{{option.value}}" data-icon="{{definition.icon}}"
							q-title-translation="{{option.tooltip || option.label}}">
							<i class="checkmark icon" style="font-size:18px;" ng-if="option.value == value"></i>
							<i class="icon" style="font-color: white; font-size:18px;" ng-if="option.value != value"></i>
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
*/

let ColorsPickerComponent = {
	template:
		`
		<div class="pp-component" ng-if="visible">
					<div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
						{{label}}
					</div>
					<div class="value">
						<div class="qv-object-qsstatistic" ng-if="!loading">
							<div class="ui mini right labeled">
								<input type="color" ng-model="t.value" ng-change="onColorChange()">
								<a title="{{colorExpression}}" class="ui tag label" qva-activate="showPallete()" style="color: #00; background-color: {{t.value}};">
									<span ng-if="!isColorExpression" style="color: #ffffff; font-size: 16px;">{{t.value}}</span>
									<i class="icon-expression" ng-if="isColorExpression" style="font-size: 16px;"></i>
								</a>
							</div>
							<div ng-if="showColorPallete">
								<button ng-repeat="option in options track by option.value" 
									class="ui mini icon button"
									ng-disabled="readOnly"
									style="margin: 1px; background-color: {{option.value}};" 
									qva-activate="onColorChange(option.value)" tid="{{option.value}}" data-icon="{{definition.icon}}"
									q-title-translation="{{option.tooltip || option.label}}">
									<i class="checkmark icon" style="color: #ffffff; font-size:17px;" ng-if="option.value == t.value"></i>
									<i class="icon" style="font-size:17px;" ng-if="option.value != t.value"></i>
								</button>
							</div>
						</div>
						<div class="pp-loading-container" ng-if="loading">
							<div class="pp-loader qv-loader"></div>
						</div>
						<div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
					</div>
		</div>
		`
	,
	controller: 
		["$scope", "$element", function(c, e){
			console.log('c.definition and c.data');
				console.log(e);
				console.log(c.definition);
				console.log(c.data);

			function initOptions() {
				c.loading = true;
				c.errorMessage = "";
				c.label = c.definition.label;
				c.options = c.definition.options;
				c.isColorExpression = false;
				c.colorExpression = '';

				let val = getRefValue(c.data, c.definition.ref);
				if(typeof val === "object") {
					c.isColorExpression = true;
					c.colorExpression = (val && val.qStringExpression && val.qStringExpression.qExpr) || "";
					val = c.definition.defaultValue;					
				}

				c.t = {	
					value: val
				};

				c.visible = true;
				c.showColorPallete = false;
				c.loading = false;
			}
			initOptions();
			c.onColorChange = function(color) {				
				if(color) {
					c.t.value = color;
				}

				if(c.isColorExpression) {
					let val = getRefValue(c.data, c.definition.ref);
					if(val && val.qStringExpression && val.qStringExpression.qExpr){
						val.qStringExpression.qExpr += c.t.value;
					} else
						setRefValue(c.data, c.definition.ref, c.t.value);
				}
				else
					setRefValue(c.data, c.definition.ref, c.t.value);

				"function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
				c.$emit("saveProperties");
				c.showColorPallete = false;
			};
			c.showPallete = function() {
				c.showColorPallete = !c.showColorPallete;
			};
			c.$on("datachanged", function () {
				initOptions();
				//console.log('changed!');
			});
		}]
};

let IconsPickerComponent = {
	template:
		`<div class="pp-component pp-buttongroup-component" ng-if="visible">
			<div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
				{{label}}
			</div>
			<div class="value">
				<div class="qv-object-qsstatistic" ng-if="!loading">
					<button 
						class="qui-button"
						title="{{iconExpression}}"
						ng-class="{'qui-active': isShowIcons}"
						qva-activate="showHideIcons()"
						ng-disabled="readOnly">
						<i class="{{value}}" ng-if="!isExpression" style="font-size:18px;"></i>
						<i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>
					</button>
					<span ng-if="!isExpression">{{value}}</span>
					<div style="margin-top: 5px;">
						<label class="qui-checkboxicon"
							title="Disabled icon style"
							ng-class="{ \'qui-hover\': hover }" 
							ng-mouseenter="hover = true" 
							ng-mouseleave="hover = false">
							<input type="checkbox" 
								ng-model="opts.disabled"
								ng-change="checkIconStyles('disabled')">
							<div class="check-wrap">
								<span class="check"></span>
								<span class="check-text">Disabled</span>
							</div>
						</label>

						<label class="qui-checkboxicon"
							title="Loading icon style"
							ng-class="{ \'qui-hover\': hover }" 
							ng-mouseenter="hover = true" 
							ng-mouseleave="hover = false">
							<input type="checkbox" 
								ng-model="opts.loading"
								ng-change="checkIconStyles('loading')">
							<div class="check-wrap">
								<span class="check"></span>
								<span class="check-text">Loading</span>
							</div>
						</label>						
					</div>

					<div ng-if="isShowIcons">
						<button ng-repeat="option in options track by option.value"
							class="ui tiny icon button"
							ng-disabled="readOnly"
							style="margin: 2px;"
							qva-activate="select(option.value)">
							<div><i class="{{option.value}}"></i></div>
						</button>
					</div>
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

			function initOptions() {
				c.loading = true;
				c.errorMessage = "";
				c.isShowIcons = false;
				c.isExpression = false;
				c.iconExpression = "";
				c.label = c.definition.label;
				c.options = c.definition.options;
				c.value = getRefValue(c.data, c.definition.ref);
				if(typeof c.value === "object"
					&& c.value.qStringExpression) {
					c.isExpression = true;
					c.iconExpression = (c.value.qStringExpression.qExpr) || "";					
				}
				c.opts = {};
				c.opts.disabled = (c.getValueIndex('disabled') != -1);
				c.opts.loading = (c.getValueIndex('loading') != -1);
				c.visible = true;
				c.loading = false;
			}			

			c.getValueIndex = function(styleName){
				let indx = -1;
				if(!c.isExpression && typeof c.value === 'string')	{
					let styles = (c.value && c.value.split(' ')) || [];
					indx = styles.indexOf(styleName);
				}
				return indx;
			};

			// see template
			c.select = function (a) {
				c.value = a;

				if(c.isExpression) {
					let val = getRefValue(c.data, c.definition.ref);
					if(val && val.qStringExpression && val.qStringExpression.qExpr){
						val.qStringExpression.qExpr += c.value;
					} else
						setRefValue(c.data, c.definition.ref, c.value);
				}
				else
					setRefValue(c.data, c.definition.ref, a);

				"function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
				c.$emit("saveProperties");
			};

			c.checkIconStyles = function (styleName) {
				if(!c.isExpression && typeof c.value === 'string')	{
					let isDisabled = c.opts[styleName];
					let styles = (c.value && c.value.split(' ')) || [];
					let indx = styles.indexOf(styleName);
					if(isDisabled && indx === -1)
						styles.push(styleName);
					else if(!isDisabled && (indx != -1))
						styles.splice(indx, 1);

					let value = styles.join(' ');
					c.select(value);
				}
			};

			c.showHideIcons = function(){
				c.isShowIcons = !c.isShowIcons;
			};

			c.$on("datachanged", function () {
				initOptions();
			});			

			initOptions();			
		}]
};


export default {
	ColorsComponent,
	ColorsPickerComponent,
	IconsPickerComponent	
}
