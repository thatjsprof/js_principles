(function() {

    var dom = document

    var getDom = function(funct) {
        dom.addEventListener('DOMContentLoaded', function() {
            if(typeof funct === 'function') funct()
        })
    }

    $ = function(DomElement) {
        if(!singleSelector(DomElement)) {
            try {
                return dom.querySelectorAll(DomElement)
            } catch(err) {
                console.log(err)
            }
        }else {
            if(DomElement.indexOf('#') === 0) {
                try{
                    return [doc.getElementById(DomElement.subString(1, DomElement.length))]
                } catch(err) {
                    console.log(err)
                }
            }else if(DomElement.indexOf('.') === 0) {
                try {
                    return doc.getElementsByClassName(DomElement.subString(1, DomElement.length))
                } catch(err) {
                    console.log(err)
                }
            }else {
                return doc.getElementsByTagName(DomElement)
            }
        }
    }

    var singleSelector = function(elem) {
        let arr = elem.split(' ')
        if(arr.length > 1 && numStr(arr, '#') >= 1 && numStr(arr, '.') >= 1) {
            return true
        }
        return false
    }

    var eventList = function(de, event, funct) {
        try {
            console.log(de)
            for(i = 0; i < de.length; i++) {
                de[i].addEventListener(event, funct)
            }
        } catch(err) {
            console.log(err)
        }
    }

    // DOM functionalities
    var addClass = function(de, cls) {
        for(i = 0; i < de.length; i++) {
            if(de[i].classList) {
                de[i].classList.add(cls)
            }else {
                de[i].className = ' ' + cls
            }
        }
    }

    var removeClass = function(de, cls) {
        for(i = 0; i < de.length; i++) {
            if(de[i].classList) {
                de[i].classList.remove(cls)
            }else {
                de[i].classList.replace(/\bcls\b/,'')
            }
        }
    }

    var attribute = function(de, name) {
        let arr = []
        if(de.length > 1) {
            for(i = 0; i <= de.length; i++) {
                arr[i] = de[i].getAttribute('data-' + name)
            }
        }else {
            return de[0].getAttribute(`data-${name}`)
        }
    }

    // string functionality
    var numStr = function(str, char) {
        return (str.split(char).length - 1)
    } 

    var breakString = function(str, del) {
        var strR = str.split(del)
        return strR.map(value => {
            return value.trim()
        })
    }

    var initFunc = function() {
        var result;

        eventList($('#btn-submit'), 'click', function(e) {
            hideFeedback()
            checkAnswer($('#input_field')[0].value)
        })

        var checkAnswer = function(input) {
            var arr = breakString(attribute($('#question'), 'answer'), ',')
            console.log(input)
            if(input !== '') {
                var correct = arr.every(value => {
                    return (input.indexOf(value) > -1)
                })
                result = (correct) ? 'correct' : 'wrong'
                displayFeedback(result)
            }else {
                displayFeedback('no-answer')
            }
        }

        var displayFeedback = function(result) {
            var feedback = $('.feedback-' + result)
            addClass(feedback, 'visible')
        }

        var hideFeedback = function() {
            var feedback = $('.feedback-wrong')
            removeClass(feedback, 'visible')
        }
    }

    getDom(function() {
        initFunc()
    })
})()