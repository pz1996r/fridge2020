import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo as Link, RedirectContainer, P, FormWrapper, Form, FormItem, Input, InputItemBar, Label, H1, Span, Button, CenterButton, Error } from 'components/form_items/form_components';

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

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  submitHandler = async event => {
    event.preventDefault();
    const { name, password, nameError, passwordError } = this.state;
    const { handleSuccessfulAuth } = this.props;
    // const checkobj2 = JSON.stringify(Object.fromEntries(new FormData(event.target)));
    const obj = { name, password };
    if (!nameError && !passwordError && name !== '' && password !== '') {
      fetch('/.netlify/functions/routes/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(response =>
          response.json().then(resp => {
            if (response.status !== 200) {
              this.setState({
                error: resp,
                displayError: true,
              });
              if (this.timer) {
                clearTimeout(this.timer);
              }
              this.timer = setTimeout(() => {
                this.setState({ displayError: false });
              }, 3000);
            } else {
              const token = response.headers.get('x-auth-token');
              handleSuccessfulAuth(token, resp.name);
            }
          }),
        )
        .catch(() => {
          this.setState({
            error: 'Nie udało połączyć się z serwerem, spróbuj ponownie za chwilę.',
            displayError: true,
          });
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.setState({ displayError: false });
          }, 3000);
        });
    } else {
      this.setState({
        displayError: true,
      });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setState({ displayError: false });
      }, 3000);
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  blurHandler = () => {
    const { name, password } = this.state;
    if (name.length < 5 || password.length < 5) {
      let error = name.length < 5 ? 'Login must be at least 5 characters' : null;
      error = password.length < 5 && !error ? 'Password must be at least 5 characters' : error;

      this.setState({
        nameError: name.length < 5,
        passwordError: password.length < 5,
        error,
        displayError: true,
      });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setState({ displayError: false });
      }, 3000);
    } else if (name === password) {
      this.setState({
        nameError: true,
        passwordError: true,
        error: 'Login and Password cannot be the same.',
      });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setState({ displayError: false });
      }, 3000);
    } else {
      this.setState({
        nameError: false,
        passwordError: false,
        displayError: false,
      });
    }
  };

  render() {
    const { error, displayError, name, nameError, password, passwordError } = this.state;
    return (
      <FormWrapper>
        <Form onSubmit={this.submitHandler} autoComplete="off">
          <H1>
            <Span>Login</Span> to your account
          </H1>
          <Error className="form-error" error={displayError}>
            {error}
          </Error>
          <FormItem>
            <Input value={name} name="name" onChange={this.changeHandler} onBlur={this.blurHandler} type="text" id="FormLogin" placeholder=" " />
            <Label htmlFor="FormLogin">Login</Label>
            <InputItemBar error={nameError} />
          </FormItem>
          <FormItem>
            <Input value={password} name="password" onChange={this.changeHandler} onBlur={this.blurHandler} type="password" id="FormPassword" placeholder=" " />
            <Label htmlFor="FormPassword">Password</Label>
            <InputItemBar error={passwordError} />
          </FormItem>
          <CenterButton>
            <Button type="submit">Login</Button>
          </CenterButton>
          <RedirectContainer>
            <P>Don&#8217;t have an account? </P>
            <Link to="/register">Sign up here</Link>
          </RedirectContainer>
        </Form>
      </FormWrapper>
    );
  }
}

FormsPage.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
export default FormsPage;
