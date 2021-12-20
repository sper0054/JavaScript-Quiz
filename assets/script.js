// DOM Elements ties to HTML
var startQuizBtnEl = document.querySelector("#startquiz");
var introPageEl = document.querySelector(".intro");
var quizPageEl = document.querySelector(".quiz");
var resultsPageEl = document.querySelector(".results");
var pageContentEl = document.querySelector("main");
var buttonContainerEl = document.querySelector(".button-container");
var timerEl = document.querySelector("span");
var highscorePageEl = document.querySelector(".highscores");
var headerEl = document.querySelector("header");


// Time
var timeLeft= 100;
var count = 0;
var timer="";

// Elements to add to the page at a later time
var question = document.createElement("h1");
question.className = "question";
var rightOrWrong = document.createElement("p");
rightOrWrong.className = "answer";
var initialSubmitBtnEl = document.createElement("button");
initialSubmitBtnEl.className = "btn initial-submit";
var inputInitialsContainerEl = document.createElement("div");
initialSubmitBtnEl.textContent = "Submit";
inputInitialsContainerEl.className = "initial-container";
var highscoreButtonsEl = document.createElement("div");
highscoreButtonsEl.className = "high-score-buttons";
var highscoreListEl = document.createElement("ul");
highscoreListEl.className = "high-scores";
var retryBtnEl = document.createElement("button");
retryBtnEl.className = "btn highscore-btn";
retryBtnEl.textContent = "Retry";
var clearHighscoresBtnEl = document.createElement("button");
clearHighscoresBtnEl.className= "btn highscore-btn";
clearHighscoresBtnEl.textContent = "Clear Highscores";


// start quiz on button click, hide intro, start timer, see first question with possible answers
var startQuiz = function() {
    pageContentEl.removeChild(introPageEl);

    timer = setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
    
        if (timeLeft === 0) {
            clearInterval(timer);
            timerEl.textContent = "Time: 0";
            endGame();
            
        }
    }, 1000);
        
    question.textContent = quizquestions[count].question;
    quizPageEl.insertBefore(question, buttonContainerEl);
    buttonContainerEl.innerHTML = "<button class='btn question-btn'>" + quizquestions[count].a1
     + "</button><button class=' btn question-btn'>" + quizquestions[count].a2
      + "</ button><button class='btn question-btn'>" + quizquestions[count].a3
       + "</button><button class='btn question-btn'>" + quizquestions[count].a4 + "</button>";
    quizPageEl.appendChild(rightOrWrong);    
};

//answers function
var questionAnswered = function (event) {
    var answer = event.target;
    if (!event.target.type) {
        return
    }
    
    if (answer.textContent === quizquestions[count].correct) {
        rightOrWrong.textContent= "Correct!";
        console.log(answer);
    }
    else {
        rightOrWrong.textContent= "Incorrect!";
        timeLeft-=20;
        console.log(answer);
    }
    count++;

    if (count === quizquestions.length) {
        clearInterval(timer);
        endGame();
    }
    question.textContent = quizquestions[count].question;
    buttonContainerEl.innerHTML = "<button class='btn question-btn'>" + quizquestions[count].a1
     + "</button><button class=' btn question-btn'>" + quizquestions[count].a2
      + "</ button><button class='btn question-btn'>" + quizquestions[count].a3
       + "</button><button class='btn question-btn'>" + quizquestions[count].a4 + "</button>";
}

var endGame = function () {
    //add and remove elements
    pageContentEl.removeChild(quizPageEl);

    var resultsPageTitleEl = document.createElement("h1");
    resultsPageTitleEl.className = "title";
    resultsPageTitleEl.textContent = "Quiz Complete!";

    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your score is " + timerEl.textContent + ".";

    
    inputInitialsContainerEl.innerHTML = "<label for='initials'>Enter intials: </label><input type='text' name='initials'>";

   
    resultsPageEl.appendChild(resultsPageTitleEl);
    resultsPageEl.appendChild(finalScoreEl);
    resultsPageEl.appendChild(inputInitialsContainerEl);
    inputInitialsContainerEl.appendChild(initialSubmitBtnEl);
};

