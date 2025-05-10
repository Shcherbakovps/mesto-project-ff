/* validation.js */

//покажем текст ошибки под полем ввода
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // выделяем поле красной рамкой
    inputElement.classList.add(config.inputErrorClass);
    // если именно pattern не совпал — показываем кастом
    if (inputElement.validity.patternMismatch) {
      errorElement.textContent = inputElement.dataset.errorMessage;
    } else {
      // во всех остальных случаях — браузерное сообщение
      errorElement.textContent = inputElement.validationMessage;
    }
    // делаем текст ошибки видимым
    errorElement.classList.add(config.errorClass);
  }
  

//скрываем текст ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

//проверка правильности заполнения инпутов пользователем
function checkInputValidity (formElement, inputElement, config) {
  inputElement.setCustomValidity('');
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  } 
}

//проверяем наличие ошибки хотя бы в одном инпуте
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//переключатель состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//подключаем слушатель к полям
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
      });
    });
  }

//Сброс сообщения об ошибки и состояния кнопки
function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}  

//включаем валидацию для всех форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

export { enableValidation, clearValidation };