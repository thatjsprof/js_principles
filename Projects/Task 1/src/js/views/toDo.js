import { elements, clearLists } from './base'

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
            ${todo.completed ? `<del>${todo.desc}</del>` : `${todo.desc}`}
            <span class="ml-auto">
                <button class="btn btn-outline-primary btn-small complete-btn"><span class="fa fa-check"></span></button>
                <button class="btn btn-outline-danger btn-small delete-btn"><i class="fa fa-trash"></i></button>
            </span>
        </li>
    `
    elements.todoList.insertAdjacentHTML('beforeend', markup)
}

export const clear = () => {
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