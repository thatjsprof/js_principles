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

export const clearTodo = () => {
    elements.todoList.innerHTML = ''
}

export const clearInactive = () => {
    elements.inactiveTodo.innerHTML = ''
}

export const clearButtons = () => {
    elements.buttons.innerHTML = ''
}

const createButton = (page, type) => {
    return `
        <button class="btn btn-outline-info todos__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <span class="fa fa-arrow-${type === 'prev' ? 'left' : 'right'}"></span>
        </button>
    `
}

const renderButtons = (page, deletedTodos, result_per_page) => {
    const pages = Math.ceil(deletedTodos / result_per_page)

    let button
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next')
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    } else if (page === pages && page > 1) {
        button = createButton(page, 'prev')
    }

    if (button) elements.buttons.insertAdjacentHTML('afterbegin', `<br>${button}`)
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

export const renderDeletedTodo = (deletedTodos, page = 1, result_per_page = 5) => {
    const start = (page - 1) * result_per_page
    const end = page * result_per_page
    deletedTodos.slice(start, end).forEach(showRecentlyDeleted)
    renderButtons(page, deletedTodos.length, result_per_page)
}