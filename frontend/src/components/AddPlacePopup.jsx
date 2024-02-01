import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={isOpen}
      button="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_add_name"
        type="text"
        name="name"
        onChange={handleAddName}
        value={name || ""}
        placeholder="Название"
      />
      <span className="error" id="place-error"></span>
      <input
        className="popup__input popup__input_add_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleAddLink}
        value={link || ""}
        required
      />
      <span className="error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
