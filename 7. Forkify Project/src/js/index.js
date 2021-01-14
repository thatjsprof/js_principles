import Search from './models/search'
import Recipe from './models/recipe'
import * as searchView from './views/searchview'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}

// SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getInput()
    // TESTING
    // const query = 'pizza'

    if(query) {
        const search = new Search(query) // create new search object

        renderLoader(elements.searchRes) // render the loader to the ui

        state.search = search // add new search to state

        searchView.clearInput() // clear input to prepare UI for results

        searchView.clearResults() // clear the recipes


        try {
            await state.search.getResults() // get recipes

            clearLoader() // clear the loader before presenting the results to the UI

            searchView.renderResults(state.search.results) // render search results to the UI
        }catch(err) {
            console.log(err)

            clearLoader() // clear the loader before presenting the results to the UI
        }
    }
}

// RECIPE CONTROLLER
const recipeSearch = async () => {
    
    const id = window.location.hash.replace('#', '')
    if(id) {
        const recipe = new Recipe(id)

        renderLoader(elements.recipe)

        state.recipe = recipe

        // TESTING
        // window.r = state.recipe
        if(state.search) searchView.highlightSelected(id)

        recipeView.clearResults()

        try {
            await state.recipe.getRecipe() // create new recipe

            console.log(state.recipe.ingredients)

            state.recipe.parseIngredients() // parse ingredients

            console.log(state.recipe.ingredients)

            state.recipe.calcTime()

            state.recipe.calcServings()

            clearLoader()

            recipeView.renderRecipe(state.recipe)
        }catch(err) {
            console.log(err)
        }
    }
}

['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, recipeSearch)
})

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

// window.addEventListener('load', e => {
//     e.preventDefault()
//     controlSearch()
// })

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        
        searchView.clearResults()
        searchView.renderResults(state.search.results, goToPage)
    }
})