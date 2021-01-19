import uniqid from 'uniqid'

export default class List {
    constructor(){
        this.items = []
    }

    addItem(count, unit, ingredient) {
        this.items.push({
            id: uniqid(),
            count,
            unit,
            ingredient
        })
    }

    getItems() {
        return this.items
    }

    deleteItem(id) {
        const index = this.items.findIndex(cur => {
            return cur.id === id
        })

        this.items.splice(index, 1)
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount
    }
}