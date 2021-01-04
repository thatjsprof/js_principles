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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    }

    var calculateTotal = function(type) {
        var sum = 0

        data.allItems[type].forEach((cur, index) => {
            sum += cur.value
        })

        data.totals[type] = sum
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
        calculateBudget: function(){
            calculateTotal('exp')
            calculateTotal('inc')

            data.budget = data.totals.inc - data.totals.exp
            if(data.totals.inc > 0) data.percentage = Math.round(data.totals.exp / data.totals.inc * 100)
            else data.percentage = -1
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalExp: data.totals.exp,
                totalInc: data.totals.inc,
                percentage: data.percentage
            }
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
        inputBtn: '.add__btn',
        incomeCont: '.income__list',
        expenseCont: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                desc: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function(obj, type){
            var html, newHTMl, element
            
            if(type === 'inc') {
                element = DOMStrings.incomeCont
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type == 'exp') {
                element = DOMStrings.expenseCont 
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            newHTMl = html.replace('%id%', obj.id)
            newHTMl = newHTMl.replace('%description%', obj.description)
            newHTMl = newHTMl.replace('%value%', obj.value)

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTMl)
        },
        updateUI: function(obj) {
            var perc

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp
            
            perc = document.querySelector(DOMStrings.percentageLabel)
            
            if(obj.percentage <= 0) {
                perc.textContent = '---'
            }else{
                perc.textContent = obj.percentage + '%'
            }
        },
        clearFields: function() {
            var fields, fieldsArray

            fields = document.querySelectorAll(DOMStrings.inputDescription, DOMStrings.inputType, DOMStrings.inputValue)
            fieldsArray = Array.prototype.slice.call(fields)
            
            fieldsArray.forEach((curr, index, array) => {
                curr.value = ''
            })

            fieldsArray[0].focus()
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

        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtr.addItem(input.type, input.desc, input.value) // add new item to budget
            UICtr.addListItem(newItem, input.type) // display new item to UI
            UICtr.clearFields() // clear fields
            updateBudget() // updated budget calculations
        }
    }

    var updateBudget = function() {
        var budget

        budgetCtr.calculateBudget()
        budget = budgetCtr.getBudget()
        UICtr.updateUI(budget)
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
            UICtr.updateUI({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            setUpEventListeners()
        }
    }
})(budgetController, UIController)

controller.init()