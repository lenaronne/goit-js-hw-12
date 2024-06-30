import axios from 'axios';
export const params = new URLSearchParams({
  key: '44564788-7b6b025cc245aa7d761eb8e00',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
  // per_page: 150,
});

export async function getImages(params) {
  try {
    const res = await axios.get(params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
