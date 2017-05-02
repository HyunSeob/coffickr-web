import React from 'react'

const Signup = () => (
  <main className="wrapper">
    <section className="container Section">
      <form action="post">
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input type="email" placeholder="abc@email.com" id="email"/>

          <label htmlFor="username">별명</label>
          <input type="text" placeholder="한영 12자 이하" id="username"/>

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password"/>
        </fieldset>
        <input className="Button" type="submit" value="회원가입"/>
      </form>
    </section>
  </main>
);

export default Signup;