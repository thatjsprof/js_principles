import Search from './models/search'
import Recipe from './models/recipe'
import List from './models/list'
import Likes from './models/likes'
import * as searchView from './views/searchview'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base'
import Likes from './models/likes'

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

            // console.log(state.recipe.ingredients)

            state.recipe.calcTime()

            state.recipe.calcServings()

            clearLoader()

            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            )
        }catch(err) {
            console.log(err)
        }
    }
}

['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, recipeSearch)
})

// LIST CONTROLLER
const controlList = () => {
    if(!state.list) state.list = new List()

    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient)
        listView.renderItem(item)
    })
}

// LIKES CONTROLLER
const controlLikes = () => {
    if(!state.likes) state.likes = new Likes()
    const current = state.recipe.id
    if(!state.likes.isLiked(current)) {
        const newLike = state.likes.addLike(
            current, 
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img
        )

        likesView.toggleLikeBtn(true)
        likesView.renderLike(newLike)
    }else {
        state.likes.deleteLike(current)
        likesView.toggleLikeBtn(false)
        likesView.deleteLike(current)
    }
}

window.addEventListener('load', e => {
    state.likes = new Likes()
    state.likes.readStorage()
    likesView.toggleLikesMenu(state.likes.getNumLikes())    
    state.likes.likes.forEach(like => likesView.renderLike(like))
})

elements.shopping.addEventListener('click', e => {
    const item = e.target.closest('.shopping__item').dataset.itemid
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id) // delete from state
        listView.deleteItem(id) // delete from UI
    }else if(e.target.matches('.shopping__count-value')) {
        const val = parseInt(e.target.value, 10)
        state.list.updateCount(id, val)
    }else if(e.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes()
    }
})

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) state.recipe.updateServings('dec')
    }else if(e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
    }else if(e.target.matched('.recipe_btn-add, .recipe__btn-add *')) {
        controlList()
    }
    state.recipe.updateServingsIngredient(state.recipe)
})