//save high score with initials to local storage
var highScoreSubmit = function() {

    var initialsInput = document.querySelector("input").value;
    if (!initialsInput) {
        alert("Please enter your initials.");
        return;
    }
    
    var highScoreObj = {
        name: initialsInput,
        score: timeLeft
    };

    var dataFromLocal = JSON.parse(localStorage.getItem("highscores"));
    if (!dataFromLocal) {
        dataFromLocal = [];
    }

    dataFromLocal.push(highScoreObj);
    localStorage.setItem("highscores", JSON.stringify(dataFromLocal))
    pageContentEl.removeChild(resultsPageEl);

    loadHighScoresPage();
};

//highscores
var loadHighScoresPage = function () {
    //add and remove elements 
    headerEl.remove();
    
    var highscoreTitleEl = document.createElement("h1");
    highscoreTitleEl.className = "title";
    highscoreTitleEl.textContent = "Highscores";

    var getScores = localStorage.getItem('highscores');
    getScores = JSON.parse(getScores);
    if (getScores === null) {

        var emptyList = document.createElement("li")
        emptyList.textContent = "No data to show."
        highscoreListEl.appendChild(emptyList);

    } else {    
        for (var i=0; i < getScores.length; i++) {
            var scoresListItem = document.createElement("li")
            scoresListItem.textContent = ([i+1]) + ". " + getScores[i].name + " - " + getScores[i].score;
            highscoreListEl.appendChild(scoresListItem);
        };
    };
    
    highscorePageEl.appendChild(highscoreTitleEl);
    highscorePageEl.appendChild(highscoreListEl); 
    highscorePageEl.appendChild(highscoreButtonsEl); 
    highscoreButtonsEl.appendChild(retryBtnEl);
    highscoreButtonsEl.appendChild(clearHighscoresBtnEl);

};


var buttonsFunction = function (event) {
    var buttonClicked = event.target;

    // if retry button was clicked
    if (buttonClicked.textContent === "Retry") {
        window.location.href = './index.html';
    }

    // if clear high scores button was pushed
    else {
        // remove high scores
        localStorage.removeItem("highscores");

        // remove current list w/ high scores
        highscorePageEl.removeChild(highscoreListEl);

        // create new ul to show empty list now that scores are erased
        var emptyList = document.createElement("ul")
        var emptyListItem = document.createElement("li")
        emptyListItem.textContent = "No data to show.";
        emptyList.appendChild(emptyListItem);
        highscorePageEl.insertBefore(emptyList, highscoreButtonsEl);

    }
}



//Quiz Questions and Answers
var quizquestions= [
    {
        question: "Commonly used data types DO NOT include:",
        a1: "1. strings",
        a2: "2. booleans",
        a3: "3. numbers",
        a4: "4. alerts",
        correct: "4. alerts"
    },
    {
        question: "The condition in an if/else statement is encolsed within ________.",
        a1: "1. quotes",
        a2: "2. parentheses",
        a3: "3. square brackets",
        a4: "4. curly brackets",
        correct: "2. parentheses",
    },
    {
        question: "Arrays in JavaScript can be used to store",
        a1: "1. numbers and strings",
        a2: "2. other arrays",
        a3: "3. booleans",
        a4: "4. all of the above",
        correct: "4. all of the above",
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables",
        a1: "1. curly brackets",
        a2: "2. commas",
        a3: "3. quotes",
        a4: "4. parantheses",
        correct: "3. quotes",
    },
    {
        question: "A very useful tool used during development and debugging for print content to the debugger is",
        a1:"1. javascript",
        a2: "2. terminal/bash",
        a3: "3. for loops",
        a4: "4. console.log",
        correct: "console.log",
    },
];

//listeners
startQuizBtnEl.addEventListener("click", startQuiz);
buttonContainerEl.addEventListener("click", questionAnswered);
initialSubmitBtnEl.addEventListener("click", highScoreSubmit);
highscoreButtonsEl.addEventListener("click", buttonsFunction);
