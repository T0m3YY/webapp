document.querySelector('a[href="#search"]').onclick = () => {
    document.querySelectorAll('.overlay, .search-container').forEach(el => el.classList.toggle('hidden'));
};

document.querySelector('.overlay').onclick = () => {
    document.querySelectorAll('.overlay, .search-container').forEach(el => el.classList.add('hidden'));
};

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // voorkomt dat de pagina wordt opgeslagen
        document.querySelectorAll('.overlay, .search-container').forEach(el => el.classList.toggle('hidden'));
    }
});