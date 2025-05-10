//import { addLike, removeLike } from './api';

function createCard(item, removeCardHandler, imageClickHandler, userId, handleLikeClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  const img = newCard.querySelector('.card__image');
  const title = newCard.querySelector('.card__title');
  const delBtn = newCard.querySelector('.card__delete-button');
  const likeBtn = newCard.querySelector('.card__like-button');
  const likeCount = newCard.querySelector('.card__like-count');

  // Заполняем контент
  img.src = item.link;
  img.alt = item.name;
  title.textContent = item.name;

  // Показываем текущее число лайков
  likeCount.textContent = item.likes.length;

  if (item.likes.some(like => like._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  /*// Обработчик лайка через API
  likeBtn.addEventListener('click', () => {
    const isLiked = likeBtn.classList.contains('card__like-button_is-active');
    const request = isLiked
      ? removeLike(item._id)
      : addLike(item._id);

    request
      .then(updatedCard => {
        likeCount.textContent = updatedCard.likes.length;
        likeBtn.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.error('Ошибка лайка:', err));
  });*/
  likeBtn.addEventListener('click', () => {
    handleLikeClick(item._id, likeBtn, likeCount);
  })

  // Открытие попапа по клику на картинку
  img.addEventListener('click', () => {
    imageClickHandler(item.name, item.link);
  });

  // Удаление карточки, если моя
  if (item.owner._id === userId) {
    delBtn.addEventListener('click', () => {
      removeCardHandler(item._id, newCard);
    });
  } else {
    delBtn.remove();
  }

  return newCard;
}

export { createCard };