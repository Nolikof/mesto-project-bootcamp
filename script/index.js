const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCloseButtonProfile = document.querySelector(
  ".popup__close-button_type_profile"
);
const popupCloseButtonNewPlace = document.querySelector(
  ".popup__close-button_type_newplace"
);
const popupCloseButtonImage = document.querySelector(
  ".popup__close-button_image_close"
);
const popupImage = document.querySelector(".popup_type_image");
const formElementProfile = document.querySelector(".popup__form");
const formElementNewPlace = document.querySelector(".popup__form-newplace");
const nameInput = document.querySelector(".popup__input_value_name");
const aboutInput = document.querySelector(".popup__input_value_about");
const profileName = document.querySelector(".profile__full-name");
const about = document.querySelector(".profile__about");
const elementsTitle = document.querySelector(".elements__title");
const addCardButton = document.querySelector(".profile__add-button");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const placeInput = document.querySelector(".popup__input_value_place");
const srcInput = document.querySelector(".popup__input_value_src");
const section = document.querySelector(".elements");
const itemTemplate = document.querySelector(".template").content;
const itemTemplateCard = itemTemplate
  .querySelector(".elements__item")
  .cloneNode(true);
const newBasket = itemTemplateCard.querySelector(".elements__basket");
const errorTextName = document.querySelector(".eorghfejrhgsdfjg_name_error");
const popups = document.querySelectorAll(".popup");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (element) {
  const card = createCardElement(element.name, element.link);
  section.append(card);
});

function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(popupProfile);
}

function createCardElement(name, link) {
  const itemTemplateCardNew = itemTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const elementsImage = itemTemplateCardNew.querySelector(".elements__image");
  const basket = itemTemplateCardNew.querySelector(".elements__basket");
  const buttonHeart = itemTemplateCardNew.querySelector(".elements__heart");
  const popupImage = document.querySelector(".popup_type_image");
  const elementsText = itemTemplateCardNew.querySelector(".elements__title");
  buttonHeart.addEventListener("click", function () {
    buttonHeart.classList.toggle("elements__heart_active");
  });
  elementsImage.addEventListener("click", function () {
    openPopup(popupImage);
    document.querySelector(".popup__image").src = link;
    document.querySelector(".popup__image").alt = name;
    document.querySelector(".popup__image-text").textContent = name;
  });
  basket.addEventListener("click", function () {
    itemTemplateCardNew.remove();
  });
  elementsImage.src = link;
  elementsImage.alt = name;
  elementsText.textContent = name;
  return itemTemplateCardNew;
}

function addPlace(evt) {
  const popupImage = document.querySelector(".popup_type_image");
  evt.preventDefault();
  const name = placeInput.value;
  const link = srcInput.value;
  const card = createCardElement(name, link);
  createCardElement(name, link);
  closePopup(popupNewPlace);
  formElementNewPlace.reset();
  section.prepend(card);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupOnKeyDownEscape);
}

function closePopupOnKeyDownEscape(event) {
  const openedPopup = document.querySelector(".popup_opened");
  console.log(event.key, openedPopup);
  if (event.key === "Escape" && openedPopup) {
    console.log(openedPopup);
    window.removeEventListener("keydown", closePopupOnKeyDownEscape);
    closePopup(openedPopup);
  }
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function validateForm(form, fields, config) {
  fields.forEach((field) => {
    field.addEventListener("keyup", (event) => {
      const value = event.target.value;

      if (config.isRequired && !value) {
        errorText.textContent = "Вы пропустили это поле";
      } else if (value.length > config.min && value.length < config.max) {
        console.log("Поле подходит под условие");
      } else {
        console.log("Поле не валидно");
      }
    });
  });
}

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    closePopup(event.target);
  });
});

popupCloseButtonImage.addEventListener("click", function () {
  closePopup(popupImage);
});

addCardButton.addEventListener("click", () => openPopup(popupNewPlace));

profileEditButton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = about.textContent;
  nameInput.addEventListener("keyup", (event) => {
    const value = event.target.value;

    if (!value) {
      errorText.textContent = "Вы пропустили это поле";
    } else if (value.length > 2 && value.length < 10) {
      console.log("Поле подходит под условие");
    } else {
      console.log("Поле не валидно");
    }
  });
});

formElementNewPlace.addEventListener("change", (event) => {});

popupCloseButtonProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupCloseButtonNewPlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

formElementProfile.addEventListener("submit", formSubmitHandlerProfile);

formElementNewPlace.addEventListener("submit", addPlace);
