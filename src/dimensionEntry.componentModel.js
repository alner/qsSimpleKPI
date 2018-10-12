import { click } from 'test-utilities';

function DimensionEntryModel (component) {
  this.component = component;

  this.isSelected = () => component.state().isSelected;

  // actions
  this.select = () => click(component.find('a'));
}

export default DimensionEntryModel;
