import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_edit_name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleEditName}
        required
      />
      <span className="error" id="place-error"></span>
      <input
        className="popup__input popup__input_edit_description"
        type="text"
        name="description"
        placeholder="О себе"
        value={description || ""}
        onChange={handleEditDescription}
        required
      />
      <span className="error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
