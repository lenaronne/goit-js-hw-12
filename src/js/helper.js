export const loader = {
  addloader({ loader }) {
    loader.classList.remove('hidden');
  },
  delLoader({ loader }) {
    loader.classList.add('hidden');
  },
};
export const loadMore = {
  addloadMore(element) {
    element.classList.remove('hidden');
  },
  delLoadMore(element) {
    element.classList.add('hidden');
  },
};
export function scrollBy() {
  const element = document.querySelector('.gallery li');
  const result = element.getBoundingClientRect();
  const height = result.height * 2 + 24 * 3;

  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}
