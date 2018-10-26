import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/root.reducer';

export function mountedComponent (Model, Component, props = {}, jsx) {
  const component = mount(
    jsx || <Component {...props} />
  ).find(Component);
  return new Model(component);
}

export function mountedApplication (Model, Container, Component, props = {}) {
  const store = createStore(rootReducer);
  const application = mount(
    <Provider store={store}>
      <Container {...props} />
    </Provider>
  );
  return new Model(application);
}

export function click(element, eventData = {}) {
  element.simulate('click', eventData);
}

export function flush (timeout = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
