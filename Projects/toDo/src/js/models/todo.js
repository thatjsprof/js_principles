export default class ToDo {
    constructor() {
        this.todos = []
    }

    addNewTodo(title, category) {
        const newToDo = {
            title,
            category
        }
        this.todos.push(newToDo)
    }

    removeToDo(id) {
        const index = this.todos.findIndex(todo => todo.id === id)
        this.todos.splice(index, 1)
    }
}