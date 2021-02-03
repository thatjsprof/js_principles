export default class {
    constructor() {
        this.todos = []
        this.deletedTodos = []
    }

    addTodo(desc) {
        const newToDo = {
            desc,
            id: `#${Math.round(Math.random() * 100000)}`,
            completed: false
        }
        this.todos.push(newToDo)
        this.persistDataTodo()
        return newToDo
    }

    removeToDo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id)
        const todo = this.todos.splice(index, 1)[0]
        this.persistDataTodo()
        this.addDeletedTodo({
            todo
        })
    }

    addDeletedTodo(todo) {
        this.deletedTodos.push(todo)
        this.persistDataRemovedTodo()
    }

    restoreTodo(id) {
        const index = this.deletedTodos.findIndex((todo) => todo.todo.id === id)
        const todo = this.deletedTodos.splice(index, 1)[0]
        this.todos.push(todo.todo)
        this.persistDataTodo()
        this.persistDataRemovedTodo()
    }

    deleteAll() {
        this.deletedTodos = []
        this.persistDataRemovedTodo()
    }

    toggleCompleted(id) {
        let todo = this.todos.find((todo) => todo.id === id)
        todo.completed = (todo.completed) ? false : true
        this.persistDataTodo()
    }

    persistDataTodo() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    persistDataRemovedTodo() {
        localStorage.setItem('remtodos', JSON.stringify(this.deletedTodos))
    }

    readStorage() {
        const todos = JSON.parse(localStorage.getItem('todos'))
        const deletedTodos = JSON.parse(localStorage.getItem('remtodos'))
        this.todos = todos ? todos: []
        this.deletedTodos = deletedTodos ? deletedTodos: []
    }
}