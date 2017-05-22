import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Place from './pages/Place';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import request from './request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.handleUserStatusChange = this.handleUserStatusChange.bind(this);
    this.requestLogout = this.requestLogout.bind(this);
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

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={ this.state.user } onClickLogout={ this.requestLogout } />
          <Route exact path="/" component={ Home }/>
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
        </div>
      </Router>
    );
  }
}

export default App;