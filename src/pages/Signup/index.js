import React, { Component } from 'react';
import request from '../../request';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    request
      .post('/users', this.state, { withCredentials: true })
      .then((data) => {
        this.props.onSignup({ user: data });
      });

    return false;
  }

  render() {
    return (
      <main className="wrapper">
        <section className="container Section">
          <form>
            <fieldset>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                placeholder="abc@email.com"
                id="email"
                onChange={ this.handleChange }/>

              <label htmlFor="name">별명</label>
              <input
                type="text"
                placeholder="한영 12자 이하"
                id="name"
                onChange={ this.handleChange }/>

              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                onChange={ this.handleChange }/>
            </fieldset>
            <input
              className="Button"
              type="submit"
              value="회원가입"
              onClick={ this.handleSubmit }/>
          </form>
        </section>
      </main>
    );
  }
}

export default Signup;