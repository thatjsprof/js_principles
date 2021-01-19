import { elements } from './base'

export const getInput = () => {
    const { todoTitle, todoCategory } = elements
    return {
        todoTitle,
        todoCategory
    }
}

export const renderToDo = (todo) => {
    const markup = `
        <li class="todo-items">
            <a class="todo-items--item">
                ${todo.title}
            </a>
        </li>
    `

    elements.todoList.insertAdjacentHTML('beforeend', markup)
}