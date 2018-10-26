import { createStore } from 'redux';
import rootReducer from './root.reducer';

const stores = {};

const getStore = id => {
  if (!stores[id]) {
    stores[id] = createStore(rootReducer);
  }
  return stores[id];
};

export default getStore;
