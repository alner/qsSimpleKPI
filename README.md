# Simple KPI

Simple KPI component for Qlik Sense.
It can show one or several KPI using measures and one dimension (optional).
Supports adaptive design (SemanticUI), conditional css colors, conditional icons, configurable number of kpis per line, several predefined sizes, custom styles (CSS).

![Simple KPI](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/SimpleKPI.png)

## Installation

Download [build/qsSimpleKPI.zip](https://github.com/alner/qsSimpleKPI/raw/master/build/qsSimpleKPI.zip), upload to qlik server or extract to appropriate folder.

## Configuration

![Appearance](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Appearance2.png)

![Measures](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Measures.png)

![Appearance](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Appearance.png)

**Conditional colors**

![Colors](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Colors.png)

![Conditional colors](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/ConditionalColors.png)

**Conditional icons**

![Icons](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Icons.png)

![Conditional icons](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/ConditionalIcons.png)

**Custom styles**

 You can fully customize kpis using "Styles (CSS)" property.
 For testing purpose just copy and paste the following styles into "Styles (CSS)" property.

 ```
@import url('https://fonts.googleapis.com/css?family=Indie Flower');
@import url('https://fonts.googleapis.com/css?family=Fredoka One');

& .label {
  font-family: 'Fredoka One';
  font-size:  300%;
}

& .statistic-1  .value {
  background-color: green;
  font-family: 'Indie Flower', sans-serif;
  color: white !important;
}

& .value {
  background-color: yellow;
  font-family: 'Indie Flower', sans-serif;
  font-size: 900%;
  color: red !important;
}
 ```

![Conditional icons](https://raw.githubusercontent.com/alner/qsStatisticBlock/screenshots/screenshots/Styles.png)

## Maintainers

[alner](https://github.com/alner)

## License

MIT
