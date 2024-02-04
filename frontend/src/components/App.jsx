import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";
import Success from "../image/Success.svg";
import Fail from "../image/Fail.svg";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupRegisterImage, setPopupRegisterImage] = useState("");
  const [popupRegisterTitle, setPopupRegisterTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .validateToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };
  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .newCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleRegisterUser = (email, password) => {
    auth
      .registerUser(password, email)
      .then(() => {
        setPopupRegisterImage(Success);
        setPopupRegisterTitle("Вы успешно зарегистрировались!");
        navigate("/");
      })
      .catch(() => {
        setPopupRegisterImage(Fail);
        setPopupRegisterTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        handleInfoTooltip(true)
      })
  };

  const handleLoginUser = (email, password) => {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch(() => {
        setPopupRegisterImage(Fail);
        setPopupRegisterTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip(true)
      })
  };

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((res) => res.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                mail={userEmail}
                onClick={handleExit}
                title="Выйти"
                route="/sign-in"
              />
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={isLoggedIn}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header route="/sign-in" title="Войти" />
              <Register onRegister={handleRegisterUser} />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header route="/sign-up" title="Зарегистрироваться" />
              <Login onLogin={handleLoginUser} />
            </>
          }
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        status={popupRegisterImage}
        message={popupRegisterTitle}
        isOpen={infoTooltip}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
