const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '8d2973a9-f611-48b6-857c-1f2f16de3dd6',
        'Content-Type': 'application/json'
    } 
}; 

//ф-ия проверики ответа
function _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

//ф-ия загрузки данных пользователя
function getUserInfo() {
  return fetch(`${apiConfig.baseUrl}/users/me`, { 
    headers: apiConfig.headers
  })
    .then(_checkResponse);
}; 

// ф-ия загрузки начальных карточек
function getInitialCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      headers: apiConfig.headers
    })
      .then(_checkResponse);
  };

//редактирование профиля
function updateUserInfo({ name, about }) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({ name, about })
    })
    .then(_checkResponse);
};

//обновляем аватарку
function updateUserAvatar({ avatar }) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({ avatar })
    })
    .then(_checkResponse);
};

// Добавление новой карточки
function addNewCard({ name, link }) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ name, link })
    })
    .then(_checkResponse);
  };
  
// Удаление карточки
function deleteCard(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers
    })
    .then(_checkResponse);
  };

//ставим лайк  
function addLike(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: apiConfig.headers  
    })
    .then(_checkResponse);
};

//убираем лайк
function removeLike(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then(_checkResponse)
};

export { 
    apiConfig, 
    getUserInfo,
    getInitialCards,
    addNewCard,
    deleteCard,
    addLike,
    removeLike,
    updateUserInfo,
    updateUserAvatar 
}
