import React from 'react'
import './Login.css';

const Login = () => (
  <main className="wrapper">
    <section className="container Section">
      <form action="post">
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input type="email" placeholder="abc@email.com" id="email"/>

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password"/>
        </fieldset>
        <input className="Button" type="submit" value="로그인"/>
      </form>
    </section>
  </main>
);

export default Login;