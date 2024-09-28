
// Functie om de spotlight te updaten met de geselecteerde film of serie
function updateSpotlight(category, index) {
    const spotlight = document.getElementById('spotlight');
    const title = document.getElementById('spotlight-title');
    const description = document.getElementById('spotlight-description');
    const categoryText = document.getElementById('category');

    // Verkrijg het juiste item op basis van de categorie en index
    const item = filmlijst[category][index];

    // Update de HTML-elementen met de data
    title.textContent = item.titel;
    description.textContent = item.description;
    categoryText.textContent = category === 'films' ? 'M O V I E' : 'S E R I E S';

    // Update de achtergrondafbeelding
    spotlight.style.backgroundImage = `url(${item.afbeelding})`;
}



// Functie om willekeurig een film of serie te selecteren
function getRandomSpotlight() {
    // Kies willekeurig tussen films of series
    const categories = ['films', 'series'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Kies een willekeurig item binnen die categorie
    const randomIndex = Math.floor(Math.random() * filmlijst[randomCategory].length);

    // Update de spotlight met het willekeurige item
    updateSpotlight(randomCategory, randomIndex);
}



// Functie om de carousel te vullen met films of series
function populateCarousel(category, containerId) {
    const container = document.getElementById(containerId);
    const items = filmlijst[category];


    items.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.innerHTML = `
            <img src="${item.afbeelding}" alt="${item.titel}">
            <p>${item.titel}</p>`
            ;
        container.appendChild(carouselItem);
    });
}

// Bij laden site, voer random spotlight en vul carousels
window.onload = function() {
    getRandomSpotlight();
    populateCarousel('films', 'movie-carousel');
    populateCarousel('series', 'series-carousel');
};

