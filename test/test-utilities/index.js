import React from 'react';
import { mount } from 'enzyme';

export function mountedComponent (Model, Component, props = {}, jsx) {
  const component = mount(
    jsx || <Component {...props} />
  ).find(Component);
  return new Model(component);
}

export function click(element, eventData = {}) {
  element.simulate('click', eventData);
}
