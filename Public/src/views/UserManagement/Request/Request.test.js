import React from 'react';
import Request from './Request';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Request />);
});
