
let currentCategory = "";

// Functie om de spotlight te updaten met de geselecteerde film of serie
function updateSpotlightMS(currentCategory, index) {
  const spotlight = document.getElementById('spotlight');
  const title = document.getElementById('spotlight-title');
  const description = document.getElementById('spotlight-description');
  const categoryText = document.getElementById('category');

  // Verkrijg het juiste item op basis van de categorie en index
  var item = filmlijst[currentCategory][index];

  // Update de HTML-elementen met de data
  title.textContent = item.titel;
  description.textContent = item.description;
  categoryText.textContent = currentCategory === 'films' ? 'M O V I E' : 'S E R I E S';

  // Update de achtergrondafbeelding
  spotlight.style.backgroundImage = `url(${item.afbeelding})`;

  const moreInfoButton = document.getElementById('btn-more-info');
  moreInfoButton.onclick = () => showInfoPopup(item);
}


// Functie om willekeurig een film of serie te selecteren
function getRandomSpotlightMS() {
    const randomIndex = Math.floor(Math.random() * filmlijst[currentCategory].length);
    updateSpotlightMS(currentCategory, randomIndex);
}





// Functie om een specifieke genre-carousel te vullen
function populateGenreCarousel(currentCategory, genreTitle, carouselContainer) {
  carouselContainer.innerHTML = '';

  const items = filmlijst[currentCategory].filter(item =>
    item.Genre.map(g => g.toLowerCase()).includes(genreTitle)
  );

  const nIndices = assignNToItems(items.length); // Bepaal de items met een "N" logo

  if (items.length > 0) {
    items.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      const nTag = nIndices.includes(index) ? '<b class="logo-N">N</b>' : '';

      carouselItem.innerHTML = `
        ${nTag} <!-- Voeg het "N" logo toe hier -->
        <img src="${item.afbeelding}" alt="${item.titel}">
        <p>${item.titel}</p>
      `;
      carouselItem.onclick = () => showInfoPopup(item);
      carouselContainer.appendChild(carouselItem);
    });
  } else {
    carouselContainer.innerHTML = `<p>No ${currentCategory} available in this genre.</p>`;
  }
}

// Functie om de carousels dynamisch te vullen met genres
function populateGenreCarousels(currentCategory) {
  const mainContainer = document.querySelector('.mainCarousels'); // Fixed the selector to '.carousel' (.... bruh de . vergeten)
  mainContainer.innerHTML = '';

  const genres = Array.from(new Set(filmlijst[currentCategory].flatMap(item => item.Genre)));


  genres.forEach(genre => {
    const section = document.createElement('section');
    section.classList.add('genre-container', 'carousel');
    
    section.innerHTML = `
      <h2>${genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
      <div class="carousel-container"></div>
    `;

    mainContainer.appendChild(section);

    const carouselContainer = section.querySelector('.carousel-container');
    populateGenreCarousel(currentCategory, genre.toLowerCase(), carouselContainer);
  });
}




