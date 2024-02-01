import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
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

    onRegister(email, password);
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__text">Регистрация</h2>
        <fieldset className="register__fieldset">
          <input
            className="register__mail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="register__password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePassword}
          />
        </fieldset>
        <button className="register__submit">Зарегистрироваться</button>
        <p className="register__enter">
          Уже зарегистрированы?
          <Link className="register__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
