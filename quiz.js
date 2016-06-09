/* global $ */
/* exports isGameOver, whoWon, playTurn, restart, currentQuestion, correctAnswer, numberOfAnswers */
$(document).ready(function() {
console.log(quiz.currentQuestion % 2);

$('.restart').click(function () {
  restart ();
  updateDisplay();
  console.log("restart!")
  // window.location.reload();
})

//user event listerner: keycode -

});

//RESTART


// A constructor function allows us to easily make question objects
function Question (prompt, answers, correctAnswerIndex) {
  this.prompt = prompt
  this.choices = answers
  this.correctChoice = correctAnswerIndex
}


// using the new keyword and the constructor we can create questions for the quiz
var question0 = new Question('Color of Sun', ['Red', 'Green', 'Blue', 'Yellow'], 0)
var question1 = new Question('Color of Tree', ['Red', 'Green', 'Blue', 'Yellow'], 1)
var question2 = new Question('Color of Sky', ['Red', 'Green', 'Blue', 'Yellow'], 2)
var question3 = new Question('Color of Banana', ['Red', 'Green', 'Blue', 'Yellow'], 3)

// we can create an object to represent all of the settings and scores for the quiz
var quiz = {
  currentQuestion: 0,
  questions: [question0, question1, question2, question3],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
}

// numberOfQuestions should return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length
}

// currentQuestion should return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion
}

// correctAnswer should return an integer that is the zero-based index the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctChoice
}

// numberOfAnswers should return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length
}

// playTurn should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn (choice) {
  if (quiz.isGameOver) {
    return false
  }
  var correct = false
  if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
    correct = true;
    console.log(correct)

    if (quiz.currentQuestion % 2) {
      quiz.player2Points++
      console.log("player 2 points ", quiz.player2Points)
    } else {
      quiz.player1Points++
      console.log("player 1 points ", quiz.player1Points)
    }
  }
  ++quiz.currentQuestion
  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return correct
}

// isGameOver should return a true or false if the quiz is over.
function isGameOver () {
  return quiz.isGameOver
}

// whoWon should return 0 if the game is not yet finished, 1 or 2 depending on which player won, else 3 if the game is a draw.
function whoWon () {
  if (!quiz.isGameOver) return 0
  if (quiz.player1Points > quiz.player2Points) return 1
  if (quiz.player1Points < quiz.player2Points) return 2
  return 3
}

// restart should restart the game so it can be played again.
function restart () {
  quiz.currentQuestion = 0
  quiz.isGameOver = false
  quiz.player1Points = 0
  quiz.player2Points = 0
}

// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {
    var winner = whoWon ()
    if (winner= 1)
    {$('h2').text(' Gameover! Winner is Player 1')}
    if (winner= 2)
    {$('h2').text(' Gameover! Winner is Player 2')}
    if (winner= 3)
    {$('h2').text(' Gameover! Its a draw!')}

    }
    else {
    $('h2').text('Game in Progress: Question ' + quiz.currentQuestion + ' of  ' + quiz.questions.length)
    $('h1').text(quiz.questions[quiz.currentQuestion].prompt + ' ?')
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1])
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2])
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3])
  }
  // update player scores regardless
  $('h3').eq(0).text('Player1: ' + quiz.player1Points)
  $('h3').eq(1).text('Player2: ' + quiz.player2Points)

  //update which player's turn
  if (quiz.currentQuestion % 2)
  {$('h4').text('Current Player is Player 2')}
  else
  {$('h4').text('Current Player is Player 1')}
}

// the jQuery ready function will add click listeners once the dom is loaded
$(function () {
  $('button').click(function () {
    // if gameover then restart else log a player turn
    if (isGameOver()) {
      restart()
    } else {
      // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
      playTurn($(this).index())
      console.log($(this).index())
    }
    updateDisplay()
  })
  // update the display for the first time
  updateDisplay()
})
