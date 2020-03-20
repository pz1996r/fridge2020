import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const PrivateRoute = ({ pushForwardProps, isLoaded, loggedInStatus, component: Component, ...rest }) => {
  const redirectLink = "./login";
  return (
    < Route
      {...rest}
      render={props =>
        !isLoaded ? (
          <></>
        ) : loggedInStatus ? (
          <Component {...props} {...pushForwardProps} />
        ) : (
              <Redirect to={redirectLink} />
            )
      }
    />
  );
};

export default class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      isLoaded: false,
      name: null,
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(token, name) {
    localStorage.setItem('x-auth-token', token);
    localStorage.setItem('name', name);
    this.setState({
      loggedInStatus: true,
      isLoaded: true,
      name,
    })
  }
  // myśle że można odłączyć tą funckje
  handleUnSuccessfulAuth() {
    this.setState({
      loggedInStatus: false,
      isLoaded: true,
      name: null,
    })
  }

  checkLoginStatus(name = null) {
    axios.get('/.netlify/functions/routes/logged_in', { headers: { 'x-auth-token': localStorage.getItem('x-auth-token') } })
      .then(response => {
        if (response.data === 'Valid Token' && this.state.loggedInStatus === false) {
          this.setState({
            loggedInStatus: true,
            isLoaded: true,
            name: name,
          })
        }
      })
      .catch((err) => {
        // if (err.response !== undefined) { w przypadku problemu z połączenie z serwerem równierz nastąpi przekierowanie do logowania
        this.setState({
          loggedInStatus: false,
          isLoaded: true,
        })

      })
  }
  componentDidMount() {
    if (window.location.href !== 'https://reactexpressapp.netlify.com/login' && window.location.href !== 'https://reactexpressapp.netlify.com/register') {
      localStorage['name'] ? this.checkLoginStatus(localStorage['name']) : this.checkLoginStatus();
    }
  }

  render() {
    return (
      < Router >
        {/*<Route path="/" render={props => (props.history.location.pathname !== '/AddItemToDB' && props.history.location.pathname !== '/login' && props.history.location.pathname !== '/register' ? <Navigation {...props} loggedInStatus={this.state.loggedInStatus} /> : null)} />
        <PrivateRoute path="/mealList" component={MealListPage} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} />
        <PrivateRoute path="/fridge" component={Fridge} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} />
        <PrivateRoute path="/AddItemToDB" component={AddItemToDBForm} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} /> */}
        <PrivateRoute exact path="/" component={Home} isLoaded={this.state.isLoaded} loggedInStatus={this.state.loggedInStatus} pushForwardProps={{ loggedInStatus: this.state.loggedInStatus, name: this.state.name }} />
        <Route exact path="/register" render={props => (<Register {...props} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} handleUnSuccessfulAuth={this.handleUnSuccessfulAuth} />)} />
        <Route exact path="/login" render={props => (<Login {...props} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} handleUnSuccessfulAuth={this.handleUnSuccessfulAuth} />)} />
      </Router >
    );
  }
}
// /.netlify/functions/routes/api1'