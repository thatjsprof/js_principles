var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = this.value
    }
    
    var Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = this.value
    }

    var allExpenses = []
    var allIncomes = []
    var totalExpenses = 0

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
})()

var UIController = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).vaue,
                desc: document.querySelector(DOMStrings.inputDescription).vaue,
                value: document.querySelector(DOMStrings.inputValue).vaue
            }
        },
        getDOMStrings: function() {
            return DOMStrings
        }
    }
})()

var controller = (function(budgetCtr, UICtr) {
    var DOM = UICtr.getDOMStrings()

    var ctrAddItem = function() {
        var input = UICtr.getInput()
    }

    var setUpEventListeners = function() {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrAddItem)
        document.addEventListener('keypress', function(e) {
            if(e.keyCode == 13 || e.which === 13) ctrAddItem()
        })
    }

    return {
        init: function() {
            console.log('Application started')
            setUpEventListeners()
        }
    }
})(budgetController, UIController)

controller.init()