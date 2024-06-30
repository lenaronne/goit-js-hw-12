import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
function renderGallery(data, tagToInsert) {
  tagToInsert.insertAdjacentHTML('beforeend', markup(data));
  lightbox.refresh();
}
function markup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li>
                <a href="${largeImageURL}"><img src='${webformatURL}' alt='${tags}'></a>
                <div class="content">
                    <div class="item"><h3>Likes</h3><p>${likes}</p></div>
                    <div class="item"><h3>Views</h3><p>${views}</p></div>
                    <div class="item"><h3>Comments</h3><p>${comments}</p></div>
                    <div class="item"><h3>Downloads</h3><p>${downloads}</p></div>
                </div>
            </li>`
    )
    .join('');
}
export default renderGallery;
