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
    var temp = ''

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
            var screen, ref, lastValue, ret

            lastValue = hold[hold.length - 1]

            ret = Object.values(operators).includes(lastValue)

            if(operators[value] && !ret) {
                if(hold.length > 0) hold.push(operators[value]);
            }
            else {
                if(operators[value] == undefined) {
                    temp += value
                }
                if(temp !== '') hold.push(temp)
            }
             
            ref = hold.join(' ');
            temp = ''

            screen = document.querySelector(DOM.screen)
            screen.textContent = ref
        },
        reset() {
            document.querySelector(DOM.screen).textContent = ''
            temp = ''
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
    var {DOM, operators, out} = UICtr.getValues()

    var getValue = function(e) {
        var id, hold

        ({hold} = calcCtr.getData())
        id = e.target.id

        var show = UICtr.showOnScreen

        if(id !== '' && !out.includes(id)) {
            show(id, hold)
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