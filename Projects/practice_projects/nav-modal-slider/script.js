const navButton = document.querySelector('.header__nav').addEventListener('click', showNavigation)

function showNavigation(e) {
    document.body.classList.toggle('sidenav')
}