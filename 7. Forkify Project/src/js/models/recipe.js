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
        const periods = Math.ceil(numIng / 3)
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cup', '']
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp']

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase() // uniform units
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i])
            })

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ') // remove parenthesis
            
            const arrIng = ingredient.split(' ')
            const unitIndex = arrIng.findIndex(el2 => {
                unitShort.includes(el2)
            })

            let obj
            if(unitIndex > -1) {
                const arrCount = arrIng().slice(0, unitIndex)
                let count
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'))
                }else {
                    count = eval(arrIng().slice(0, unitIndex).join('+'))
                }
                obj = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng().slice(unitIndex + 1).join(' ')
                }
            }else if(parseInt(arrIng[0], 10)) {
                obj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient = arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1) {
                obj = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return obj
        })
        this.ingredients = newIngredients
    }
}