import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(breeds => {
    breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    Notiflix.Notify.failure('Error fetching breeds', error);
    showError();
  });

hideLoader();

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  showLoader();

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure('Error fetching cat by breed', error);
      showError();
      hideLoader();
    });
});

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <div class="wrapper">
    <div class="img-wrap">
    <img src="${cat.url}" alt="Cat" />
    </div>
    <div class="description-wrapper">
    <h2>${cat.breed}</h2>
    <p>${cat.description}</p>
    <p><span class="temperament">Temperament:</span> ${cat.temperament}</p>
    </div>
    </div>
  `;
}

function showLoader() {
  catInfo.innerHTML = '';
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}
