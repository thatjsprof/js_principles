import ToDo from './models/toDo'
import * as t from './views/toDo'
import { elements } from './views/base'

const state = {}

window.state = state

const controlToDo = (e) => {
    e.preventDefault()
    if(!state.todo) {
        const todo = new ToDo() // create new instance of todo
        state.todo = todo // store todo to state
    } 
    const input = t.getInput() // get input
    if (input !== '') {
        const newToDo = state.todo.addTodo(input) // add new todo to list
        t.clearInput() // clear input field
        t.renderToDo(newToDo) // render new todo
    } else {
        t.showError()
    }
}

const deleteToDo = (e) => {
    const id = e.target.parentNode.parentNode.dataset.id
    if (id) {
        state.todo.removeToDo(id)
        t.removeToDo(id)
        readStorage()
    }
}

const readStorage = () => {
    state.todo.readStorage()
    state.todo.todos.forEach((todo) => t.renderToDo(todo))
    state.todo.deletedTodos.forEach((todo) => t.showRecentlyDeleted(todo))
}
elements.addBtn.addEventListener('click', controlToDo)

elements.input.addEventListener('focus', () => {
    t.clearError()
})

elements.todoList.addEventListener('click', deleteToDo)

window.addEventListener('load', e => {
    state.todo = new ToDo()
    readStorage()
})