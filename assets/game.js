const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Commonly used data types DO Not Include?',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 2,
    },
    {
        question: 'The condition in an if / else statement is enclosed with _______.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parenthesis',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.?',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parenthesis',
        answer: 2,
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}
// START GAMER TIMER
setTimeout(() => {
    console.log("Delayed for 60 second.");
    return window.location.assign('./end.html');
  }, "60000")
// GAMER TIMER 2
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            console.log("QUIZ HAS CONCLUDED");
            localStorage.setItem('mostRecentScore', score);
            getNewQuestions();
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 1,  //60 times X = seconds
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

//END GAMER TIMER

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    } 
    
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 95}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()