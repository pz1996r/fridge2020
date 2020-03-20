import React from 'react';
import LoginForm from '../components/LoginForm';


class Login extends React.Component {
    handleSuccessfulAuth = (token, name) => {
        // this.props.handleLogin(name, token);
        this.props.handleSuccessfulAuth(token, name);
        this.props.history.push("/");
    }
    render() {
        return (
            <LoginForm handleSuccessfulAuth={this.handleSuccessfulAuth} handleUnSuccessfulAuth={this.props.handleUnSuccessfulAuth} />
        )
    }
}
export default Login;