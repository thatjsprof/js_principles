import ToDo from './models/todo'
import toDoView from './views/toDoView'
import { elements } from './views/base'

const state = {}
window.state = state

const controlToDo = () => {
    const newToDo = toDoView.getInput() // get todo input
    console.log(newToDo)

    const todo = new ToDo() // create new todo object

    state.todo = todo // assign new todo object to state
    
    state.todo.addNewToDo(newToDo.title, newToDo.category) // add new todo to todos array

    toDoView.renderToDo(newToDo) // render new todo to the UI
}

elements.todoButton.addEventListener('click', controlToDo)