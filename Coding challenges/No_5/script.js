(function(){ 
    var gamePlaying = true

    var Question = function(question, answers,  correct) {
        this.question = question
        this.answers = answers
        this.correct = correct
        this.show = function() {
            console.log('Question:', this.question)
            for(var i = 0; i < this.answers.length; i++) {
                console.log(i, ':', this.answers[i])
            }
        },
        this.isCorrect = function(ans) {
            if(+ans === this.correct) {
                return true
            }else if(ans == 'exit') {
                gamePlaying = false
                return null
            }
            return false;
        }
    }

    var question1 = new Question('what is my name?', ['david', 'samuel', 'tunde'], 0)
    var question2 = new Question('what is my shoe size?', ['12', '13', '14'], 2)
    var question3 = new Question('what is my hair color?', ['blue', 'brown', 'black'], 2)

    var questArray = [question1, question2, question3]

    function displayQuestion() {
        if(gamePlaying) {
            var random = Math.floor(Math.random() * questArray.length)
            var randomQuestion = questArray[random]

            console.log(randomQuestion.show())
            var userInput = prompt('Type in your answer')
            var ret = randomQuestion.isCorrect(userInput)
            if(ret) {
                res = 'You got it right'
            }else if(ret == null) {
                res = ''
            }else {
                res = 'You got it wrong'
            }
            console.log(res)
            displayQuestion()
        }else {
            console.log('You quit the game')
        }
    }
    displayQuestion()
})()