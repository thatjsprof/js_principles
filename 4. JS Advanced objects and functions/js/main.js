var MAINAPP = (function(m, str, dom, gen) {
        // var result;

        // dom.eventList(dom.$('#btn-submit'), 'click', function(e) {
        //     hideFeedback()
        //     checkAnswer(dom.$('#input_field')[0].value)
        // })

        // var checkAnswer = function(input) {
        //     var arr = str.breakString(dom.attribute(dom.$('#question'), 'answer'), ',')
        //     console.log(input)
        //     if(input !== '') {
        //         var correct = arr.every(value => {
        //             return (input.indexOf(value) > -1)
        //         })
        //         result = (correct) ? 'correct' : 'wrong'
        //         displayFeedback(result)
        //     }else {
        //         displayFeedback('no-answer')
        //     }
        // }

        // var displayFeedback = function(result) {
        //     var feedback = dom.$('.feedback-' + result)
        //     dom.addClass(feedback, 'visible')
        // }

        // var hideFeedback = function() {
        //     var feedback = dom.$('.feedback-wrong')
        //     var feedback_none = dom.$('.feedback-no-answer')
        //     dom.removeClass(feedback, 'visible')
        //     dom.removeClass(feedback_none, 'visible')
        // }

    let jsonObj = {},
        navQuest = 0

    var loadJSON = function(path) {

        const xobj = new XMLHttpRequest()
        xobj.overrideMimeType('application/json')
        xobj.open('GET', path)
        xobj.onreadystatechange = function() {
            if(xobj.readyState == 4) {
                jsonObj = JSON.parse(xobj.responseText)
                parseData(jsonObj)
            }
        }
        xobj.send(null)
    }

    var Questions = function(obj) {
        this.type = obj.type
        this.id = obj.id
        this.answer = ''
        this.questionText = obj.questionText
        this.distractorText = obj.distractors
        this.correctResp = obj.correctResp
        this.feedback = obj.feedback
        this.weight = obj.weight
        this.result = "no-answer"
        this.studentResp = ""
        this.correct = undefined

        this.questDiv = obj.type === 'fill-in' ? 'fill-in' : obj.type

        htmlDiv = dom.$(`#${this.questDiv}`)[0]
        if(this.htmlDiv !== null) {
            this.questionField = htmlDiv.querySelector(".question-text")
            this.noAnswerFeed = htmlDiv.querySelector(".feedback-no-answer")
            this.correctFeed = htmlDiv.querySelector(".feedback-correct")
            this.inccorrectFeed = htmlDiv.querySelector(".feedback-wrong")
        }
        this.htmlDiv = htmlDiv
    }

    Questions.prototype.displayQuestion = function() {
        dom.removeClass([this.htmlDiv], 'hidden-question')
    }

    Questions.prototype.hideQuestion = function() {
        dom.addClass([this.htmlDiv], 'hidden-question')
    }

    Questions.prototype.populateQuestion = function() {
        this.questionField.innerHTML = this.questionText
        this.noAnswerFeed.innerHTML = `<p><span>X </span>${this.feedback.noAnswer}</p>`
        this.correctFeed.innerHTML = `<p><span>&#10003 </span>${this.feedback.correctAnswer}</p>`
        this.inccorrectFeed.innerHTML = `<p><span>X </span>${this.feedback.wrongAnswer}</p>`
    }

    Questions.prototype.showQuestion = function() {
        this.populateQuestion()
    }

    Questions.prototype.getAnswer = function(field) {
        let answer = this.htmlDiv.querySelector(field).value
        if(answer !== '') this.answer = answer.split(',')
        else {
            this.answer = ''
            this.correct = undefined
        }
    }

    Questions.prototype.displayFeedback = function() {
        var feedback = this.result == 'correct' ? this.correctField : this.result == 'no-answer' ? this.noAnswerFeed : this.inccorrectFeed
        console.log(feedback)
        dom.removeClass([feedback], 'hidden')
    }

    Questions.prototype.hideFeedback = function() {
        dom.addClass(Array.from(dom.$('.feedback')), 'hidden')
    }

    Questions.prototype.checkAnswer = function() {
        switch(this.questDiv) {
            case 'fill-in':
                this.getAnswer("#input_field")
                let distractorArray = this.correctResp.split(',')
                if(this.answer !== '') {
                    this.correct = distractorArray.every(distractor => {
                        return this.answer.indexOf(distractor) > -1
                    })
                }
                break;
            case 'multi-choice':
        }
        this.result = (this.correct) ? 'correct' : this.correct == undefined ? 'no-answer' : 'wrong'
        this.hideFeedback()
        this.displayFeedback()
    }

    var parseData = function(cObj) {
        questionsArray = cObj.questions

        dom.setHtml(dom.$('.btn-submit'), `<span>${cObj.buttonText}</span>`)

        handleQuestion(questionsArray)
    }

    var handleQuestion = (questionsArray) => {
        let quest = new Questions(questionsArray[navQuest])

        window.quest = quest // TESTING

        quest.showQuestion()
        dom.eventList([quest.htmlDiv.querySelector('.btn-submit')], 'click', function() {
            console.log('checking')
            quest.checkAnswer()
        })
    }

    var navigation = function(type) {
        type === 'next' ? navQuest++ : navQuest--
    }

    var initFunc = () => {
        loadJSON("JSON/content.json")
    }

    gen.getDom(function() {
        initFunc()
    })

})(MAINAPP || {}, STR.string, UTIL.domm, GEN.gen)