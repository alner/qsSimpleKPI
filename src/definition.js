import {
  ColorsPickerComponent,
  FontStylesComponent,
  TextEditorComponent,
  SelectIconDialogComponent,
  DetectChangesInComponent
//  ExpressionEditorComponent
} from './definitionComponents';

import { FULL_ICONS_SET } from './iconsDefinitions';
import {COLOR_OPTIONS, SIZE_OPTIONS, DEFAULT_SIZE, DIM_LABEL_OPTIONS, DIM_VIEW_OPTIONS} from './options';
import ATTRIBUTES from './definitionAttributes';

export default function ({ ShowService }) {

// let Dialog = options.Dialog;
//let ShowService = options.ShowService;

// Dimensions array
let dims = {
  type: 'items',
  uses: 'dimensions',
  ref: 'qHyperCubeDef.qDimensions',
  min: 0,
  max: 1,
  allowAdd: true,
  allowRemove: true
};

// Kpi array
let kpis = {
//    type: "items",
    uses : "measures",
    ref: "qHyperCubeDef.qMeasures",
    disabledRef : "qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures",
    min: 1,
    max: 256,
    allowAdd: true,
    allowRemove: true,
    allowMove: true,
    items: {
      autoFormatTemplate: {
        type: "string",
        label: "Auto format",
        translation: "properties.numberFormatting.formatPattern",
        ref: "qDef.autoFormatTemplate",
        defaultValue: "0A",
        show: function(a) {
          return a.qDef.qNumFormat.qType === "U";
        }
      },
      labelColor: {
        type: "string",
        ref: "qDef.labelColor", //"qAttributeExpressions.0.qExpression",
        label: "Label color",
        expression: "always",
        defaultValue: "#545352"
      },
      pickLabelColor: {
        type: "string",
        component: ColorsPickerComponent,
        ref: "qDef.labelColor", //"qAttributeExpressions.0.qExpression",
        defaultValue: "#545352",
        options: COLOR_OPTIONS
      },
      itemColor: {
        type: "string",
        ref: "qDef.valueColor",
        label: "Value color",
        expression: "always",
        defaultValue: "#808080"
      },
      pickItemColor: {
        type: "string",
        component: ColorsPickerComponent,
        ref: "qDef.valueColor",
        defaultValue: "#808080",
        options: COLOR_OPTIONS
      },
      linkToSheet : {
        type : "items",
        items : {
          useLink : {
            ref : "qDef.useLink",
            type : "boolean",
            component : "switch",
            translation : "properties.kpi.linkToSheet",
            defaultValue : !1,
            options : [{
                value : !0,
                translation : "properties.on"
              }, {
                value : !1,
                translation : "properties.off"
              }
            ]
          },
          sheetLink: { 
            ref: "sheetLink", // 'sheet-dropdown' need it!!! See bellow.
            type: "string",
             // Non visible property, detect changes in "qDef.kpiLink". It needs because of 'sheet-dropdown' component.
            component: DetectChangesInComponent('qDef.kpiLink'), 
            show : function (data) {
              return data.qDef.useLink;
            }
          },
          kpiLink : {
            ref: "qDef.kpiLink",
            type : "string",
            component : 'sheet-dropdown',            
            show : function (data) {
              return data.qDef.useLink;
            }
          }
        }
      },
      hideLabel: {
        type: "boolean",
        label: "Hide label",
        ref: "qDef.hideLabel",
        defaultValue: false
      },
      hideValue: {
        type: "boolean",
        label: "Hide value",
        ref: "qDef.hideValue",
        defaultValue: false
      },      
      groupByDimension: {
        type: "boolean",
        label: "Group by dimension",
        ref: "qDef.groupByDimension",
        defaultValue: false
      },
      groupByDimensionValue: {
        type: "string",
        ref: "qDef.groupByDimensionValue",
        label: "Dimension Value",
        expression: "always",
        defaultValue: "",
        show: function(a) {
            return a.qDef.groupByDimension;
        }
      },
      overrideParams: {
        type: "boolean",
        label: "Override parameters",
        ref: "qDef.ovParams",
        defaultValue: false
      },
      overridedLabel: {
        type: "string",
        label: "Label",
        expression: "optional",
        ref: ATTRIBUTES.overridedLabel.ref,
        translation : "Common.Label",
        show: function(a) {
          return a.qDef.ovParams;
        },
        // change: function(obj) {
        //   const isExpr = /^=/;
        //   const isString = /^'(.+)'$/;
        //   const value = obj.qAttributeExpressions[ATTRIBUTES.overridedLabel.index].qExpression;
        //   if(!isExpr.exec(value) && !isString.exec(value)) {
        //     obj.qAttributeExpressions[ ATTRIBUTES.overridedLabel.index] = `'${value}'`;
        //   }
        // },
      },
      size: {
        type: "string",
        component: "dropdown",
        label: "Size",
        ref: "qDef.size",
        options:
        [...SIZE_OPTIONS,
          {
            value: DEFAULT_SIZE,
            label: DEFAULT_SIZE,
            tooltip: DEFAULT_SIZE
          }
        ],
        defaultValue: DEFAULT_SIZE,
        show: function(a) {
            return a.qDef.ovParams;
        }
      },
      labelOrientation: {
        type: "string",
        component: "buttongroup",
        label: "Labels orientation",
        ref: "qDef.labelOrientation",
        options: [
          {
            value: "horizontal",
            label: "Horizontal",
            tooltip: "Horizontal"
          },
          {
            value: "",
            label: "Vertical",
            tooltip: "Vertical"
          }
        ],
        defaultValue: "",
        show: function(a) {
            return a.qDef.ovParams && !a.qDef.hideLabel;
        }
      },
      labelOrder: {
        type: "string",
        component: "buttongroup",
        label: "Labels order",
        ref: "qDef.labelOrder",
        options: [
          {
            value: "first",
            label: "Label, Value",
            tooltip: "Label, Value"
          },
          {
            value: "last",
            label: "Value, Label",
            tooltip: "Value, Label"
          }
        ],
        defaultValue: "first",
        show: function(a) {
            return a.qDef.ovParams && !a.qDef.hideLabel;
        }
      },
      fontStyle: {
        type: "string",
        ref: "qDef.fontStyles",
        label: "Font style",
        expression: "always",
        defaultValue: "",
        show: true
      },
      pickFontStyle: {
        type: "string",
        component: FontStylesComponent,
        ref: "qDef.fontStyles",
        defaultValue: "",
        show: function(a) {
            return typeof a.qDef.fontStyles !== "object";
        }
      },
      textAlignment: {
        type: "string",
        component: "item-selection-list", // buttongroup
        icon: true,
        horizontal: true,
        label: "Alignment",
        translation : "properties.Alignment",
        ref: "qDef.textAlignment",
        defaultValue: "center",
        items : [
          {
            value: "left",
            component : "icon-item",
            icon:"M"
          },
          {
            value: "center",
            icon:"O",
            component : "icon-item"
          },
          /*
          label: "Center",
          labelPlacement : "bottom",
          */
          {
            value: "right",
            icon:"N",
            component : "icon-item"
          }
        ]
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
        component: SelectIconDialogComponent(ShowService), //IconsPickerComponent,
        ref: "qDef.valueIcon",
        defaultValue: "",
        options: FULL_ICONS_SET
      },
      iconPosition: {
        type: "string",
        component: "buttongroup",
        label: "Icon position",
        ref: "qDef.iconPosition",
        options: [
          {
            value: "value",
            label: "Value",
            tooltip: "Value"
          },
          {
            value: "label",
            label: "Label",
            tooltip: "Label"
          }
        ],
        defaultValue: "label",
        show : function (a) {
            return a.qDef.valueIcon;
        }
      },
      iconOrder: {
        type: "string",
        component: "buttongroup",
        label: "Icon order",
        ref: "qDef.iconOrder",
        options: [
          {
            value: "first",
            label: "Icon, Value",
            tooltip: "Icon, Value"
          },
          {
            value: "last",
            label: "Value, Icon",
            tooltip: "Value, Icon"
          }
        ],
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
        show: function(a) {
          return a.qDef.valueIcon;
        },
        options: SIZE_OPTIONS,
        defaultValue: ""
      },
      infographicMode: {
        type: "boolean",
        label: "Infographic mode",
        ref: "qDef.infographic",
        defaultValue: false
      },
      embeddedItem: {
        type: "string",
        ref: "qDef.embeddedItem",
        label: "Visualization",
        //component : "expression",
        //expressionType : "measure",
        expression: "always",
        defaultValue: "",
        show: true
      }
    }
};

// Additional settings
let settings = {
  type: "items",
  uses: "settings",
  items: {
    dimensionsOptions: {
      type: "items",
      label: "Dimensions",
      translation: "Common.Dimensions",
      items: {
        showAs: {
          type: "string",
          component: "dropdown",
          label: "Show as",
          ref: "options.dimShowAs",
          options: DIM_VIEW_OPTIONS,
          defaultValue: "segment"
        },
        divideBy: {
          type: "string",
          component: "dropdown",
          label: "Items per row",
          ref: "options.dimDivideBy",
          defaultValue: "auto",
          show: function(a) {
            return a.options.dimShowAs === 'card'
          },
          options: [
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
        dimensionsOrientation: {
          type: "string",
          component: "buttongroup",
          label: "Orientation",
          ref: "options.dimensionsOrientation",
          show: function(a) {
            return a.options.dimShowAs === 'segment'
          },
          options: [
            {
              value: "horizontal",
              label: "Horizontal",
              tooltip: "Horizontal"
            },
            {
              value: "vertical",
              label: "Vertical",
              tooltip: "Vertical"
            }
          ],
          defaultValue: "horizontal"
        },
        labelOrientation: {
          type: "string",
          component: "dropdown",
          label: "Labels",
          ref: "options.dimLabelOrientation",
          options: DIM_LABEL_OPTIONS,
          defaultValue: "top attached"
        },
        labelSize: {
          type: "string",
          component: "dropdown",
          label: "Size",
          ref: "options.dimLabelSize",
          options: SIZE_OPTIONS,
          defaultValue: ""
        },
        hideLabel: {
          type: "boolean",
          label: "Hide labels",
          ref: "options.dimHideLabels",
          defaultValue: false
        },
        centeredLabel: {
          type: "boolean",
          label: "Center aligned labels",
          ref: "options.dimCenteredLabels",
          defaultValue: false
        },
        hideBorders: {
          type: "boolean",
          label: "Hide external borders",
          ref: "options.dimHideBorders",
          defaultValue: false,
          // show: function(a) {
          //   return a.options.dimShowAs === 'segment'
          // },
        },
        hideInternalBorders: {
          type: "boolean",
          label: "Hide internal borders",
          ref: "options.dimHideInternalBorders",
          defaultValue: false,
          show: function(a) {
            return a.options.dimShowAs === 'segment'
          },
        }
      }
    },
    measuresOptions: {
      type: "items",
      label: "Measures",
      translation: "Common.Measures", //"properties.presentation",
      items: {
        labelOrientation: {
          type: "string",
          component: "buttongroup",
          label: "Labels orientation",
          ref: "options.labelOrientation",
          options: [
            {
              value: "horizontal",
              label: "Horizontal",
              tooltip: "Horizontal"
            },
            {
              value: "",
              label: "Vertical",
              tooltip: "Vertical"
            }
          ],
          defaultValue: ""
        },

        labelOrder: {
          type: "string",
          component: "buttongroup",
          label: "Labels order",
          ref: "options.labelOrder",
          options: [
            {
              value: "first",
              label: "Label, Value",
              tooltip: "Label, Value"
            },
            {
              value: "last",
              label: "Value, Label",
              tooltip: "Value, Label"
            }
          ],
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

        autoSize: {
          type: "boolean",
          component: "switch",
          label: "Responsive size",
          ref: "options.autoSize",
          defaultValue: false,
          options: [
            {
              value: true,
              label: "On"
            },
            {
              value: false,
              label: "Off"
            }]
        },

        divideBy: {
            type: "string",
            component: "dropdown",
            label: "Items per row",
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
    },
    stylingOptions: {
      type: "items",
      label: "Styles",
      translation: "Styles",
      items: {
        backgroundColor: {
          type: "string",
          ref: "options.backgroundColor",
          label: "Background color",
          expression: "always",
          defaultValue: ""
        },
        pickBackgroundColor: {
          type: "string",
          component: ColorsPickerComponent,
          ref: "options.backgroundColor",
          options: COLOR_OPTIONS,
          defaultValue: ""
        },
        iconSize: {
          type: "string",
          component: "dropdown",
          label: "Vertical alignment",
          ref: "options.verticalAlign",
          options: [
            {
              value: "top-aligned-items",
              label: "Top aligned"
            },
            {
              value: "bottom-aligned-items",
              label: "Bottom aligned"
            },
            {
              value: "center-aligned-items",
              label: "Center aligned"
            },
            {
              value: "stretched-items",
              label: "Stretched"
            },
          ],
          defaultValue: "top-aligned-items"
        },
        styles: {
          type: "string",
          component: TextEditorComponent,
          label: "Styles (CSS)",
          ref: "options.styles",
          defaultValue: ""
        }
      }
    }
  }
};

let dataHandling = {
  type: "items",
  translation : "properties.dataHandling",
  grouped: true,
  items: {
    calcCond: {
      type: "items",
      translation : "properties.hyperCube.calcCond",
      items: {
        expr: {
          ref: "qHyperCubeDef.qCalcCond",
          type: "string",
          component : "expression",
          expressionType : "ValueExpr",
          label: "Calculation condition",
          translation : "properties.hyperCube.calcCond"
        },
        customErrorMessage : {
          ref : "qHyperCubeDef.customErrorMessage.calcCond",
          component : "textarea",
          defaultValue : "",
          type : "string",
          placeholderTranslation : "Object.ErrorMessage.CalculationCondition",
          translation : "properties.hyperCube.calcCondMessage",
          show : function (data) {
            //var val = propertyResolver.getValue(data, "qHyperCubeDef.qCalcCond");
            var cond = data.qHyperCubeDef && data.qHyperCubeDef.qCalcCond;
            return cond && cond.qv && "" !== cond.qv;
          }
        }
      }
    }
  }
};

let sorting = {
  uses: "sorting"
}

return {
  type: "items",
  component: "accordion",
  items: {
    dims,
    kpis,
    sorting,
    dataHandling,
    settings
  }
}

}
