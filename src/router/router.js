import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import GlobalStyle from 'theme/GlobalStyle';
import Loader from 'pages/Loader';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';

const theme = { primary: 'red' };

const PrivateRoute = ({ render, secureRoute, secure: { isLoaded, loggedInStatus }, ...rest }) => {
  const renderFun = isLoaded ? render : () => <Loader secureRoute={secureRoute} />;
  const RouteElement = !loggedInStatus && isLoaded ? <Redirect to="./login" /> : <Route {...rest} render={renderFun} />;
  return RouteElement;
};

export default class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      isLoaded: false,
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  handleSuccessfulAuth(token, name) {
    localStorage.setItem('x-auth-token', token);
    localStorage.setItem('name', name);
    this.setState({
      loggedInStatus: true,
      isLoaded: true,
    });
  }

  checkLoginStatus() {
    const { loggedInStatus } = this.state;
    axios
      .get('/.netlify/functions/routes/logged_in', {
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
      })
      .then(response => {
        if (response.data === 'Valid Token' && loggedInStatus === false) {
          this.setState({
            loggedInStatus: true,
            isLoaded: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          loggedInStatus: false,
          isLoaded: true,
        });
      });
  }

  render() {
    const { isLoaded, loggedInStatus } = this.state;
    const secure = { isLoaded, loggedInStatus };
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Router>
            <PrivateRoute exact path="/" render={props => <Home {...props} />} secure={secure} secureRoute={this.checkLoginStatus} />
            <Route path="/register" render={props => <Register {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} />} />
            <Route path="/login" render={props => <Login {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} />} />
          </Router>
        </ThemeProvider>
      </>
    );
  }
}

PrivateRoute.propTypes = {
  secure: PropTypes.objectOf(PropTypes.bool).isRequired,
  render: PropTypes.func.isRequired,
};
