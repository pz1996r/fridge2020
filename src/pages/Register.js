import React from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';
import RegisterForm from '../components/RegisterForm';

class Register extends React.Component {
  handleSuccessfulAuth = (token, name) => {
    const { handleSuccessfulAuth, history } = this.props;
    // this.props.handleLogin();
    handleSuccessfulAuth(token, name);
    history.push('/');
  };

  render() {
    const { handleUnSuccessfulAuth } = this.props;
    return (
      <RegisterForm
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        handleUnSuccessfulAuth={handleUnSuccessfulAuth}
      />
    );
  }
}
Register.propTypes = {
  history: RouterPropTypes.history.isRequired,
  handleSuccessfulAuth: RouterPropTypes.func.isRequired,
  handleUnSuccessfulAuth: RouterPropTypes.func.isRequired,
};
export default Register;
