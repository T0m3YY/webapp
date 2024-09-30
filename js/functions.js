// Functie om de spotlight te updaten met de geselecteerde film of serie
function updateSpotlight(category, index) {
    const spotlight = document.getElementById('spotlight');
    const title = document.getElementById('spotlight-title');
    const description = document.getElementById('spotlight-description');
    const categoryText = document.getElementById('category');

    // Verkrijg het juiste item op basis van de categorie en index
    var item = filmlijst[category][index];

    // Update de HTML-elementen met de data
    title.textContent = item.titel;
    description.textContent = item.description;
    categoryText.textContent = category === 'films' ? 'M O V I E' : 'S E R I E S';

    // Update de achtergrondafbeelding
    spotlight.style.backgroundImage = `url(${item.afbeelding})`;

    const moreInfoButton = document.getElementById('btn-more-info');
    moreInfoButton.onclick = () => showInfoPopup(item);
}

// Functie om willekeurig een film of serie te selecteren
function getRandomSpotlight() {
    const categories = ['films', 'series'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomIndex = Math.floor(Math.random() * filmlijst[randomCategory].length);
    updateSpotlight(randomCategory, randomIndex);
}

// Event listener voor het openen van de info-popup
function showInfoPopup(item) {
    const popup = document.getElementById('info-popup');
    const overlay = document.querySelector('.overlay-info');
    const infoImageContainer = document.getElementById('info-image-container');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const infoCast = document.getElementById('info-cast');
    const infoMaker = document.getElementById('info-maker');
    const infoGenre = document.getElementById('info-genre');

    // Vul de popup met de item data
    infoImageContainer.style.backgroundImage = `url(${item.afbeelding})`;
    infoTitle.textContent = item.titel;
    infoDescription.textContent = item.description;
    infoCast.textContent = item.cast;
    infoMaker.textContent = item.maker;
    infoGenre.textContent = item.Genre.join(", ");

    // Toon de overlay en popup
    overlay.classList.remove('hidden');
    popup.classList.add('show');
}

// Event listener om de popup te sluiten bij klik buiten de content
document.querySelector('.overlay-info').onclick = () => {
    const popup = document.getElementById('info-popup');
    const overlay = document.querySelector('.overlay-info');
    
    // Verberg de popup en de overlay
    popup.classList.remove('show');
    overlay.classList.add('hidden');
};

// Functie om de carousel te vullen met films of series
function populateCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    const items = filmlijst[category];

    items.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        carouselItem.innerHTML = `
            <img src="${item.afbeelding}" alt="${item.titel}">
            <p>${item.titel}</p>
        `;

        // Voeg een click event toe om de info popup te tonen
        carouselItem.onclick = () => showInfoPopup(item);
        container.appendChild(carouselItem);
    });
}

// Bij laden site, voer random spotlight en vul carousels
window.onload = function() {
    getRandomSpotlight();
    populateCarousel('films', 'movie-carousel');
    populateCarousel('series', 'series-carousel');
};
