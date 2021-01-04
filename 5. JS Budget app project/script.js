var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
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

    return {
        addItem: function(type, description, value) {
            var newItem, ID
            
            if(data.allItems[type].length > 0) ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            else ID = 0

            if(type === 'exp') {
                newItem = new Expense(ID, description, value)
            }else if(type === 'inc') {
                newItem = new Income(ID, description, value)
            }

            data.allItems[type].push(newItem)
            return newItem
        },
        testing: function() {
            return data
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
                type: document.querySelector(DOMStrings.inputType).value,
                desc: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
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
        var input, newItem

        input = UICtr.getInput() //get input
        newItem = budgetCtr.addItem(input.type, input.desc, input.value)
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