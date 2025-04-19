import '../pages/index.css'; // главный файл стилей
import { initialCards } from '../components/cards';
import { createCard, removeCard } from '../components/card';
import { openModal, closeModal } from '../components/modal';

// DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const newCardForm = document.forms['new-place'];
const inputCardName = newCardForm.elements['place-name'];
const inputCardLink = newCardForm.elements['link'];

const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 

// DOM элементы формы редактирования профиля
const editProfileForm = popupEdit.querySelector('.popup__form'); 
const nameInput = editProfileForm.querySelector('.popup__input_type_name'); 
const jobInput = editProfileForm.querySelector('.popup__input_type_description'); 

// Добавляем карточки при загрузке
initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeCard, handleCardClick));
});

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;   
  openModal(popupEdit);
});

// Обработка формы редактирования профиля
editProfileForm.addEventListener('submit', function (evt) { 
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value; 
    closeModal(popupEdit); 
  });

// Открытие попапа добавления новой карточки
addCardButton.addEventListener('click', function () {
  openModal(popupNewCard);
});

// Закрытие попапов по кнопке
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Обработка формы добавления новой карточки
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputCardLink.value;

  const newCard = createCard({ name, link }, removeCard, handleCardClick);
  placesList.prepend(newCard); // добавляем в начало списка

  newCardForm.reset(); // очищаем поля формы
  closeModal(popupNewCard); // закрываем попап
});

// Открытие попапа с изображением карточки
function handleCardClick(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageCaption.textContent = name;
  openModal(popupImage);
}

//добавляем всем попапам класс popup_is-animated
document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});