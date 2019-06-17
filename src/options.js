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
    value: "#a5673f",
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

// in case of overrided parametes. see definition.js
const DEFAULT_SIZE = ' ';

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
    value: "normal",
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

function getSizeIndex(value) {
  return SIZE_OPTIONS.map(function(item){
    return item.value;
  }).indexOf(value);
}

const DIVIDE_BY = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

const DIVIDE_BY_OPTIONS = [
  {
    value: "auto",
    label: "Auto",
    tooltip: "Auto"
  },
  {
    value: DIVIDE_BY[1],
    label: "1",
    tooltip: "One"
  },
  {
    value: DIVIDE_BY[2],
    label: "2",
    tooltip: "Two"
  },
  {
    value: DIVIDE_BY[3],
    label: "3",
    tooltip: "Three"
  },
  {
    value: DIVIDE_BY[4],
    label: "4",
    tooltip: "Four"
  },
  {
    value: DIVIDE_BY[5],
    label: "5",
    tooltip: "Five"
  },
  {
    value: DIVIDE_BY[6],
    label: "6",
    tooltip: "Six"
  },
  {
    value: DIVIDE_BY[7],
    label: "7",
    tooltip: "Seven"
  },
  {
    value: DIVIDE_BY[8],
    label: "8",
    tooltip: "Eight"
  },
];

function getDivideByValue(setMaxValue, count) {
  var setMax = DIVIDE_BY.indexOf(setMaxValue);
  if (setMax !== -1) {
    return 100 / Math.min(setMax, count);
  }
  return null;
}

const DIM_LABEL_OPTIONS = [
  {
    value: "top attached",
    label: "top attached"
  },
  {
    value: "bottom attached",
    label: "bottom attached"
  },
  {
    value: "top right attached",
    label: "top right attached"
  },
  {
    value: "top left attached",
    label: "top left attached"
  },
  {
    value: "bottom left attached",
    label: "bottom left attached"
  },
  {
    value: "bottom right attached",
    label: "bottom right attached"
  }
];

const DIM_VIEW_OPTIONS = [
  {
    value: "segment",
    label: "Segment"
  },
  {
    value: "card",
    label: "Card"
  }
];

const FONT_SIZE_OPTIONS = [
  'xx-small', // xx-small too small
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large'
];

export default {
  COLOR_OPTIONS,
  DEFAULT_SIZE,
  SIZE_OPTIONS,
  DIVIDE_BY,
  DIVIDE_BY_OPTIONS,
  DIM_LABEL_OPTIONS,
  DIM_VIEW_OPTIONS,
  FONT_SIZE_OPTIONS,
  getSizeIndex,
  getDivideByValue
};
