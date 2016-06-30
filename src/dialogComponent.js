import { getRefValue, setRefValue } from './utils';

export default function DialogComponentFactory(ShowService, dialogOptions) {
  let defaultComponentView = dialogOptions.controlComponent ||
  `
  <button
    class="lui-button qui-button"
    title="Show dialog"
    qva-activate="showDialog()">
    <i class="{{icon}}" style="font-size:18px;"></i>
  </button>
  `;
  return {
    template:
    `<div class="pp-component pp-buttongroup-component">
      <div class="label" ng-if="label" ng-class="{ \'disabled\': readOnly }">
        {{label}}
      </div>
      <div class="value">
        <div class="qv-object-qsstatistic" ng-if="!loading">
        ${defaultComponentView}
        </div>
      </div>
      <div class="pp-loading-container" ng-if="loading">
        <div class="pp-loader qv-loader"></div>
      </div>
      <div ng-if="errorMessage" class="pp-invalid error">{{errorMessage}}</div>
    </div>`,
    controller:
      ["$scope", "$element", function(c, e){
        function init(c, e) {
          c.visible = false;
          c.loading = true;
          c.label = c.definition.label;
          c.value = getRefValue(c.data, c.definition.ref)
            || c.definition.defaultValue;
          c.icon = (typeof(c.definition.icon) == "function" && c.definition.icon(c, e))
            || c.definition.icon || "";

          c.visible = true;

          if(dialogOptions
            && dialogOptions.initContext
            && typeof(dialogOptions.initContext) == 'function') {
              dialogOptions.initContext(c, e);
            }

          c.loading = false;
        }
        init(c, e);

        c.changeValue = function(value) {
          c.value = value;

          if(c.isExpression) {
            let val = getRefValue(c.data, c.definition.ref);
            if(val && val.qStringExpression && val.qStringExpression.qExpr){
              val.qStringExpression.qExpr += c.value;
            } else
              setRefValue(c.data, c.definition.ref, c.value);
          }
          else
            setRefValue(c.data, c.definition.ref, value);

          "function" == typeof c.definition.change && c.definition.change(c.data, c.args.handler);
          setRefValue(c.data, c.definition.ref, value);
          c.$emit("saveProperties");
        };

        c.$on("datachanged", function () {
          init(c, e);
        });

        function show(component, options) {
          var text = options.text,
          icon = void 0 !== options.icon ? options.icon : "cogwheel",
          confirmLabel = options.confirm || "Common.OK",
          width = options.width || "100%",
          height = options.height || "auto",
          input = {
            text : text,
            header : options.header,
            icon : icon,
            confirmLabel : confirmLabel,
            width: width,
            height: height
          };
          return ShowService.show(component, input)
        }

        c.showDialog = function () {
          var component = {
              template : `
              <qv-modal-dialog qv-id="my-confirm-dialog"
                qv-cancel="cancel()"
                qv-confirm="confirm()">
                <header ng-if="header" class="dm-header" q-translation="{{header}}"></header>
                <main class="dm-main">
                  <div class="qv-mvc-dialog-content">
                    <div class="qv-mvc-dialog-icon icon-{{icon}}" ng-show="icon">
                    </div>
                    <p><span q-translation="{{text}}"></span></p>
                  </div>
                  <div style="width:{{width}};height:{{height}}">${dialogOptions.dialogContent || ""}</div>
                </main>
                <qv-confirm-cancel-footer qv-confirm="confirm()" qv-cancel="cancel()" qv-confirm-label="{{confirmLabel || $parent.confirmLabel}}"></qv-confirm-cancel-footer>
              </qv-modal-dialog>`,
              scope : {
                text : "=",
                header : "=",
                icon : "=",
                confirmLabel : "=",
                width: "=",
                height: "="
              },
              controller : ["$scope", function ($scope) {
                  $scope.value = c.value;
                  $scope.select = function(newValue) {
                    if(dialogOptions.selectValue)
                      $scope.value = dialogOptions.selectValue($scope, newValue);
                    else
                      $scope.value = newValue;
                    //setRefValue(c.data, c.definition.ref, value);
                  };
                  $scope.confirm = function () {
                    // setRefValue(c.data, c.definition.ref, $scope.value);
                    // c.$emit("saveProperties");
                    c.changeValue($scope.value);
                    $scope.destroyComponent(),
                    $scope.deferredResult.resolve();
                  };
                  $scope.cancel = function () {
                    $scope.destroyComponent(),
                    $scope.deferredResult.reject()
                  };

                  if(dialogOptions
                    && dialogOptions.initDialogContext
                    && typeof(dialogOptions.initDialogContext) == 'function') {
                      dialogOptions.initDialogContext(c, $scope);
                  }
                }
              ]
            };

          show(component, dialogOptions);
        }
      }]
  }
};
