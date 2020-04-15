import React, { Component } from 'react';
import { Input, Button, H1, Span, P, LinkTo, RedirectContainer } from 'components/atoms/FormAtoms';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Axios from 'axios';

const StyledWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #face00;
`;
const StyledFromWrapper = styled.div`
  background: white;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 310px;
  padding: 40px;
  border-radius: 1rem;
`;
const StyledErrorWrapper = styled.div`
  font-size: 12px;
  color: red;
  margin: 0 0 20px 0;
`;
const StyledError = styled.p`
  transition: max-height 0.8s ease-out;
  height: auto;
  overflow: hidden;
  max-height: ${({ error }) => (error ? '40px' : '0')};
`;

const StyledResponse = styled.p`
  font-size: 12px;
  color: green;
  margin: 0 0 10px 0;
  transition: max-height 0.8s ease-out;
  height: auto;
  overflow: hidden;
  max-height: ${({ error }) => (error ? '40px' : '0')};
`;

const StyledForm = styled.form`
  text-align: center;
  margin: 0 auto 6px auto;
  max-width: 270px;

  overflow: hidden;
  transition: 0.8s 0.3s linear;
  /* max-height: ${({ visible }) => (visible ? '600px' : '0')}; */
`;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: [
        { error: 'Login must be at least 5 characters', active: false },
        { error: 'Password must be at least 5 characters', active: false },
        { error: 'Your email is incorrect.', active: false },
        { error: 'Password has to be uniqe', active: false },
        { error: 'Login or password is incorect', active: false },
        { error: 'Failed to connect to server', active: false },
        { error: 'Check mailbox and confirm your e-mail', active: false },
      ],
      response: { resp: 'The link has been send, check you mailbox', active: false },
      req: {},
      requesting: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('x-verification-token') !== null && localStorage.getItem('x-verification-token') !== undefined) {
      this.setState(({ error }) => ({
        error: [
          ...error.slice(0, -1),
          {
            error: error[error.length - 1].error,
            active: true,
          },
        ],
      }));
    }
  }

  requestHandler = bolean => {
    const { requesting } = this.state;
    if (requesting !== bolean) {
      this.setState({
        requesting: bolean,
      });
    }
    return requesting !== bolean;
  };

  resendEmail = async () => {
    const URL = '/.netlify/functions/routes/verify';
    if (this.requestHandler(true)) {
      Axios.post(URL, {}, { headers: { 'Content-Type': 'application/json', 'x-verification-token': localStorage.getItem('x-verification-token') } })
        .then(resp => {
          this.setState(prevState => ({
            error: [...prevState.error.slice(0, -1), { error: prevState.error[prevState.error.length - 1].error, active: false }],
            response: { resp: resp.data, active: true },
          }));
          this.requestHandler(false);
        })
        .catch(() => {
          this.requestHandler(false);
        });
    }
  };

  submitHandler = async event => {
    event.preventDefault();
    const { req } = this.state;
    const request = JSON.stringify(req);
    const { handleSuccessfulAuth, history, type } = this.props;
    const URL = type === 'LOGIN' ? '/.netlify/functions/routes/auth' : '/.netlify/functions/routes/users';
    return (
      !this.validateHandler() &&
      this.requestHandler(true) &&
      Axios.post(URL, request, { headers: { 'Content-Type': 'application/json' } })
        .then(resp => {
          this.requestHandler(false);
          const token = resp.headers['x-auth-token'];
          const verificationToken = resp.headers['x-verification-token'];
          if (token !== undefined) {
            handleSuccessfulAuth(token, resp.name, resp.email);
            history.push('/');
          } else if (verificationToken !== undefined) {
            localStorage.setItem('x-verification-token', verificationToken);
            if (type !== 'LOGIN') {
              history.push('/login');
            } else {
              this.validateHandler(null, resp.status);
            }
          }
        })
        .catch(err => {
          this.validateHandler(null, err.response.status, err.response.data);
          this.requestHandler(false);
        })
    );
  };

  validateHandler = (event, status, er) => {
    const { target, type } = event || { target: null, type: 'submit' };
    const { req } = this.state;
    let { error } = this.state;
    error = [...error];
    if (type === 'blur') {
      error[0].active = target.name === 'name' && target.value.length < 5 ? true : error[0].active;
      error[1].active = target.name === 'password' && target.value.length < 5 ? true : error[1].active;
      error[2].active = target.name === 'email' && !new RegExp(/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/).test(target.value) ? true : error[2].active;
      error[3].active = req.password !== undefined && (req.name === req.password || req.email === req.password) ? true : error[3].active;
    } else if (type === 'focus') {
      error[0].active = target.name === 'name' ? false : error[0].active;
      error[1].active = target.name === 'password' ? false : error[1].active;
      error[2].active = target.name === 'email' ? false : error[2].active;
      error[3].active = false;
      error[4].active = false;
      error[5].active = false;
      error[6].active = false;
    } else if (type === 'submit' && status) {
      error[4].error = status === 400 ? er : error[4].error;
      error[4].active = status === 400 ? true : error[4].active;
      error[5].active = status === 404 || status === 500 ? true : error[5].active;
      error[6].active = status === 200 ? true : error[6].active;
    } else {
      error[0].active = !req.name ? true : error[0].active;
      error[1].active = !req.password ? true : error[1].active;
    }
    // SubmitBraker validacja formularza przed jego wysłaniem, jeżeli wynik to TRUE, to formularz nie zostanie wysłany.
    const SubmitBreaker = error.find(err => err.active === true);
    this.setState({
      error,
    });
    return SubmitBreaker;
  };

  changeHandler = event => {
    const { value, name } = event.target;
    let { req } = this.state;
    const reg = { email: new RegExp(/[a-zA-Z0-9_@.-]/), name: new RegExp(/[a-zA-Z0-9]/), password: new RegExp(/[a-zA-Z0-9_!@#()*_+?.]/) };
    const clearInput = value
      .split('')
      .filter(sign => reg[name].test(sign))
      .join('');
    req = { ...req };
    req[name] = clearInput;
    this.setState({ req });
  };

  render() {
    const { error, req, requesting, response } = this.state;
    const { type } = this.props;
    const { submitHandler, changeHandler, validateHandler, resendEmail } = this;
    return (
      <StyledWrapper>
        <StyledFromWrapper>
          {type === 'LOGIN' ? (
            <H1>
              <Span>Login</Span> to your account
            </H1>
          ) : (
            <H1>
              <Span>Create</Span> your account
            </H1>
          )}
          <StyledResponse error={response.active}>{response.resp}</StyledResponse>
          <StyledErrorWrapper className="form-error">
            {error.map(err => (
              <StyledError error={err.active} key={err.error}>
                {err.error}
              </StyledError>
            ))}
          </StyledErrorWrapper>
          <StyledForm onSubmit={submitHandler} autoComplete="new-password" visible={!error[6].active}>
            {type === 'LOGIN' ? null : <Input placeholder="EMAIL" type="text" autoComplete="new-password" name="email" value={req.email || ''} onChange={changeHandler} onBlur={validateHandler} onFocus={validateHandler} />}
            <Input placeholder="LOGIN" type="text" name="name" value={req.name || ''} onChange={changeHandler} onBlur={validateHandler} onFocus={validateHandler} />
            <Input placeholder="PASSWORD" type="password" name="password" value={req.password || ''} onChange={changeHandler} onBlur={validateHandler} onFocus={validateHandler} />
            <Button requesting={requesting}>{type === 'LOGIN' ? 'Login' : 'Register'}</Button>
          </StyledForm>

          <Button onClick={resendEmail} requesting={requesting} hide={!error[6].active}>
            SEND VERIFICATION LINK AGAIN
          </Button>

          <RedirectContainer>
            {type === 'LOGIN' ? (
              <>
                <P>Don&#8217;t have an account? </P>
                <LinkTo to="/register">Sign up here</LinkTo>
              </>
            ) : (
              <>
                <P>Are you already registered? </P>
                <LinkTo to="/login"> Login in here</LinkTo>
              </>
            )}
          </RedirectContainer>
        </StyledFromWrapper>
      </StyledWrapper>
    );
  }
}

Form.propTypes = {
  type: PropTypes.oneOf(['LOGIN', 'REGISTER']),
  handleSuccessfulAuth: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
Form.defaultProps = {
  type: 'LOGIN',
};
export default Form;
