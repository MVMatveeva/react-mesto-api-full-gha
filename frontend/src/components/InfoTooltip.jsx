import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__register">
        <img className="popup__status" src={props.status} alt={props.message} />
        <p className="popup__message">{props.message}</p>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
