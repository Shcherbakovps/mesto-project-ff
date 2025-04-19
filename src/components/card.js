function createCard(item, removeCardHandler, imageClickHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  
    const newCardImage = newCard.querySelector('.card__image');
    const newCardTitle = newCard.querySelector('.card__title');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');
  
    newCardImage.src = item.link;
    newCardImage.alt = item.name;
    newCardTitle.textContent = item.name;
  
    deleteButton.addEventListener('click', removeCardHandler);
  
    // Добавляем обработчик открытия изображения
    newCardImage.addEventListener('click', () => {
      imageClickHandler(item.name, item.link);
    });

    likeButton.addEventListener('click', handleLikeClick);
  
    return newCard;
  }

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}  

//функция удаления карточки
function removeCard(evt) {
    const cardToRemove = evt.target.closest('.card');
    cardToRemove.remove();
}

export { createCard, removeCard};