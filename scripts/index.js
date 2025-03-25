// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, removeCard) {
    const newCard = cardTemplate.cloneNode(true);

    newCard.querySelector('.card__image').src = item.link;
    newCard.querySelector('.card__title').textContent = item.name;
    newCard.querySelector('.card__image').alt = item.name;

    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    
    placesList.append(newCard);
}  
// @todo: Функция удаления карточки
function removeCard(item) {
    const cardToRemove = item.target.closest('.card');
    cardToRemove.remove(item);
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    createCard(item, removeCard);
});
