import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_yHGv7HZ0xJ6i0soooxb0k7Z4N60t0TfUSx9W1EYE45GpnYrrg1nl8WYFfRTCoUtQ';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => {
    const catData = response.data[0];
    return {
      breed: catData.breeds[0].name,
      description: catData.breeds[0].description,
      temperament: catData.breeds[0].temperament,
      url: catData.url,
    };
  });
}
