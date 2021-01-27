import { elements } from './base'

export const showNumbers = (numbers) => {
    numbers.forEach(number => {
        const markdown = `
            <li class="numbers-box--item">${number}</li>
        `
        elements.numbersBox.insertAdjacentHTML('beforeend', markdown)
    })
}
