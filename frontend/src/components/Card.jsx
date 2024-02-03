import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;
  const handleCardLike = () => {
    onCardLike(card);
  };
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="element">
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
