import Search from './models/search'
import Recipe from './models/recipe'
import * as searchView from './views/searchview'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}

// SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getInput()

    if(query) {
        const search = new Search(query) // create new search object

        state.search = search // add new search to state

        await state.search.getResults() // get recipes

        searchView.clearInput() // clear input to prepare UI for results

        searchView.clearResults() // clear the recipes

        renderLoader(elements.searchRes) // render the loader to the ui

        clearLoader() // clear the loader before presenting the results to the UI

        searchView.renderResults(state.search.results) // render search results to the UI
    }
}

// RECIPE CONTROLLER
const recipeSearch = async () => {
    const recipe = new Recipe(654959)
    state.recipe = recipe
    await state.recipe.getRecipe()
    console.log(state.recipe)
}

recipeSearch()

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        
        searchView.clearResults()
        searchView.renderResults(state.search.results, goToPage)
    }
})