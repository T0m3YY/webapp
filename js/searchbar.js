// Functie voor het openen en sluiten van de zoekbalk
document.querySelector('a[href="#search"]').onclick = () => {
    document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.toggle('hidden'));
};

// Sluit de zoekbalk wanneer je buiten de zoekbalk klikt
document.querySelector('.overlay-searchbar').onclick = () => {
    document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.add('hidden'));
};

// Ctrl + S toetscombinatie om de zoekbalk te openen
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // voorkomt dat de pagina wordt opgeslagen
        document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.toggle('hidden'));
    }
});

// Variabele om de huidige zoekresultaten op te slaan
let currentResults = {}; // We maken deze variabele aan om later te gebruiken voor filtering

// Event listener voor de zoekbalk, voert de zoekopdracht uit wanneer 'Enter' wordt ingedrukt
document.querySelector('.search-bar').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.toLowerCase(); // Haal de zoekterm op en zet om naar lowercase
        filterResults(searchTerm); // Voer de zoekopdracht uit

        // Verberg de zoekbalk en de overlay zodra de zoekopdracht is ingediend
        document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.add('hidden'));
    }
});

// Functie om films/series te filteren op basis van de zoekterm
function filterResults(searchTerm) {
    let results = {
        films: [],
        series: []
    };

    // Zoek in films
    filmlijst.films.forEach(film => {
        if (matchesSearchTerm(film, searchTerm)) {
            results.films.push(film);
        }
    });

    // Zoek in series
    filmlijst.series.forEach(serie => {
        if (matchesSearchTerm(serie, searchTerm)) {
            results.series.push(serie);
        }
    });

    // Sla de huidige zoekresultaten op in de variabele 'currentResults'
    currentResults = results; // Hiermee kunnen we later filteren tussen films en series

    // Toon alle resultaten (films en series)
    displayAllResults(results);
}

// Functie om te controleren of een film/serie overeenkomt met de zoekterm
function matchesSearchTerm(item, searchTerm) {
    return (
        item.titel.toLowerCase().includes(searchTerm) || // Vergelijk titel
        item.description.toLowerCase().includes(searchTerm) || // Vergelijk beschrijving
        item.cast.toLowerCase().includes(searchTerm) || // Vergelijk cast
        item.maker.toLowerCase().includes(searchTerm) || // Vergelijk maker
        item.Genre.some(genre => genre.toLowerCase().includes(searchTerm)) // Vergelijk genres
    );
}

// Functie om alle zoekresultaten te tonen
function displayAllResults(results) {
    const main = document.querySelector('main');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsGrid = document.getElementById('search-results');

    // Verberg de normale content (spotlight, carousels)
    main.classList.add('hidden');

    // Leeg de huidige zoekresultaten container
    searchResultsGrid.innerHTML = '';

    // Toon zoekresultaten voor films en series
    results.films.forEach(film => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('carousel-item');
        resultItem.innerHTML = `
            <img src="${film.afbeelding}" alt="${film.titel}">
            <p>${film.titel}</p>
        `;
        resultItem.onclick = () => showInfoPopup(film);
        searchResultsGrid.appendChild(resultItem);
    });

    results.series.forEach(serie => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('carousel-item');
        resultItem.innerHTML = `
            <img src="${serie.afbeelding}" alt="${serie.titel}">
            <p>${serie.titel}</p>
        `;
        resultItem.onclick = () => showInfoPopup(serie);
        searchResultsGrid.appendChild(resultItem);
    });

    // Als er geen resultaten zijn, toon een bericht
    if (results.films.length === 0 && results.series.length === 0) {
        searchResultsGrid.innerHTML = '<p>Geen resultaten gevonden.</p>';
    }

    // Toon de zoekresultaten container
    searchResultsContainer.classList.remove('hidden');
}

// Functie om gefilterde films te tonen
function displayFilteredMovies() {
    const searchResultsGrid = document.getElementById('search-results');
    searchResultsGrid.innerHTML = ''; // Maak de container leeg

    // Voeg alleen films toe aan de zoekresultaten
    currentResults.films.forEach(film => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('carousel-item');
        resultItem.innerHTML = `
            <img src="${film.afbeelding}" alt="${film.titel}">
            <p>${film.titel}</p>
        `;
        resultItem.onclick = () => showInfoPopup(film);
        searchResultsGrid.appendChild(resultItem);
    });

    if (currentResults.films.length === 0) {
        searchResultsGrid.innerHTML = '<p>Geen films gevonden.</p>';
    }
}

// Functie om gefilterde series te tonen
function displayFilteredSeries() {
    const searchResultsGrid = document.getElementById('search-results');
    searchResultsGrid.innerHTML = ''; // Maak de container leeg

    // Voeg alleen series toe aan de zoekresultaten
    currentResults.series.forEach(serie => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('carousel-item');
        resultItem.innerHTML = `
            <img src="${serie.afbeelding}" alt="${serie.titel}">
            <p>${serie.titel}</p>
        `;
        resultItem.onclick = () => showInfoPopup(serie);
        searchResultsGrid.appendChild(resultItem);
    });

    if (currentResults.series.length === 0) {
        searchResultsGrid.innerHTML = '<p>Geen series gevonden.</p>';
    }
}

// Functie om alles te resetten naar de volledige resultaten
function clearFilters() {
    displayAllResults(currentResults); // Toon opnieuw alle resultaten
}

// Event listener voor de Movies-filterknop
document.getElementById('filter-movies').addEventListener('click', function() {
    displayFilteredMovies();
});

// Event listener voor de Series-filterknop
document.getElementById('filter-series').addEventListener('click', function() {
    displayFilteredSeries();
});

// Event listener voor de Clear-filterknop
document.getElementById('filter-clear').addEventListener('click', function() {
    clearFilters(); // Reset de filters en toon alle resultaten
});

// Event listener voor de home link
document.querySelector('a[href="#home"]').onclick = () => {
    const main = document.querySelector('main');
    const searchResultsContainer = document.getElementById('search-results-container');

    // Verberg de zoekresultaten
    searchResultsContainer.classList.add('hidden');

    // Toon de hoofdinformatie weer
    main.classList.remove('hidden');
};
