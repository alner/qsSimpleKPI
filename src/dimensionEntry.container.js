import { connect } from 'react-redux';
import DimensionEntry from './dimensionEntry';
import { deselectEntry, selectEntry } from './selections.actions';

const mapStateToProps = (state, ownProps) => ({
  isSelected: state.selections[ownProps.label.text]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeselect: () => dispatch(deselectEntry(ownProps.label.text)),
  onSelect: () => dispatch(selectEntry(ownProps.label.text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DimensionEntry);
