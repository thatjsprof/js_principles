import ToDo from './models/toDo'
import * as t from './views/toDo'
import { elements } from './views/base'

const state = {}

window.state = state

const controlToDo = (e) => {
    e.preventDefault()
    if(!state.todo) {
        const todo = new ToDo()
        state.todo = todo
    } 
    const input = t.getInput()
    if (input !== '') {
        const newToDo = state.todo.addTodo(input)
        t.clearInput()
        t.renderToDo(newToDo)
        checkStatus()
    } else {
        t.showError()
    }
}

const deleteToDo = (e) => {
    const id = e.target.closest('.list-group-item').dataset.id
    if (id && e.target.matches('.delete-btn, .delete-btn *')) {
        state.todo.removeToDo(id)
        handle()
    }
    if (id && e.target.matches('.complete-btn, .complete-btn *')) {
        state.todo.toggleCompleted(id)
        handle()
    }
}

const restoreTodo = (e) => {
    const id = e.target.parentNode.dataset.id
    if (id) {
        state.todo.restoreTodo(id)
        handle()
    }
}

const deleteAll = () => {
    state.todo.deleteAll()
    handle()
}

const readStorage = () => {
    state.todo.readStorage()
    state.todo.todos.forEach((todo) => t.renderToDo(todo))
    state.todo.deletedTodos.forEach((todo) => t.showRecentlyDeleted(todo))
    checkStatus()
}

const checkStatus = () => {
    if (state.todo.todos.length === 0) {
        elements.actTodo.classList.remove('d-none')
    } else {
        elements.actTodo.classList.add('d-none')
    }
    if (state.todo.deletedTodos.length === 0) {
        elements.delTodo.classList.remove('d-none')
        elements.deleteAll.classList.add('d-none')
    } else {
        elements.delTodo.classList.add('d-none')
        elements.deleteAll.classList.remove('d-none')
    }
}

const handle = () => {
    t.clear()
    readStorage()
}

(function() {
    elements.addBtn.addEventListener('click', controlToDo)

    elements.input.addEventListener('focus', () => {
        t.clearError()
    })

    elements.todoList.addEventListener('click', deleteToDo)

    elements.deleteAll.addEventListener('click', deleteAll)

    elements.inactiveTodo.addEventListener('click', restoreTodo)

    window.addEventListener('load', e => {
        state.todo = new ToDo()
        readStorage()
    })
})()