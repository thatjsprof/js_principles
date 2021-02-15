const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')
const swapButton = document.querySelector('#swap-rate')
const rateElement = document.querySelector('#rate-element')

function ApiCalls(currencyOne, currencyTwo) {
    this.currencyOne = currencyOne
    this.currencyTwo = currencyTwo
    this.queryApi = function () {
        const query = `https://api.exchangerate-api/v4/latest/${this.currencyOne}`
        new Promise((resolve) => {
            resolve(fetch(query))
        }).then((res) => {
            return res.json()
        }).then((data) => {
            const rate = data.rates[this.currencyTwo]
            return rate
        }).catch(() => {
            throw new Error('Could not make call to api')
        })
    }
}

function computeConversion() {
    const apiCall = new ApiCalls(currencyOne.value, currencyTwo.value)
    const rate = apiCall.queryApi()
    rateElement.innerText = `${amountOne.value} ${currencyOne.value} = ${rate} ${currencyTwo.value}`
    amountTwo.value = (amountOne.value * rate).toFixed(2)
}

function swapCurrency() {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    computeConversion()
}

function setUpEventListeners() {
    [currencyOne, currencyTwo].forEach((el) => el.addEventListener('change', computeConversion))
    amountOne.addEventListener('input', computeConversion)
    amountTwo.addEventListener('input', computeConversion)
    swapButton.addEventListener('click', swapCurrency)
}

setUpEventListeners()