import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'components/LoginForm';

function Login(props) {
  function SuccessfulAuth(token, name) {
    const { handleSuccessfulAuth, history } = props;
    handleSuccessfulAuth(token, name);
    history.push('/');
  }
  return <LoginForm handleSuccessfulAuth={SuccessfulAuth} />;
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
export default Login;
