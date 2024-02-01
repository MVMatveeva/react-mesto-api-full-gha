import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватар пользователя"
        />
        <button
          className="profile__avatar-button"
          onClick={props.onEditAvatar}
        ></button>

        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <button
            className="profile__info-edit"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__info-description">{currentUser.about}</p>
        </div>

        <button
          className="profile__add"
          type="button"
          aria-level="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </div>
  );
}

export default Main;
