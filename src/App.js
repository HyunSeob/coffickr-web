import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dimmer from './components/Dimmer';
import PlaceList from './pages/PlaceList';
import Place from './pages/Place';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import request from './request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      navHidden: true
    };

    this.handleUserStatusChange = this.handleUserStatusChange.bind(this);
    this.requestLogout = this.requestLogout.bind(this);
    this.openNavigation = this.openNavigation.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  componentWillMount() {
    request
      .get('/users/check', { withCredentials: true })
      .then((res) => {
        this.setState({ user: res.data });
      });
  }

  handleUserStatusChange(user) {
    this.setState({ user });
  }

  requestLogout() {
    request
      .get('/users/logout', { withCredentials: true })
      .then(() => {
        this.setState({ user: null });
      });
  }

  openNavigation() {
    this.setState({ navHidden: false });
  }

  closeNavigation() {
    this.setState({ navHidden: true });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" render={(props) => (
            <Header
              { ...props }
              onClickHamburger={ this.openNavigation }/>
          )}/>

          <Route exact path="/" component={ PlaceList }/>
          <Route path="/search" component={ PlaceList }/>
          <Route path="/login" render={() => (
            this.state.user
              ? <Redirect to="/"/>
              : <Login onLogin={ this.handleUserStatusChange } />
          )}/>
          <Route path="/signup" render={() => (
            this.state.user
              ? <Redirect to="/"/>
              : <Signup component={ Signup } onSignup={ this.handleUserStatusChange } />
          )} />
          <Route path="/places/:placeId" component={ Place }/>
          <Dimmer
            hidden={ this.state.navHidden }
            onClickDimmer={ this.closeNavigation }/>
          <Navigation
            user={ this.state.user }
            hidden={ this.state.navHidden }
            onClickNavItem={ this.closeNavigation }
            onClickLogout={ this.requestLogout }/>
        </div>
      </Router>
    );
  }
}

export default App;