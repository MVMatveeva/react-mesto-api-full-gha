import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(email, password);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__text">Вход</h2>
        <fieldset className="login__fieldset">
          <input
            className="login__mail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="login__password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePassword}
          />
        </fieldset>
        <button className="login__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
