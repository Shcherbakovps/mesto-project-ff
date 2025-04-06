import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, removeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    const newCardImage = newCard.querySelector('.card__image');
    newCardImage.src = item.link;
    newCardImage.alt = item.name;
    newCard.querySelector('.card__title').textContent = item.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    
    return newCard;
};  

// @todo: Функция удаления карточки
function removeCard(item) {
    const cardToRemove = item.target.closest('.card');
    cardToRemove.remove(item);
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(createCard(item, removeCard));
});
