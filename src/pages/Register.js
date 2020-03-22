import React from 'react';
import PropTypes from 'prop-types';
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
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSuccessfulAuth: PropTypes.func.isRequired,
  handleUnSuccessfulAuth: PropTypes.func.isRequired,
};
export default Register;
