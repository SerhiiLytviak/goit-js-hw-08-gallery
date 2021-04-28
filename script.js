import gallery from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryMarkUp = createGalleryMarkUp(gallery);
const ligthbox = document.querySelector("div.lightbox");
const modalCloseButton = document.querySelector(
  '[data-action="close-lightbox"]'
);
const modalImg = document.querySelector(".lightbox__image");
const ligthboxOverlay = document.querySelector(".lightbox__overlay");

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkUp);
galleryContainer.addEventListener("click", onOpenModal);
modalCloseButton.addEventListener("click", onCloseModal);
ligthboxOverlay.addEventListener("click", onLightboxOverlayClick);

function createGalleryMarkUp(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
        href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
};

function onOpenModal(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  };

  ligthbox.classList.add("is-open");

  modalImg.src = evt.target.dataset.source;
  modalImg.alt = evt.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
};

function onCloseModal() {
  ligthbox.classList.remove("is-open");

  modalImg.src = '';
  modalImg.alt = '';

  window.removeEventListener('keydown', onEscKeyPress);
};

function onLightboxOverlayClick() {
//  у меня работает без этой штуки if (event.currentTarget === event.target){}
  onCloseModal();
};

function onEscKeyPress(event) {
  const isEscCode = event.code === 'Escape';

  if (isEscCode) {
    onCloseModal();
  };
  
};

