import axios from 'axios'
import {key} from '../config'

export default class Search {
    constructor(query) {
        this.query = query
    }

    async getResults() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}`)
            this.results = res.data.results
            return this.results
        }catch(err) {
            console.log(err)
        }
    }
}