# Simple KPI

Simple KPI component for Qlik Sense.
It can show one or several KPI using measures and one dimension (selectable, optional, it can show up to 125 measures and if it is used no more then 80 dimensions lines).
Supports adaptive design, conditional css colors, conditional icons, infographic (with constraints, no more than 1000 icons per measure), configurable number of kpis per line, several predefined sizes, custom styles (CSS).
Each measure can have a link to another sheet.

![Simple KPI](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/SimpleKPI.png)

## Circle CI build status
[![CircleCI](https://circleci.com/gh/qlik-oss/qsSimpleKPI/tree/master.svg?style=svg)](https://circleci.com/gh/qlik-oss/qsSimpleKPI/tree/master)


## Developing the extension

If you want to do code changes to the extension follow these simple steps to get going.

1. Get Qlik Sense Desktop
1. Create a new app and add qsSimpleKPI to a sheet.
2. Clone the repository
3. Run `npm install`
4. Change the `deployFolder`in `server.config.json` to be your local extensions folder. It will be something like `C:/Users/nerush/Documents/Qlik/Sense/Extensions/qsSimpleKPI`.
5. Run `npm run dev`. This will start a watcher which will rebuild the extension and output all needed files to the `deployFolder` for each code change you make.
6. See your changes directly in your Qlik Sense app.

## Maintainers

[alner](https://github.com/alner)

## License

MIT

### Video: Using the simple KPI extension in Qlik Sense - Qlik Tuesday Tips and Tricks

[![Using the simple KPI](https://i.ytimg.com/vi/vubli1Icp68/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLBQnCS4wNgkNtB7TLFDbOVqGW5GXg)](https://youtu.be/vubli1Icp68)

## Installation

Download [build/qsSimpleKPI.zip](https://github.com/alner/qsSimpleKPI/raw/master/build/qsSimpleKPI.zip), upload to qlik server or extract to appropriate folder.

Qlik Sense Desktop: unzip to a directory under [My Documents]/Qlik/Sense/Extensions.

Qlik Sense Server: import the zip file in the QMC.

## Demo

Download [SimpleKPIDemo.qvf](examples/SimpleKPIDemo.qvf)

![Example](examples/images/using_styles.png)

You can easily add several kpis, group them accordingly and apply different ui settings (different font sizes, alignments, styles, icons, links to different sheets, responsive options).

![Example](examples/SimpleKPIDemo.png)

You can embedded Master Visualizations into the simple kpi object.

![Example](examples/images/embedded_charts.png)

You can add measure with some fake value (for example, using the following expression: ='Drag and Drop here'), then drag and drop master visualization into the value region or you can insert object id into the "Visualization" property for each measure.

### Video: SimpleKPI plus Line Chart Tutorial.

[![Simple KPI plus Line Chart Tutorial](https://i.ytimg.com/vi/gJxUUnJi5Vc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLDho5IkTXSDn-lJjx8kekuALsn3Yw)](https://youtu.be/gJxUUnJi5Vc)

![Example](examples/images/drag_chart.png)

Infographic mode allows you to show appropriate number of icons (depends on measure, with constraints, no more than 1000 icons per measure).

![Example](examples/images/infographic.png)

## Configuration

![Appearance](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Appearance2.png)

You can set icon for value or label (full icons set included).

![Example](examples/IconDialog.png)

![Measures](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Measures.png)


**Conditional colors**

![Colors](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Colors.png)

![Conditional colors](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/ConditionalColors.png)

**Conditional icons**

![Conditional icons](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/ConditionalIcons.png)

**Infographic mode**

You can set "Infographic mode" option for each measure. In such case expression determines icons quantity (with constraints, no more than 1000 icons per measure).

![Example](examples/images/infographic_mode.png)

**Measure alignment**

![Example](examples/images/alignment.png)

**Calculation condition**

![Example](examples/images/CalcCondition.png)

**Styles**

 "Background color" property allows to set background color of the object using expression.

 ![Example](examples/images/background_color.png)

 All KPIs can be vertically aligned.

 ![Example](examples/images/vertical_alignment.png)

 You can fully customize kpis using "Styles (CSS)" property. For more details see [SimpleKPIDemo.qvf](examples/SimpleKPIDemo.qvf) ("Styles" sheet).

![Example](examples/images/google_fonts.png)

 For example, you can change font-family, font-size, background color, text color and so on, using "Styles (CSS)" property for appropriate measure.

 ```
@import url('https://fonts.googleapis.com/css?family=Indie Flower');
@import url('https://fonts.googleapis.com/css?family=Fredoka One');

& .label * {
  font-family: 'Fredoka One';
  font-size:  300%;
}

& .statistic-1  .value * {
  background-color: green;
  font-family: 'Indie Flower', sans-serif;
  color: white !important;
}

& .value * {
  background-color: yellow;
  font-family: 'Indie Flower', sans-serif;
  font-size: 900%;
  color: red !important;
}
 ```

For example, you can import "Font Awesome" and use it. Just copy and paste the following styles into "Styles (CSS)" property.
```
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
```

Just copy and paste appropriate classes ([see icons](https://fortawesome.github.io/Font-Awesome/icons/)) into the "Icon" measure's property.
For example, copy and paste the following into the "Icon" property.
```
fa fa-calendar
```
![Font awesome](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/fontawesome.png)

