import * as React from 'react';
import renderer from 'react-test-renderer';
import LogoutButton from '../LogoutButton';

it(`renders correctly`, () => {
  const tree = renderer.create(<LogoutButton>Logout</LogoutButton>).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveProperty('type', 'View');
  expect(tree).toHaveProperty('props.onClick');
  expect(tree.props.onClick).toBeInstanceOf(Function);
});

