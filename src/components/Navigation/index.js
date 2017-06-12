import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true
    };
  }

  render() {
    return (
      <nav className={ `Navigation${this.props.hidden ? ' Navigation--Hidden': ''}` }>
        {
          (!!this.props.user) ? (
            <ul>
              <li>
                <Link
                  to="/"
                  className="Navigation__Link"
                  onClick={ this.props.onClickNavItem }>
                  홈
                </Link>
              </li>
              <li>
                <button
                  className="Navigation__Link"
                  onClick={ () => {
                    this.props.onClickNavItem();
                    this.props.onClickLogout();
                  } }>
                  로그아웃
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link
                  to="/"
                  className="Navigation__Link"
                  onClick={ this.props.onClickNavItem }>
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="Navigation__Link"
                  onClick={ this.props.onClickNavItem }>
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="Navigation__Link"
                  onClick={ this.props.onClickNavItem }>
                  회원가입
                </Link>
              </li>
            </ul>
          )
        }
      </nav>
    );
  }
}

export default Navigation;
