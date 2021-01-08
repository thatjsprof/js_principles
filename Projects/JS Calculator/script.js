var calculatorController = (function() {
    var data = {
        hold: [],
        history: []
    }

    return {
        extract(operators) {
            var str, nums, operator, obj, res

            obj = Object.values(operators)

            str = data.hold.join('')
            
            operator = data.hold.filter(value => {
                return obj.includes(value)
            })

            nums = str.split(operator[0])
            
            res = this.compute(nums, operator[0])

            return res
        },
        compute(nums, operator) {
            var n1, n2, res

            n1 = +nums[0]
            n2 = +nums[1]

            switch(operator) {
                case '+':
                    res = n1 + n2
                    break
                case '-':
                    res = n1 - n2
                    break
                case '/':
                    res = n1 / n2
                    break
                case '*':
                    res = n1 * n2
                    break
                default:
                    res = ''
            }

            return res
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
        divide: '/'
    }

    var out = ['reset', 'equals']

    return {
        showResult(res) {
            document.querySelector(DOM.screen).textContent = res
        },
        showOnScreen(value, hold) {
            var screen, ref, lastValue, ret, obj

            lastValue = hold[hold.length - 1]

            obj = Object.values(operators)

            ret = obj.includes(lastValue)

            if(operators[value] && !ret && !hold.some(value => obj.includes(value))) {
                if(hold.length > 0) hold.push(operators[value]);
            }
            else {
                if(operators[value] == undefined) {
                    temp = value
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
        var res

        res = calcCtr.extract(operators)
        reset()
        UICtr.showResult(res)
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
