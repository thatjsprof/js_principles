import {elements} from './base'

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit) {
        // 
    }else {
        // 
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
}

export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe)
}