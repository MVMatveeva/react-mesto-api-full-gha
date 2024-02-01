import React from "react";

function PopupWithForm({
  name,
  title,
  onSubmit,
  isOpen,
  onClose,
  children,
  button,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className="popup__form"
          onSubmit={onSubmit}
          noValidate
          name={name}
          id={name}
        >
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__text">{title}</h2>
          <fieldset className="popup__fieldset">{children}</fieldset>
          <button className="popup__button" type="submit">
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
