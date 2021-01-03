(function(){ 
    var Question = function(question, answers,  correct) {
        this.question = question
        this.answers = answers
        this.correct = correct
        this.show = function() {
            return {
                question: this.question,
                answers: this.answers
            }
        },
        this.isCorrect = function(ans) {
            if(ans === this.correct) {
                return true
            }
            return false;
        }
    }

    var question1 = new Question('what is my name?', ['david', 'samuel', 'tunde'], 0)
    var question2 = new Question('what is my shoe size?', ['12', '13', '14'], 2)
    var question3 = new Question('what is my hair color?', ['blue', 'brown', 'black'], 2)

    var questArray = [question1, question2, question3]

    var random = Math.floor(Math.random() * questArray.length)

    var randomQuestion = questArray[random]

    console.log(randomQuestion.show())

    var userInput = +prompt('Type in your answer')

    console.log(randomQuestion.isCorrect(userInput) 
        ? 'You got it right'
        : 'You got it wrong'
    )
})()