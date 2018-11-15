import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import merge from 'lodash.merge';
import DimensionEntryModel from './dimensionEntry.componentModel';
import DimensionEntry from './dimensionEntry';
import DimensionEntryContainer from './dimensionEntry.container';
import { mountedApplication, mountedComponent } from 'test-utilities';

Enzyme.configure({ adapter: new Adapter() });

describe('<DimensionEntry />', () => {
  const defaultProps = {
    children: null,
    dimension: [{},{}],
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

  function fullSetup (otherProps) {
    const props = merge(defaultProps, otherProps);

    return mountedApplication(DimensionEntryModel, DimensionEntryContainer, DimensionEntry, props);
  }

  describe('initial render', () => {
    it('should render without exploding', () => {
      const model = setup();
      expect(model.component).toBeDefined();
    });
  });

  describe('when clicking while deselected', () => {
    it('should be selected', () => {
      const model = fullSetup();
      expect(model.isSelected()).toBeFalsy();
      model.select();
      expect(model.isSelected()).toBe(true, 'should be selected');
    });
  });

  describe('when clicking while selected', () => {
    it('should be deselected', () => {
      const model = fullSetup();
      model.select();
      expect(model.isSelected()).toBe(true);
      model.select();
      expect(model.isSelected()).toBeFalsy();
    });
  });
});
