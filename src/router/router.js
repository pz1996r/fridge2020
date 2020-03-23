import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import GlobalStyle from '../theme/GlobalStyle';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const theme = { primary: 'red' };

const PrivateRoute = ({ pushForwardProps, isLoaded, loggedInStatus, component: Component, ...rest }) => {
  const redirectLink = './login';
  return <Route {...rest} render={props => (!isLoaded ? <></> : (loggedInStatus && <Component {...props} {...pushForwardProps} />) || <Redirect to={redirectLink} />)} />;
};

export default class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      isLoaded: false,
      name: null,
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  componentDidMount() {
    if (window.location.href !== 'https://reactexpressapp.netlify.com/login' && window.location.href !== 'https://reactexpressapp.netlify.com/register' && localStorage.name) {
      this.checkLoginStatus(localStorage.name);
    } else {
      this.checkLoginStatus();
    }
  }

  handleSuccessfulAuth(token, name) {
    localStorage.setItem('x-auth-token', token);
    localStorage.setItem('name', name);
    this.setState({
      loggedInStatus: true,
      isLoaded: true,
      name,
    });
  }

  checkLoginStatus(name = null) {
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
            name,
          });
        }
      })
      .catch(() => {
        // if (err.response !== undefined) { w przypadku problemu z połączenie z serwerem równierz nastąpi przekierowanie do logowania
        this.setState({
          loggedInStatus: false,
          isLoaded: true,
        });
      });
  }

  render() {
    const { isLoaded, loggedInStatus, name } = this.state;
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Router>
            {/* <Route path="/" render={props => (props.history.location.pathname !== '/AddItemToDB' && props.history.location.pathname !== '/login' && props.history.location.pathname !== '/register' ? <Navigation {...props} loggedInStatus={this.state.loggedInStatus} /> : null)} />
            <PrivateRoute path="/mealList" component={MealListPage} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} />
            <PrivateRoute path="/fridge" component={Fridge} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} />
            <PrivateRoute path="/AddItemToDB" component={AddItemToDBForm} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} /> */}
            <PrivateRoute exact path="/" component={Home} isLoaded={isLoaded} loggedInStatus={loggedInStatus} pushForwardProps={{ loggedInStatus, name }} />
            <Route exact path="/register" render={props => <Register {...props} loggedInStatus={loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} />} />
            <Route exact path="/login" render={props => <Login {...props} loggedInStatus={loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} />} />
          </Router>
        </ThemeProvider>
        <GlobalStyle />
      </div>
    );
  }
}
// /.netlify/functions/routes/api1'

PrivateRoute.propTypes = {
  // pushForwardProps: PropTypes.object.isRequired,
  pushForwardProps: PropTypes.objectOf(PropTypes.object()).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
};
