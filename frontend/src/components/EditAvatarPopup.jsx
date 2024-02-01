import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      button="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_edit_photo"
        type="url"
        name="avatar"
        placeholder="Ссылка"
        minLength="2"
        ref={avatarRef}
        required
      />
      <span className="error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
