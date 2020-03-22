import React from 'react';
// import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Button } from './form_components';

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
};

export const Login = () => {
  const label = 'Colors';
  const options = {
    Red: 'red',
    Blue: 'blue',
    None: null,
  };
  const defaultValue = null;
  const groupId = 'GROUP-ID1';

  const value = select(label, options, defaultValue, groupId);
  return <Button color={value}>Login</Button>;
};
