import React from 'react';
import PropTypes from 'prop-types';
// absolutne importy
// import LoginForm from 'components/LoginForm';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  handleSuccessfulAuth(token, name) {
    const { handleSuccessfulAuth, history } = this.props;
    // this.props.handleLogin(name, token);
    handleSuccessfulAuth(token, name);
    history.push('/');
  }

  render() {
    return <LoginForm handleSuccessfulAuth={this.handleSuccessfulAuth} />;
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
export default Login;
