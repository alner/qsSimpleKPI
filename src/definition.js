import {ColorsPickerComponent, IconsPickerComponent, FontStylesComponent} from './definitionComponents';
import {ALL_ICONS} from './iconsDefinitions';
import {COLOR_OPTIONS, SIZE_OPTIONS, DIM_LABEL_OPTIONS} from './options';

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
        dimensionsOrientation: {
          type: "string",
          component: "buttongroup",
          label: "Orientation",
          ref: "options.dimensionsOrientation",
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
