var calculatorController = (function() {
    var data = {
        hold: [],
        history: []
    }

    return {
        compute() {
            
        },
        reset: function() {
            data.hold = []
        },
        getData() {
            return data
        }
    }
})()

var UIController = (function() {
    var DOM = {
        tableBody: 'tbody',
        screen: '#screen',
        equals: '#equals',
        reset: '#reset'
    }

    var operators = {
        plus: '+',
        minus: '-',
        multiply: '*',
    }

    var out = ['reset', 'equals']

    return {
        getInput() {},
        showOnScreen(value, hold) {
            var screen, ref

            hold.push(value)
            ref = hold.join(' ')

            screen = document.querySelector(DOM.screen)
            screen.textContent = ref
        },
        reset() {
            document.querySelector(DOM.screen).textContent = ''
        },
        getValues() {
            return {
                DOM,
                operators,
                out
            }
        }
    }
})()

var controller = (function(calcCtr, UICtr){
    var {DOM, operators, out} = UICtr.getValues(), temp = ''

    var getValue = function(e) {
        var id, hold

        ({hold} = calcCtr.getData())
        id = e.target.id
        lastValue = hold[hold.length - 1]

        var show = UICtr.showOnScreen

        if(id !== '' && !out.includes(id)) {
            if(operators[id]) {
                if(temp !== '') show(+temp, hold); temp = ''
                if(hold.length > 0) show(operators[id], hold)
            }
            else {
                if(operators[id] == undefined) {
                    temp += id
                }
            }
            console.log(temp)
        }
    }

    var compute = function() {
        calcCtr.compute()
    }

    var reset = function() {
        calcCtr.reset()
        UICtr.reset()
    }

    var setUpEventListeners = function() {
        document.querySelector(DOM.tableBody).addEventListener('click', getValue)
        document.querySelector(DOM.equals).addEventListener('click', compute)
        document.querySelector(DOM.reset).addEventListener('click', reset)
    }

    return {
        init() {
            console.log('Application started')
            setUpEventListeners()
        }
    }
})(calculatorController, UIController)

controller.init()