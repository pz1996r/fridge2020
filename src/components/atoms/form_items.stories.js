import React from 'react';
// import { action } from '@storybook/addon-actions';
import { Button, Input } from './FormAtoms';

export default {
  component: Button,
  title: 'Button',
};

export const FormButton = () => {
  return <Button>Login</Button>;
};

export const FormInput = () => {
  return <Input placeholder="LOGIN" type="text" />;
};
