const option = document.querySelector('.select');
const catInfo = document.querySelector('.cat-info');
const noBreed = document.querySelector('.no-breed');
const loader = document.querySelector('.loader');

function fetchBreeds() {
    const apiUrl = 'https://api.thecatapi.com/v1/breeds?api_key=live_feUtuyDyUv6ZvoLkPhW6HIBw8XpNE2evUEZNW4BRdaEd3zXO8ZdZ1LPbZeCTS7ok';

    fetch(apiUrl)
        .then(response => response ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            data.forEach(breed => {
                option.innerHTML += `<option value=${breed.reference_image_id}> ${breed.name} </option>`;
            });
            console.log(data);
        })
        .catch(error => {
            catInfo.innerHTML = `<p class="error"> ${error} </p>`;
            console.error('Error:', error);
        })
        .finally(() => loader.style.display = 'none');
}

fetchBreeds();

option.addEventListener('change', event => {
    const id = event.target.value;
    loader.style.display = 'inline-block';
    noBreed.style.display = 'none';
    catInfo.innerHTML = '';

    fetch(`https://api.thecatapi.com/v1/images/${id}`)
        .then(response => response ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            loader.style.display = 'none';
            console.log(data);
            catInfo.innerHTML = `
                <img class="cat-info__cat-image" src=${data.url} alt=""/>
                <div class="cat-description">
                    <h2 class="cat-description__cat-breed">${data.breeds[0].name} </h2>
                    <p class="cat-description__cat-temperament">${data.breeds[0].description} </p>
                    <h3 class="cat-description__cat-temperament"> Temperament </h3>
                    <p class="cat-description__cat-temperament"> ${data.breeds[0].temperament} </p>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching image:', error));
});