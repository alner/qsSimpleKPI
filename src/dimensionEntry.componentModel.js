import { click } from 'test-utilities';
import DimensionEntry from './dimensionEntry';

function DimensionEntryModel (component) {
  this.component = component;

  this.isSelected = () => component.find(DimensionEntry).props().isSelected;

  // actions
  this.select = () => {
    click(component.find('a'));
    component.update();
  };
}

export default DimensionEntryModel;
