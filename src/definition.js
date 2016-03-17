import {ColorsPickerComponent, IconsPickerComponent, FontStylesComponent, TextEditorComponent} from './definitionComponents';
import {ALL_ICONS} from './iconsDefinitions';
import {COLOR_OPTIONS, SIZE_OPTIONS, DIM_LABEL_OPTIONS, DIM_VIEW_OPTIONS} from './options';

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
    type: "items",
    uses : "measures",
    ref: "qHyperCubeDef.qMeasures",
    disabledRef : "qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures",
    min: 1,
    max: 256,
    allowAdd: true,
    allowRemove: true,
    allowMove: true,
    items : {
      labelColor: {
        type: "string",
        ref: "qDef.labelColor",
        label: "Label color",
        expression: "always",
        defaultValue: "#545352"
      },
      pickLabelColor: {
        type: "string",
        component: ColorsPickerComponent,
        ref: "qDef.labelColor",
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
          kpiLink : {
            ref : "qDef.kpiLink",
            type : "items",
            component : "sheet-dropdown",
            items : {
              id : {
                ref : "qDef.kpiLink.id",
                type : "string"
              },
              title : {
                ref : "qDef.kpiLink.title",
                type : "string"
              }
            },
            show : function (data) {
              return data.qDef.useLink //data.qDef.useLink
            }
          }
        }
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
      size: {
        type: "string",
        component: "dropdown",
        label: "Size",
        ref: "qDef.size",
        options: SIZE_OPTIONS,
        defaultValue: "",
        show: function(a) {
            return a.qDef.ovParams;
        }
      },
      hideLabel: {
        type: "boolean",
        label: "Hide label",
        ref: "qDef.hideLabel",
        defaultValue: false
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
          show: function(a) {
            return a.options.dimShowAs === 'segment'
          },
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

let sorting = {
  uses: "sorting"
}

export default {
  type: "items",
  component: "accordion",
  items: {
    dims,
    kpis,
    sorting,
    settings
  }
};
