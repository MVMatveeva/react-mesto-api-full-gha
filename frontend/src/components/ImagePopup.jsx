import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div id="popup-image" className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__image">
        <button className="popup__close" type="button" onClick={onClose} />
        <img className="popup__link" src={card?.link} alt={card?.name} />
        <h2 className="popup__name">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
