import React from 'react';
import StoryRouter from 'storybook-react-router';
import { Button, Input, H1, Span, P, LinkTo, RedirectContainer } from './FormAtoms';

export default {
  component: Button,
  title: 'Form Atoms',
  decorators: [StoryRouter()],
};

export const FormButton = () => {
  return <Button>Login</Button>;
};

export const FormInput = () => {
  return <Input placeholder="LOGIN" type="text" />;
};

export const FormTitle = () => {
  return (
    <H1>
      <Span>Login</Span> to your account
    </H1>
  );
};

export const FormRedirect = () => {
  return (
    <>
      <RedirectContainer>
        <P>Don&#8217;t have an account? </P>
        <LinkTo to="/register">Sign up here</LinkTo>
      </RedirectContainer>
      <RedirectContainer>
        <P>Are you already registered? </P>
        <LinkTo to="/login"> Login in here</LinkTo>
      </RedirectContainer>
    </>
  );
};
