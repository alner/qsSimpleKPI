import ACTIONS from './actions';

export const deselectAllEntries = () => ({
  type: ACTIONS.DESELECT_ALL_ENTRIES
});

export const deselectEntry = label => ({
  type: ACTIONS.DESELECT_ENTRY,
  label
});

export const selectEntry = label => ({
  type: ACTIONS.SELECT_ENTRY,
  label
});
