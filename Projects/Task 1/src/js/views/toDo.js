import { elements } from './base'

export const getInput = () => {
    const todo = elements.input.value
    return todo
}

export const clearInput = () => {
    elements.input.value = ''
}

export const showError = () => {
    elements.errorText.innerText = 'Please Enter a ToDo Item! Gracias'
}

export const clearError = () => {
    elements.errorText.innerText = ''
}

export const renderToDo = (todo) => {
    const markup = `
        <li class="list-group-item d-flex align-items-center" data-id="${todo.id}">
            ${todo.desc}
            <span class="ml-auto">
                <button class="btn btn-outline-primary btn-small">^</button>
                <button class="btn btn-outline-danger btn-small">^</button>
            </span>
        </li>
    `
    elements.todoList.insertAdjacentHTML('beforeend', markup)
}

export const removeToDo = (id) => {
    const el = elements.todoList.querySelector(`li[data-id="${id}"`)
    el.parentNode.removeChild(el)
    elements.todoList.innerHTML = ''
    elements.inactiveTodo.innerHTML = ''
}

export const showRecentlyDeleted = (removedToDo) => {
    const markup = `
        <li class="list-group-item d-flex align-items-center" data-id="${removedToDo.todo.id}">
            ${removedToDo.todo.desc}
            <button class="btn btn-primary ml-auto">Undo</button>
        </li>
    `
    elements.inactiveTodo.insertAdjacentHTML('beforeend', markup)
}