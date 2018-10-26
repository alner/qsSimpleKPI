import ACTIONS from './actions';

const selections = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.DESELECT_ALL_ENTRIES:
      return {};
    case ACTIONS.DESELECT_ENTRY:
      return { ...state, [action.label]: false };
    case ACTIONS.SELECT_ENTRY:
      return { ...state, [action.label]: true };
    default:
      return state;
  }
};

export default selections;
