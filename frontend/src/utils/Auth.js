/* eslint-disable no-lone-blocks */
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const BASE_URL = "https://api.mesto.matveeva.nomoredomainsmonster.ru";

export const registerUser = (password, email) => {
  {
    return fetch(`${BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email":email, "password":password }),
    }).then(handleResponse);
  }
};

export const loginUser = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email":email, "password":password }),
  }).then(handleResponse);
};

export const validateToken = (JWT) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT}`,
    },
  }).then(handleResponse);
};
