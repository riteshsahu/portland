import React from 'react';
import User from './User';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<User />);
});
