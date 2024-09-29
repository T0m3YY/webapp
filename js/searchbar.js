document.querySelector('a[href="#search"]').onclick = () => {
    document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.toggle('hidden'));
};

document.querySelector('.overlay-searchbar').onclick = () => {
    document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.add('hidden'));
};

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // voorkomt dat de pagina wordt opgeslagen
        document.querySelectorAll('.overlay-searchbar, .search-container').forEach(el => el.classList.toggle('hidden'));
    }
});