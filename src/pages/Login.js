import React from 'react';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  handleSuccessfulAuth(token, name) {
    const { handleSuccessfulAuth, history } = this.props;
    // this.props.handleLogin(name, token);
    handleSuccessfulAuth(token, name);
    history.push('/');
  }

  render() {
    return (
      <LoginForm
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        handleUnSuccessfulAuth={this.props.handleUnSuccessfulAuth}
        handleUnSuccessfulAuth={this.props.handleUnSuccessfulAuth}
      />
    );
  }
}
export default Login;
