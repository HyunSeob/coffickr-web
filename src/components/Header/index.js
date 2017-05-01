import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="Navbar">
        <Link to="/" className="Navbar__Left Navbar__Link">
          <span className="Navbar__Logo">Coffickr</span>
        </Link>
        <nav className="Navbar__Right">
          <ul>
            <li>
              <Link to="/" className="Navbar__Link">홈</Link>
            </li>
            <li>
              <Link to="/login" className="Navbar__Link">로그인</Link>
            </li>
            <li>
              <Link to="/signup" className="Navbar__Link">회원가입</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;