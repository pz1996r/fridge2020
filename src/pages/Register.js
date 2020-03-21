import React from 'react';
import RegisterForm from '../components/RegisterForm';

class Register extends React.Component {
    handleSuccessfulAuth = (token, name) => {
        // this.props.handleLogin();
        this.props.handleSuccessfulAuth(token, name);
        this.props.history.push('/');
    }

    render() {
        return (
            <RegisterForm handleSuccessfulAuth={this.handleSuccessfulAuth} handleUnSuccessfulAuth={this.props.handleUnSuccessfulAuth} />
        );
    }
}
export default Register;
