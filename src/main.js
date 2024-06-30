import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { params, getImages } from './js/pixabay-api';
import renderGallery from './js/render-functions';
import { loader, loadMore, scrollBy } from './js/helper.js';

const refs = {
  form: document.querySelector('#form-request'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnEl: document.querySelector('button[data-action=submit]'),
  btnLoad: document.querySelector('button[data-action=load-more]'),
};
const errors = {
  emptyHits: "We're sorry, but you've reached the end of search results.",
  userTextEmpty: 'Search field must be filled',
  invalidRequest:
    'Sorry, there are no images matching your search query. Please try again!',
};
refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  const userText = e.target.query.value.trim();
  if (!userText) {
    iziToast.warning({
      title: 'Attention!',
      message: errors.userTextEmpty,
      messageSize: '16',
      position: 'topRight',
      close: false,
      displayMode: 1,
    });
    return;
  }
  params.set('q', userText);
  params.set('page', 1);
  loader.addloader(refs);

  const userUrl = 'https://pixabay.com/api/?' + params;
  try {
    const data = await getImages(userUrl);
    let currentPage = params.get('page');
    const limit = Math.ceil(data.totalHits / params.get('per_page'));
    if (currentPage < limit) {
      loadMore.addloadMore(refs.btnLoad);
    } else {
      loadMore.delLoadMore(refs.btnLoad);
    }
    if (!data.totalHits) {
      throw new Error(errors.invalidRequest);
    }
    refs.gallery.innerHTML = '';
    renderGallery(data, refs.gallery);
  } catch (error) {
    // console.log(error);
    iziToast.error({
      title: 'Error!',
      message: error.message,
      messageSize: '16',
      position: 'topRight',
      close: false,
      displayMode: 1,
    });
  }
  // e.target.reset();
  loader.delLoader(refs);
});
refs.btnLoad.addEventListener('click', async e => {
  e.preventDefault();
  loader.addloader(refs);
  let currentPage = params.get('page');
  params.set('page', ++currentPage);

  const userUrl = 'https://pixabay.com/api/?' + params;
  try {
    const data = await getImages(userUrl);
    if (!data.totalHits) {
      throw new Error(errors.invalidRequest);
    }
    const limit = Math.ceil(data.totalHits / params.get('per_page'));
    // console.log(currentPage, limit, currentPage >= limit);
    renderGallery(data, refs.gallery);
    scrollBy();
    if (currentPage >= limit) {
      loadMore.delLoadMore(refs.btnLoad);
      throw new Error('No more pages');
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error!',
      message: errors.emptyHits,
      messageSize: '16',
      position: 'topRight',
      close: false,
      displayMode: 1,
    });
  }
  e.target.reset;
  loader.delLoader(refs);
});
