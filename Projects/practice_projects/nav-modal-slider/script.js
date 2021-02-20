const navButton = document.querySelector('.header__nav').addEventListener('click', showNavigation)

const modal = document.querySelector('.modal')

const button = document.querySelector('.btn--modal').addEventListener('click', () => {
    modal.classList.add('show-modal')
})

function showNavigation(e) {
    document.body.classList.toggle('sidenav')
}

window.addEventListener('click', (e) => {
    e.target === modal ? modal.classList.remove('show-modal') : ''
})