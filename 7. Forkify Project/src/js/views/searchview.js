import {elements} from './base'

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">David</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

const limitRecipeTitle = (title, limit = 17) => {
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

export const getInput = () => {
    return elements.searchInput.value
}

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
    elements.searchResPages.innerHTML = ''
}

const createButton = (page, type) => {
    return `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)

    let button
    if(page === 1 && pages > 1) {
        button = createButton(page, 'next')
    }else if(page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }else if(page === pages && pages > 1){
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (recipes, page = 1, resPerPage = 7) => {
    const start = (page - 1) * resPerPage
    const end = page * resPerPage
    recipes.slice(start, end).forEach(renderRecipe)
    renderButtons(page, recipes.length, resPerPage)
}