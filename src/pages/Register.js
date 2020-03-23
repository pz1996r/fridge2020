import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from 'components/RegisterForm';

class Register extends React.Component {
  handleSuccessfulAuth = (token, name) => {
    const { handleSuccessfulAuth, history } = this.props;
    // this.props.handleLogin();
    handleSuccessfulAuth(token, name);
    history.push('/');
  };

  render() {
    return <RegisterForm handleSuccessfulAuth={this.handleSuccessfulAuth} />;
  }
}
Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
export default Register;
