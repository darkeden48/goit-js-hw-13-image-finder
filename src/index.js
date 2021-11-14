import './sass/main.scss';

export default function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMore: document.querySelector('[data-action="load-more"]'),
  };
};

import imgTemp from './templates/imgTemp.hbs';
const refs = getRefs();

import PixabayApiService from './js/apiService';
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.galleryList.addEventListener('click', openLargeImage);
refs.loadMore.style.display = 'none';

function onSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';

  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query === '') {
    return error({
      text: 'Enter text!',
      delay: 300,
    });
  }

  clearHitsContainer();
  pixabayApiService.resetPage();
  pixabayApiService.fetchPhotos().then(appendImgMarkup);
}
function onLoadMore() {
  pixabayApiService.fetchPhotos().then(appendImgMarkup);
}

function appendImgMarkup(image) {
  refs.loadMore.style.display = 'block';
  refs.galleryList.insertAdjacentHTML('beforeend', imgTemp(image));
  scrollInto();
}
function clearHitsContainer() {
  refs.galleryList.innerHTML = '';
}

function scrollInto() {
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
