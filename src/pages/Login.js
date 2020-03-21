import React from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';
// absolutne importy
import LoginForm from 'components/LoginForm';
// import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  handleSuccessfulAuth(token, name) {
    const { handleSuccessfulAuth, history } = this.props;
    // this.props.handleLogin(name, token);
    handleSuccessfulAuth(token, name);
    history.push('/');
  }

  render() {
    const { handleUnSuccessfulAuth } = this.props;
    return (
      <LoginForm
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        handleUnSuccessfulAuth={handleUnSuccessfulAuth}
      />
    );
  }
}

Login.propTypes = {
  history: RouterPropTypes.history.isRequired,
  handleSuccessfulAuth: RouterPropTypes.func.isRequired,
  handleUnSuccessfulAuth: RouterPropTypes.func.isRequired,
};
export default Login;
