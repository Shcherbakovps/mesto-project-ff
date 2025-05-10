import '../pages/index.css'; 
import { createCard, handleLikeClick } from '../components/card';
import { openModal, closeModal } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import { getUserInfo, getInitialCards, addNewCard, deleteCard, updateUserInfo, updateUserAvatar } from '../components/api';

//конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const newCardForm = document.forms['new-place'];
const newCardSubmitButton = newCardForm.querySelector('.popup__button');
const inputCardName = newCardForm.elements['place-name'];
const inputCardLink = newCardForm.elements['link'];

const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image'); 

// DOM элементы формы редактирования профиля
const editProfileForm = popupEdit.querySelector('.popup__form');
const editProfileButton = editProfileForm.querySelector('.popup__button'); 
const nameInput = editProfileForm.querySelector('.popup__input_type_name'); 
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// DOM элементы попапа для смены аватара
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarSubmitButton = avatarForm.querySelector('.popup__button');
const avatarInput = avatarForm.elements['avatar'];
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarEditButton = document.querySelector('.profile__avatar-edit');

//переменная с id текущего юзера
let currentUserId = null;

function handleRemoveCard(cardId, cardEl) {
  deleteCard(cardId)
    .then(() => {
      cardEl.remove();
    })
    .catch(err => {
      console.error('Не удалось удалить карточку:', err);
    });
}

//Основная загрузка профиля и карточек 
Promise.all([ getUserInfo(), getInitialCards() ])
  .then(([ userData, cards ]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach(cardData => {
      const cardElement = createCard(
        cardData,
        handleRemoveCard,   
        handleCardClick,
        currentUserId,
        handleLikeClick
      );
      placesList.prepend(cardElement);
    });
  })
  .catch(err => console.error('Ошибка при загрузке данных:', err));

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);   
  openModal(popupEdit);
});

// Обработка формы редактирования профиля
editProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editProfileButton.textContent = 'Сохранение...';
  editProfileButton.disabled = true;
  updateUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then(updatedUser => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupEdit);
    })
    .catch(err => {
      console.error('Не удалось обновить профиль:', err);
    })
    .finally(() => {
      editProfileButton.textContent = 'Сохранить';
      editProfileButton.disabled = false;
    });
});

// Открытие попапа добавления новой карточки
addCardButton.addEventListener('click', function () {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openModal(popupNewCard);
});

// Открытие попапа редактирования аватара
avatarContainer.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
});

// Закрытие попапов по кнопке
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Обработка формы добавления новой карточки
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  newCardSubmitButton.textContent = 'Сохранение...';
  newCardSubmitButton.disabled = true;
  const name = inputCardName.value;
  const link = inputCardLink.value;

    addNewCard({ name, link })
    .then(cardData => {   
      const cardEl = createCard(
        cardData,
        handleRemoveCard,    
        handleCardClick,
        currentUserId,
        handleLikeClick
      );
      placesList.prepend(cardEl);
      newCardForm.reset();
      closeModal(popupNewCard);
    })
    .catch(err => {
      console.error('Не удалось создать карточку:', err);
    })
    .finally(() => {
      newCardSubmitButton.textContent = 'Сохранить';
      newCardSubmitButton.disabled = false;
    })
});

//Отправка новой ссылки на аватарку
avatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранить...';
  avatarSubmitButton.disabled = true;
  updateUserAvatar({ avatar: avatarInput.value })
    .then(updatedUser => {
      profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(popupAvatar);
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
      avatarSubmitButton.disabled = false;
    });
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

//запустим валидацию всех форм на странице
enableValidation(validationConfig);