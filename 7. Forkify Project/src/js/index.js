import Search from './models/search'
import * as searchView from './views/searchview'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}

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

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})