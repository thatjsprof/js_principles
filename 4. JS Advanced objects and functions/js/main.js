let MAINAPP = (function(m, str, dom, gen) {
        // let result;

        // dom.eventList(dom.$('#btn-submit'), 'click', function(e) {
        //     hideFeedback()
        //     checkAnswer(dom.$('#input_field')[0].value)
        // })

        // let checkAnswer = function(input) {
        //     let arr = str.breakString(dom.attribute(dom.$('#question'), 'answer'), ',')
        //     console.log(input)
        //     if(input !== '') {
        //         let correct = arr.every(value => {
        //             return (input.indexOf(value) > -1)
        //         })
        //         result = (correct) ? 'correct' : 'wrong'
        //         displayFeedback(result)
        //     }else {
        //         displayFeedback('no-answer')
        //     }
        // }

        // let displayFeedback = function(result) {
        //     let feedback = dom.$('.feedback-' + result)
        //     dom.addClass(feedback, 'visible')
        // }

        // let hideFeedback = function() {
        //     let feedback = dom.$('.feedback-wrong')
        //     let feedback_none = dom.$('.feedback-no-answer')
        //     dom.removeClass(feedback, 'visible')
        //     dom.removeClass(feedback_none, 'visible')
        // }

    let jsonObj = {},
        globalQuest,
        navigationProto,
        prevBtn,
        nextBtn,
        currentQuestion = 0,
        score

    let loadJSON = function(path) {

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

    let Questions = function(obj) {
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
        this.disabled = false
        this.checked = []

        this.questDiv = obj.type === 'fill-in' ? 'fill-in' : 'multi-choice'

        htmlDiv = dom.$(`#${this.questDiv}`)[0]
        if(htmlDiv !== null) {
            this.questionField = htmlDiv.querySelector(".question-text")
            this.noAnswerFeed = htmlDiv.querySelector(".feedback-no-answer")
            this.correctFeed = htmlDiv.querySelector(".feedback-correct")
            this.button = htmlDiv.querySelector(".btn-submit")
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
        window.quest = this
        if(this.htmlDiv) {
            this.questionField.innerHTML = this.questionText
            this.noAnswerFeed.innerHTML = `<p class="text-danger"><span>X </span>${this.feedback.noAnswer}</p>`
            this.correctFeed.innerHTML = `<p><span>&#10003 </span>${this.feedback.correctAnswer}</p>`
            this.inccorrectFeed.innerHTML = `<p class="text-danger"><span>X </span>${this.feedback.wrongAnswer}</p>`
            if(this.disabled) this.button.setAttribute('disabled', 'disabled')
            else this.button.removeAttribute('disabled')
            if(this.type !== 'fill-in') {
                let options = this.htmlDiv.querySelectorAll('label')
                options.forEach(option => {
                    dom.addClass([option], 'hidden')
                })
                for(let i = 0; i < this.distractorText.length; i++) {
                    let input = `<input type="checkbox" name="q4_${i + 1}" id="q4_${i + 1}" ${(this.checked.includes(this.distractorText[i])) ? 'checked="checked"' : ''}/>`
                    options[i].innerHTML = input +  ' ' + this.distractorText[i]
                    dom.removeClass([options[i]], 'hidden')
                }
                addEventChecked()
            }else {
                // let answer
                // answer = Array.isArray(this.answer) ? 
                //     (
                //         this.answer.join(',')
                //     )
                //     : 
                //     this.answer
                // dom.$("textarea")[0].innerHTML = answer
            }
        }
    }

    Questions.prototype.showQuestion = function() {
        this.populateQuestion()
    }

    Questions.prototype.getAnswer = function(field) {
        let answer = this.htmlDiv.querySelector(field).value
        if(answer !== '') this.answer = str.breakString(answer, ',')
        else {
            this.answer = ''
            this.correct = undefined
        }
    }

    Questions.prototype.displayFeedback = function() {
        let feedback = this.result == 'correct' ? this.correctFeed : this.result == 'no-answer' ? this.noAnswerFeed : this.inccorrectFeed
        if(this.result !== 'no-answer' && !this.disabled) {
            this.button.setAttribute('disabled', 'disabled')
            this.disabled = true
        }
        if(this.result === 'correct') {
            dom.$('.score')[0].innerText = score(this.weight)
        }
        dom.removeClass([feedback], 'hidden')
    }

    Questions.prototype.hideFeedback = function() {
        dom.addClass(Array.from(dom.$('.feedback')), 'hidden')
    }

    Questions.prototype.checkAnswer = function() {
        console.log(this)
        let distractorArray = str.breakString(this.correctResp, ',')
        switch(this.questDiv) {
            case 'fill-in':
                this.getAnswer("#input_field")
                if(this.answer !== '') {
                    this.correct = distractorArray.every(distractor => {
                        return this.answer.indexOf(distractor) > -1
                    })
                }
                break;
            case 'multi-choice' || 'true-false':
                let options = this.htmlDiv.querySelectorAll('label:not(.hidden)')
                options.forEach((option, index) => {
                    let input = option.querySelector('input')
                    if(input.checked) {
                        this.checked.push(this.distractorText[index])
                    }
                })
                this.correct = this.checked.every(distractor => {
                    return distractorArray.indexOf(distractor) > -1
                })
            default: 
                // what is going to be the default bayi ehn?
                // well to hell with you. You can put whatever the fuck you want
        }

        this.result = (this.correct) ? 'correct' : this.correct == undefined ? 'no-answer' : 'wrong'
        this.hideFeedback()
        this.displayFeedback()
    }

    let scoreTracker = function() {
        let score = 0
        return incScore = (value) => {
            score = score + value
            return score
        }
    }

    let parseData = function(cObj) {
        questionsArray = cObj.questions

        dom.setHtml([dom.$('.btn-submit')], `<span>${cObj.buttonText}</span>`)

        setGlobal(questionsArray)
    }

    let setGlobal = (questionsArray) => {
        let quest = []

        for(let i = 0; i < questionsArray.length; i++) {
            quest.push(new Questions(questionsArray[i]))
        }

        globalQuest = quest
        handleQuestion().setQuestion()

        navigationProto = {
            questionsArray: globalQuest,
            totalQuestions: globalQuest.length,
            hideQuestion: function() {
                let curQuestion = this.questionsArray[currentQuestion]
                curQuestion.hideQuestion()
            },
            showQuestion: function() {
                let newQuestion = this.questionsArray[currentQuestion]
                newQuestion.hideFeedback()
                newQuestion.populateQuestion()
                newQuestion.displayQuestion()
            }
        }
    
        prevBtn = Object.create(navigationProto)
        prevBtn.goPrev = function(e) {
                this.hideQuestion()
                currentQuestion = currentQuestion - 1
                this.showQuestion()

                checkStatus()
        }
    
        nextBtn = Object.create(navigationProto)
        nextBtn.goNext = function(e) {
                this.hideQuestion()
                currentQuestion = currentQuestion + 1
                this.showQuestion()
                
                checkStatus()
        }

        dom.eventList(dom.$('.pull-right'), 'click', function () {
            if(globalQuest[currentQuestion].result !== 'no-answer' || globalQuest[currentQuestion].result == 'wrong') nextBtn.goNext()
        })

        dom.eventList(dom.$('.pull-left'), 'click', function () {
            prevBtn.goPrev()
        })

        score = scoreTracker()
    }

    function addEventChecked() {
        let inputs = document.querySelectorAll('input')
        Array.from(inputs).forEach(input => {
            dom.eventList([input], 'change', function () {
                input.checked = true
                console.log('checked')
            })
        })
    }

    function checkStatus() {
        if(currentQuestion === 0) {
            dom.addClass(dom.$('.pull-left'), 'hidden')
        }else {
            dom.removeClass(dom.$('.pull-left'), 'hidden')
        }

        if(globalQuest.length - 1 === currentQuestion) {
            dom.addClass(dom.$('.pull-right'), 'hidden')
        }else {
            dom.removeClass(dom.$('.pull-right'), 'hidden')
        }
    } 

    let handleQuestion = () => {

        if(this.htmlDiv) dom.removeClass([this.htmlDiv], 'hidden-question')

        return {
            setQuestion() {
                globalQuest[currentQuestion].showQuestion()
                checkStatus()
                Array.from(document.querySelectorAll('.btn-submit')).forEach(button => {
                    dom.eventList([button], 'click', function() {
                        console.log('checking')
                        globalQuest[currentQuestion].checkAnswer()
                    })
                })
            }
        }
    }

    let initFunc = () => {
        loadJSON("JSON/content.json")
    }

    gen.getDom(function() {
        initFunc()
    })

})({}, STR.string, UTIL.domm, GEN.gen)