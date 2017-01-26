import { getRefValue, setRefValue } from './utils';
import DialogComponentFactory from './dialogComponent';

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
                <a title="{{colorExpression}}" class="ui statistic tag label" qva-activate="showPallete()" style="color: #00; overflow: visible; background-color: {{t.value}};">
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
        } else
        if(typeof val === "string") {
          let isValidColor = /([#A-Fa-f0-9]{7}|[#A-Fa-f0-9]{4})/;
          let colorMatch = isValidColor.exec(val);
          if(colorMatch) val = colorMatch[0];
        }

        c.t = {
          value: val || "..."
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

/*
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
        if(!c.isExpression && typeof c.value === 'string')  {
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
        if(!c.isExpression && typeof c.value === 'string')  {
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
*/

let FontStylesComponent = {
  template:
    `<div class="pp-component pp-buttongroup-component qv-object-qsstatistic" ng-if="visible">
      <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
        {{label}}
      </div>
      <div class="lui-buttongroup qui-buttongroup" ng-if="!loading && !isExpression">
        <button
          class="lui-button qui-button"
          ng-class="{'lui-active qui-active':states.bold}"
          ng-disabled="readOnly"
          qva-activate="select('bold')"
          q-title-translation="Bold">
          <i class="icon bold" style="font-color: white; font-size:18px;"></i>
        </button>
        <button
          class="lui-button qui-button"
          ng-class="{'lui-active qui-active':states.italic}"
          ng-disabled="readOnly"
          qva-activate="select('italic')"
          q-title-translation="Italic">
          <i class="icon italic" style="font-color: white; font-size:18px;"></i>
        </button>
        <button
          class="lui-button qui-button"
          ng-class="{'lui-active qui-active':states.underline}"
          ng-disabled="readOnly"
          qva-activate="select('underline')"
          q-title-translation="Underline">
          <i class="icon underline" style="font-color: white; font-size:18px;"></i>
        </button>
      </div>

      <div class="pp-loading-container" ng-if="loading">
        <div class="pp-loader qv-loader"></div>
      </div>

      <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
    </div>`
  ,
  controller:
    ["$scope", function(c){
      function initOptions() {
        c.loading = true;
        c.errorMessage = "";
        c.label = c.definition.label;
        c.isExpression = false;
        let value = getRefValue(c.data, c.definition.ref);
        c.states = {};
        if(value) {
          if(typeof value === "object"
          && value.qStringExpression) {
            c.isExpression = true;
            value = (value.qStringExpression.qExpr) || "";
          }

          let values = value.split(',');
          values.forEach(function(value){
            c.states[value] = value;
          });
        }
        c.visible = true;
        c.loading = false;
      }

      c.select = function (a) {
        if(c.states[a])
          delete c.states[a];
        else
          c.states[a] = a;

        let value = Object.keys(c.states).join(',');

        if(c.isExpression) {
          let valueRef = getRefValue(c.data, c.definition.ref);
          if(valueRef && valueRef.qStringExpression && valueRef.qStringExpression.qExpr){
            valueRef.qStringExpression.qExpr += value;
          } else
            setRefValue(c.data, c.definition.ref, value);
        }
        else
          setRefValue(c.data, c.definition.ref, value);

        "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
        c.$emit("saveProperties");
      };

      c.$on("datachanged", function () {
        initOptions();
      });

      initOptions();
    }]
};

let TextEditorComponent = {
  template:
  `
  <div class="pp-component" ng-if="visible">
        <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
          {{label}}
        </div>
        <div class="value">
          <div class="qv-object-qsstatistic" ng-if="!loading">
            <textarea rows="5" ng-model="t.value" ng-change="onTextChange()" style="width: 100%; max-width: 100%;">
            </textarea>
          </div>
        </div>
        <div class="pp-loading-container" ng-if="loading">
          <div class="pp-loader qv-loader"></div>
        </div>
        <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
  </div>
  `,
  controller:
    ["$scope", function(c){
      function initOptions() {
        c.loading = true;
        c.errorMessage = "";
        c.label = c.definition.label;
        c.t = {
          value: getRefValue(c.data, c.definition.ref)
        };
        c.visible = true;
        c.loading = false;
      }

      c.onTextChange = function() {
        setRefValue(c.data, c.definition.ref, c.t.value);
        "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
        c.$emit("saveProperties");
      };

      c.$on("datachanged", function () {
        initOptions();
      });

      initOptions();
    }]
};

// Select icon dialog component
let SelectIconDialogComponent = function(ShowService) {
return DialogComponentFactory(ShowService, (() => {

  function getValueIndex(c, styleName) {
    let indx = -1;
    if(!c.isExpression && typeof c.value === 'string')  {
      // let styles = (c.value && c.value.split(' ')) || [];
      indx = c.value.search(new RegExp(`\\s${styleName}`));
    }
    return indx;
  }

  //let docWidth = $(document).width();
  let docHeight = $(document).height();
  let dWidth = '85%'; // dialog width
  let dHeight = 'auto'; // dialog height

  return {
    text: 'Icons',
    icon: '', // dialog icon
    initContext(c, e) { // component's context initialization
      c.isExpression = false;
      c.isNotSet = false;
      if(typeof c.value === "object"
        && c.value.qStringExpression) {
        c.isExpression = true;
        c.iconExpression = (c.value.qStringExpression.qExpr) || "";
      } else if(typeof c.value === "string" && c.value.trim().length === 0) {
        c.isNotSet = true;
        c.iconExpression = 'Select icon';
        c.value = "ellipsis horizontal icon";
      }
    },
    controlComponent: `
    <button
      class="lui-button qui-button"
      title="{{iconExpression}}"
      qva-activate="showDialog()"
      ng-disabled="readOnly">
      <i class="{{value}}" ng-if="!isExpression" style="font-size:18px;"></i>
      <i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>
    </button>
    <span ng-if="!isExpression && !isNotSet">{{value}}</span>
    <span ng-if="isNotSet">{{iconExpression}}</span>
    `,
    initDialogContext(c, dc) {
      // c - component context (see initContext),
      // dc - dialog context (see dialogContent)
      dc.iconOptions = {
        disabled: 'Disabled',
        loading: 'Loading',
        //circular: 'Circular',
        //bordered: 'Bordered',
        ['horizontally flipped']: 'Horizontally flipped',
        ['vertically flipped']: 'Vertically flipped',
        ['clockwise rotated']: 'Clockwise rotated',
        ['counterclockwise rotated']: 'Counterclockwise rotated'
      };
      dc.opts = {};
      for(let iconOption in dc.iconOptions) {
        dc.opts[iconOption] = (getValueIndex(c, iconOption) != -1);
      }

      dc.isExpression = c.isExpression;
      // Icons as options property:
      dc.options = c.definition.options;
    },
    selectValue(c, newValue) {
      c.isExpression = false;
      if(c.iconOptions[newValue]) {
        //let values = (c.value && c.value.split(' ')) || [];
        let values = c.value || "";
        let isDisabled = c.opts[newValue];
        let searchRe = new RegExp(`\\s${newValue}`);
        let indx = values.search(searchRe);
        if(isDisabled && indx === -1) {
          // add
          //values.push(newValue);
          values = values.concat(' ', newValue);
          c.opts[newValue] = true;
        }
        else if(!isDisabled && (indx != -1)) {
          // remove
          // values.splice(indx, 1);
          values = values.replace(searchRe, '');
          c.opts[newValue] = false;
        }
        return values;
      } else {
        let returnValue = newValue;
        for(let iconOption in c.iconOptions) {
          if(c.opts[iconOption])
            returnValue += ` ${iconOption}`;
        }
        return returnValue;
      }
    },
    dialogContent: `
    <div class="qv-object-qsstatistic">
      <style scoped>
        #my-confirm-dialog {
          width: ${dWidth};
          height: ${dHeight};
        }
      </style>
      <div style="height: auto; font-size:3em;">
        <i class="{{value}}" ng-if="!isExpression"></i><span ng-if="!isExpression" style="font-size:0.5em;">{{value}}</span>
        <i class="icon-expression" ng-if="isExpression" style="font-size:18px;"></i>
      </div>
      <div style="overflow:auto; -webkit-overflow-scrolling:touch; height:${docHeight / 2}px; border: solid 1px #f2f2f2;border-radius:5px;padding:5px">
      <div ng-repeat="(category, icons) in options">
        <h1 style="margin-top:1em;">{{category}}</h1>
        <button ng-repeat="icon in icons track by $index"
          class="ui tiny icon button"
          title="{{icon}}"
          ng-disabled="readOnly"
          qva-activate="select(icon)"
          style="width: 40px; height: 40px; padding: 1px; margin: 2px;">
          <div><i class="{{icon}}" style="margin: 0; font-size: 1.3em"></i></div>
        </button>
      </div>
      </div>
      <div style="margin-top: 10px;">
        <span ng-repeat-start="(iconOption, iconOptLabel) in iconOptions track by iconOption" />
        <label
          class="lui-checkbox qui-checkboxicon"
          style="display: inline-block"
          title="{{iconOptLabel}}"
          ng-class="{ \'lui-hovered qui-hover\': hover }"
          ng-mouseenter="hover = true"
          ng-mouseleave="hover = false">
          <input type="checkbox"
            class="lui-checkbox__input"
            ng-model="opts[iconOption]"
            ng-change="select(iconOption)">
          <div class="lui-checkbox__check-wrap check-wrap">
            <span class="lui-checkbox__check check"></span>
            <span class="lui-checkbox__check-text check-text" style="max-width: 200px">{{iconOptLabel}}</span>
          </div>
        </label>
        <span ng-repeat-end>&nbsp;</span>
      </div>
    </div>
    `,
    // width: '100%' //`${docWidth - docWidth / 8}px`
  }
})());
}; // SelectIconDialogComponent

// Detect changes in property "propertyName" and propagate it to referenced property... 
let DetectChangesInComponent = function(propertyName) {
  return {    
        template: '<span></span>', // Non visible component 
        controller: ["$scope", function(scope) {  
          scope.$watch(`data.${propertyName}`, function(newValue) {
            scope.data[scope.definition.ref] = newValue; 
            scope.$emit("saveProperties");
          });
        }]
      };
};

/*
let ExpressionEditorComponent = {
  template:
  `
<div class="pp-component" ng-if="visible">
  <div class="lui-input-group">
      <input class="lui-input-group__item  lui-input-group__input  lui-input"/>
      <button class="lui-input-group__item  lui-input-group__button  lui-button">
          <span class="lui-button__icon  lui-icon  lui-icon--expression"></span>
      </button>
      <button class="lui-input-group__item  lui-input-group__button  lui-button">
          <span class="lui-button__icon  lui-icon  lui-icon--expression"></span>
      </button>
  </div>
</div>

  `,
  controller:
    ["$scope", function(c){
      function initOptions() {
        c.loading = true;
        c.errorMessage = "";
        c.label = c.definition.label;
        c.value = getRefValue(c.data, c.definition.ref)
        c.visible = true;
        c.loading = false;
      }

      c.onTextChange = function() {
        setRefValue(c.data, c.definition.ref, c.value);
        "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
        c.$emit("saveProperties");
      };

      c.$on("datachanged", function () {
        initOptions();
      });

      initOptions();
    }]
};
*/

export default {
  ColorsPickerComponent,
  FontStylesComponent,
  TextEditorComponent,
  SelectIconDialogComponent,
//  ExpressionEditorComponent,
  DetectChangesInComponent
}
