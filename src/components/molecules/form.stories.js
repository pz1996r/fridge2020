import React from 'react';
import StoryRouter from 'storybook-react-router';
import Form from './Form';

export default {
  component: Form,
  title: 'Formularz',
  decorators: [StoryRouter()],
};

export const FormElement = () => {
  return <Form />;
};
