import NumGenerator from './models/numGenerator'
import * as numView from './views/numView'

const state = {}
window.state = state

const controlView = () => {
    const numGen = new NumGenerator(500)
    state.numbers = numGen
    numView.showNumbers(state.numbers.returnArray())
}

window.addEventListener('load', controlView)