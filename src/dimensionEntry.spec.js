import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import merge from 'lodash.merge';
import DimensionEntryModel from './dimensionEntry.componentModel';
import DimensionEntry from './dimensionEntry';
import { mountedComponent } from 'test-utilities';

Enzyme.configure({ adapter: new Adapter() });

describe('<DimensionEntry />', () => {
  const defaultProps = {
    children: null,
    dimensionIndex: 0,
    dimNo: 0,
    dindex: 0,
    divideBy: '',
    divideByNumber: '',
    label: {
      isHidden: false,
      orientation: '',
      alignment: '',
      size: '',
      text: 'test'
    },
    onToggle: () => {},
    showAs: '',
    style: {}
  };

  function setup (otherProps, jsx) {
    const props = merge(defaultProps, otherProps);

    return mountedComponent(DimensionEntryModel, DimensionEntry, props, jsx);
  }

  describe('initial render', () => {
    it('should render without exploding', () => {
      const model = setup();
      expect(model.component).toBeDefined();
    });

    it('should not be selected', () => {
      const model = setup();
      expect(model.isSelected()).toEqual(false);
    });
  });

  describe('when selected', () => {
    it('should be in selected state', () => {
      const model = setup();
      model.select();
      expect(model.isSelected()).toEqual(true, 'is selected');
    });
  });
});
