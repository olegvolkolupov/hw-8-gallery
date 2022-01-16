import gallery from './gallery-items.js';

let ulRef = document.querySelector('.js-gallery');

// добавляем картинки на страницу
function fillPage() {
  let length = gallery.length;

  for (let i = 0; i < length; i++) {
    let li = document.createElement('li');
    li.classList.add('gallery__item');

    let a = document.createElement('a');
    a.classList.add('gallery__link');
    a.setAttribute('href', gallery[i].original);

    let img = document.createElement('img');
    img.classList.add('gallery__image');
    img.setAttribute('src', gallery[i].preview);
    img.setAttribute('data-source', gallery[i].original);
    img.setAttribute('alt', gallery[i].description);
    img.setAttribute('data-index', i);

    a.append(img);
    li.append(a);
    ulRef.append(li);
  }
}

fillPage();

// modalWindow-----------------------------

// модальное окно
let modalWindow = document.querySelector('.lightbox');
// крестик в уклу модального окна
const closeBtn = document.querySelector('.lightbox__button');
// пространство вокруг изображения
const backdropRef = document.querySelector('.lightbox__overlay');
// изображение в модальном окне
let bigImgRef = document.querySelector('.lightbox__image');
// индекс изображения, для next / previous
let idx;

// закрыть модальное окно
function closeModal() {
  modalWindow.classList.remove('is-open');
  window.removeEventListener('keydown', onWindowEvent);
  bigImgRef.setAttribute('src', '');
  bigImgRef.setAttribute('alt', '');
  closeBtn.removeEventListener('click', closeModal);
  backdropRef.removeEventListener('click', onBackDropClick);
}

function onWindowEvent(event) {
  if (event.code === 'Escape') {
    closeModal();
    return;
  }
  if (event.code === 'ArrowLeft') {
    idx -= 1;
    if (idx < 0) {
      idx = gallery.length - 1;
    }
  } else if (event.code === 'ArrowRight') {
    idx += 1;
    if (idx === gallery.length) {
      idx = 0;
    }
  }

  bigImgRef.setAttribute('src', gallery[idx].original);
  bigImgRef.setAttribute('alt', gallery[idx].description);
}

// click в главном окне галлереи
function openImg(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //   openModal(event.target.dataset);
  bigImgRef.setAttribute('src', event.target.dataset.source);
  bigImgRef.setAttribute('alt', event.target.alt);
  modalWindow.classList.add('is-open');
  idx = Number(event.target.dataset.index);

  closeBtn.addEventListener('click', closeModal);
  backdropRef.addEventListener('click', onBackDropClick);
  window.addEventListener('keydown', onWindowEvent);
}

// click на пространстве вокруг изображения
function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

ulRef.addEventListener('click', openImg);
