import React from 'react';
import UserGroup from './UserGroup';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<UserGroup />);
});
