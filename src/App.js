import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Place from './pages/Place';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={ Home }/>
          <Route path="/login" component={ Login }/>
          <Route path="/signup" component={ Signup }/>
          <Route path="/places/:placeId" component={ Place }/>
        </div>
      </Router>
    );
  }
}

export default App;