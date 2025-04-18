export { openModal, closeModal };

function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    modalWindow.addEventListener('mousedown', handleOverlayClose);
}

function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    modalWindow.removeEventListener('mousedown', handleOverlayClose);
}

function handleEscClose(evt) {
    if(evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if(openPopup) closeModal(openPopup);
    }
}

function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}