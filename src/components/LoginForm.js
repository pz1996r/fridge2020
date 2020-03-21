import React from 'react';
import {
    LinkTo as Link, RedirectContainer, P, FormWrapper, Form, FormItem, Input, InputItemBar, Label, H1, Span, Button, CenterButton, Error,
} from './form_items/form_components';

class FormsPage extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            name: '',
            password: '',
            error: null,
            displayError: false,
            nameError: null,
            passwordError: null,
        };
    }

    submitHandler = async (event) => {
        event.preventDefault();
        // const checkobj2 = JSON.stringify(Object.fromEntries(new FormData(event.target)));
        const obj = { name: this.state.name, password: this.state.password };
        if (!this.state.nameError && !this.state.passwordError && this.state.name !== '' & this.state.password !== '') {
            fetch('/.netlify/functions/routes/auth',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                }).then((response) => response.json()
                    .then((resp) => {
                        if (response.status !== 200) {
                            this.setState({
                                error: resp,
                                displayError: true,
                            });
                            if (this.timer) { clearTimeout(this.timer); }
                            this.timer = setTimeout(() => { this.setState({ displayError: false }); }, 3000);
                        } else {
                            const token = response.headers.get('x-auth-token');
                            this.props.handleSuccessfulAuth(token, resp.name);
                        }
                    })).catch((err) => {
                        this.setState({
                            error: 'Nie udało połączyć się z serwerem, spróbuj ponownie za chwilę.',
                            displayError: true,
                        });
                        if (this.timer) { clearTimeout(this.timer); }
                        this.timer = setTimeout(() => { this.setState({ displayError: false }); }, 3000);
                    });
        } else {
            this.setState({
                displayError: true,
            });
            if (this.timer) { clearTimeout(this.timer); }
            this.timer = setTimeout(() => { this.setState({ displayError: false }); }, 3000);
        }
    };

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    blurHandler = () => {
        if (this.state.name.length < 5 || this.state.password.length < 5) {
            let error = this.state.name.length < 5 ? 'Login must be at least 5 characters' : null;
            error = this.state.password.length < 5 && !error ? 'Password must be at least 5 characters' : error;

            this.setState({
                nameError: this.state.name.length < 5,
                passwordError: this.state.password.length < 5,
                error,
                displayError: true,
            });
            if (this.timer) { clearTimeout(this.timer); }
            this.timer = setTimeout(() => { this.setState({ displayError: false }); }, 3000);
        } else if (this.state.name === this.state.password) {
            this.setState({
                nameError: true,
                passwordError: true,
                error: 'Login and Password cannot be the same.',
            });
            if (this.timer) { clearTimeout(this.timer); }
            this.timer = setTimeout(() => { this.setState({ displayError: false }); }, 3000);
        } else {
            this.setState({
                nameError: false,
                passwordError: false,
                displayError: false,
            });
        }
    }

    componentWillUnmount() {
        if (this.timer) { clearTimeout(this.timer); }
    }

    render() {
        return (
            <FormWrapper>
                <Form onSubmit={this.submitHandler} autoComplete="off">
                    <H1>
                        <Span>Login</Span>
                        {' '}
              to your account
            </H1>
                    <Error className="form-error" error={this.state.displayError}>{this.state.error}</Error>
                    <FormItem>
                        <Input
                            value={this.state.name}
                            name="name"
                            onChange={this.changeHandler}
                            onBlur={this.blurHandler}
                            type="text"
                            id="FormLogin"
                            placeholder=" "
                        />
                        <Label htmlFor="FormLogin">Login</Label>
                        <InputItemBar error={this.state.nameError} />
                    </FormItem>
                    <FormItem>
                        <Input
                            value={this.state.password}
                            name="password"
                            onChange={this.changeHandler}
                            onBlur={this.blurHandler}
                            type="password"
                            id="FormPassword"
                            placeholder=" "
                        />
                        <Label htmlFor="FormPassword">Password</Label>
                        <InputItemBar error={this.state.passwordError} />
                    </FormItem>
                    <CenterButton>
                        <Button type="submit">Login</Button>
                    </CenterButton>
                    <RedirectContainer>
                        <P>Don't have an account? </P>
                        <Link to="/register">Sign up here</Link>
                    </RedirectContainer>
                </Form>
            </FormWrapper>
        );
    }
}
export default FormsPage;
