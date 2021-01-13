import axios from 'axios'
import { key } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`)
            this.title = res.data.title
            this.publisher = 'David Ajayi'
            this.image = res.data.image
            this.url = res.data.sourceUrl
            this.ingredients = res.data.extendedIngredients
        }catch(err) {
            console.log(err)
        }
    }

    calcTime() {
        const numIng = this.ingredients.length
    }
}