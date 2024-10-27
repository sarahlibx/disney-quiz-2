const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'When did Walt Disney World open?',
        choice1: 'July 17, 1955',
        choice2: 'October 1, 1971',
        choice3: 'October 3, 1982',
        choice4: 'December 5, 1901',
        answer: 2,
    },
    {
        question: 'What opening day attraction is still at Magic Kingdom?',
        choice1: 'The Haunted Mansion',
        choice2: 'Snow White Scary Adventures',
        choice3: 'Skyway',
        choice4: 'Mickey Mouse Revue',
        answer: 1,
    },
    {
        question: 'How many countries are officially represented in the World Showcase at Epcot?',
        choice1: '11',
        choice2: '15',
        choice3: '8',
        choice4: '13',
        answer: 1,
    },
    {
        question: 'Which Walt Disney World theme park is the largest?',
        choice1: 'Magic Kingdom',
        choice2: 'Hollywood Studios',
        choice3: 'Animal Kingdom',
        choice4: 'EPCOT',
        answer: 3,
    },
      {
        question: 'How tall is Cinderella Castle in Magic Kingdom',
        choice1: '77 feet',
        choice2: '211 feet',
        choice3: '113 feet',
        choice4: '189 feet',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

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

        acceptingAnswers= false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
         }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startGame()