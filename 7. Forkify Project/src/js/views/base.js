export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    list: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}

export const elementStrings = {
    loader: 'loader',
    linkActive: 'results__link--active'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if(loader) {
        loader.parentElement.removeChild(loader)
    }
}

export const limitTitle = (title, limit = 17) => {
    const newTitle = []
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) newTitle.push(cur)
            return acc + cur.length
        }, 0)
        return `${newTitle.join(' ')} ...`
    }
    return title
}