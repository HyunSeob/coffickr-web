import * as queryString from 'query-string';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const ENTER_KEY_CODE = 13;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyUp(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.props.history.push(`/search?q=${event.target.value}`);
      window.location.reload();
    }
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    this.setState({ inputValue: q });
  }

  render() {
    return (
      <header className="Navbar">
        <div className="Navbar__Left">
          <Link to="/" className="Navbar__Link">
            <span className="Navbar__Logo">Coffickr</span>
          </Link>
          <div className="SearchBox">
            <i className="icono-search SearchBox__Icon"></i>
            <input
              type="text"
              className="SearchBox__Input"
              value={ this.state.inputValue }
              onChange={ this.handleChange }
              onKeyUp={ this.handleKeyUp } />
          </div>
        </div>
        <div className="Navbar__Right">
          <button
            className="Button Button--Plain Button--Icon Navbar__Button"
            onClick={ this.props.onClickHamburger }>
            <i className="icono-hamburger"></i>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;