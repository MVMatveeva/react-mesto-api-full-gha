import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.svg";

function Header(props) {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <nav className="header__user">
        <p className="header__mail">{props.mail}</p>
        <Link to={props.route} onClick={props.onClick} className="header__exit">{props.title}</Link>
      </nav>
    </div>
  );
}

export default Header;
