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


// Timer Variables
var timeLeft= 240;
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



// start quiz on button click
var startQuiz = function() {
    // hide start page
    pageContentEl.removeChild(introPageEl);

    // create timer 
    timer = setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
    
        if (timeLeft === 0) {
            clearInterval(timer);
            timerEl.textContent = "Time: 0";
            endGame();
            
        }
    }, 1000);
        
    // add question to page
    question.textContent = quizquestions[count].q;
    quizPageEl.insertBefore(question, buttonContainerEl);

    // add all four buttons
    buttonContainerEl.innerHTML = "<button class='btn question-btn'>" + quizquestions[count].a1
     + "</button><button class=' btn question-btn'>" + quizquestions[count].a2
      + "</ button><button class='btn question-btn'>" + quizquestions[count].a3
       + "</button><button class='btn question-btn'>" + quizquestions[count].a4 + "</button>";

       
    quizPageEl.appendChild(rightOrWrong);      
    
};

// wait for question answered
var questionAnswered = function (event) {

    // if click is anywhere undefined, return early
    var answer = event.target;
    if (!event.target.type) {
        return
    }
    
    // if the user answer matches correct answer
    if (answer.textContent === quizquestions[count].correct) {
        rightOrWrong.textContent= "Correct!";
        console.log(answer);
        
    }
    else {
        rightOrWrong.textContent= "Incorrect!";
        timeLeft-=20;
        console.log(answer);
        
    }
    // increase count
    count++;

    // if we have gone through all the questions, stop timer and end game
    if (count === quizquestions.length) {
        clearInterval(timer);
        endGame();
    }
    question.textContent = quizquestions[count].q;
    buttonContainerEl.innerHTML = "<button class='btn question-btn'>" + quizquestions[count].a1
     + "</button><button class=' btn question-btn'>" + quizquestions[count].a2
      + "</ button><button class='btn question-btn'>" + quizquestions[count].a3
       + "</button><button class='btn question-btn'>" + quizquestions[count].a4 + "</button>";
}

var endGame = function () {
    // remove content from quiz page
    pageContentEl.removeChild(quizPageEl);

    // create elements for results page

    var resultsPageTitleEl = document.createElement("h1");
    resultsPageTitleEl.className = "title";
    resultsPageTitleEl.textContent = "Quiz Complete!";

    //p
    var finalScoreEl = document.createElement("p");
    finalScoreEl.textContent = "Your final score is " + timerEl.textContent + ".";

    // Input Initials
    inputInitialsContainerEl.innerHTML = "<label for='initials'>Enter intials: </label><input type='text' name='initials' minlength='1' maxlength'3'>";

    // add all elements to page
    resultsPageEl.appendChild(resultsPageTitleEl);
    resultsPageEl.appendChild(finalScoreEl);
    resultsPageEl.appendChild(inputInitialsContainerEl);
    inputInitialsContainerEl.appendChild(initialSubmitBtnEl);
};

var highScoreSubmit = function() {

    // save initials input to variable
    var initialsInput = document.querySelector("input").value;

    // if no initials entered, try again
    if (!initialsInput || initialsInput.length < 2) {
        alert("Please enter your initials.");
        return;
    }
    
    // save high score to object
    var highScoreObj = {
        name: initialsInput,
        score: timeLeft
    };

    // pull any already existing high scores from localStorage
    var dataFromLocal = JSON.parse(localStorage.getItem("highScores"));

    // if nothing, start empty array
    if (!dataFromLocal) {
        dataFromLocal = [];
    }

    //if there are previous high scores saved, save previous high scores to array
    dataFromLocal.push(highScoreObj);

    // save new high score array to local storage
    localStorage.setItem("highScores", JSON.stringify(dataFromLocal))

    // remove end page to move to high scores page
    pageContentEl.removeChild(resultsPageEl);

    loadHighScoresPage();
};

var buttonsFunction = function (event) {
    var buttonClicked = event.target;

    // if go back button was clicked
    if (buttonClicked.textContent === "Go back") {
        pageContentEl.removeChild(highScorePageEl);
        pageContentEl.appendChild(endPageEl);
        return;
    }
    // if clear high scores button was pushed
    else {
        // remove high scores
        localStorage.removeItem("highScores");

        // remove current list w/ high scores
        highScorePageEl.removeChild(highScoreListEl);

        // create new ul to show empty list now that scores are erased
        var emptyList = document.createElement("ul")
        var emptyListItem = document.createElement("li")
        emptyListItem.textContent = "No data to show.";
        emptyList.appendChild(emptyListItem);
        highScorePageEl.insertBefore(emptyList, highScoreButtonsEl);

    }
}

var loadHighScoresPage = function () {
    // remove header 
    headerEl.remove();

    // create elements for high score page
    //title
    var highScoreTitleEl = document.createElement("h1");
    highScoreTitleEl.className = "title";
    highScoreTitleEl.textContent = "High Scores";

    //add in high scores from localStorage
    var getScores = localStorage.getItem('highScores');
    getScores = JSON.parse(getScores);

    // if nothing saved to localStorage, show empty list
    if (getScores === null) {

        var emptyList = document.createElement("li")
        emptyList.textContent = "No data to show."
        highScoreListEl.appendChild(emptyList);

    } else {    
        for (var i=0; i < getScores.length; i++) {
            var scoresListItem = document.createElement("li")
            scoresListItem.textContent = ([i+1]) + ". " + getScores[i].name + " - " + getScores[i].score;
            highScoreListEl.appendChild(scoresListItem);
        };
    };
    
    // go back button
    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.className = "btn highscore-btn";
    goBackButtonEl.textContent = "Go back";


    // clear high scores button
    var clearHighScoresBtnEl = document.createElement("button");
    clearHighScoresBtnEl.className= "btn highscore-btn";
    clearHighScoresBtnEl.textContent = "Clear High Scores";
    
    // append all children elements to page and div container
    highscorePageEl.appendChild(highscoreTitleEl);
    highscorePageEl.appendChild(highscoreListEl);  
    highscoreButtonsEl.appendChild(goBackButtonEl);
    highscoreButtonsEl.appendChild(clearHighScoresBtnEl);
    highscorePageEl.appendChild(highscoreButtonsEl);

}









//Quiz Questions and Answers
var quizquestions= [
    {
        q: "Commonly used data types DO NOT include:",
        a1: "1. strings",
        a2: "2. booleans",
        a3: "3. numbers",
        a4: "4. alerts",
        correct: "4. alerts"
    },
    {
        q: "The condition in an if/else statement is encolsed within ________.",
        a1: "1. quotes",
        a2: "2. parentheses",
        a3: "3. square brackets",
        a4: "4. curly brackets",
        correct: "2. parentheses",
    },
    {
        q: "Arrays in JavaScript can be used to store",
        a1: "1. numbers and strings",
        a2: "2. other arrays",
        a3: "3. booleans",
        a4: "4. all of the above",
        correct: "4. all of the above",
    },
    {
        q: "String values must be enclosed within _______ when being assigned to variables",
        a1: "1. curly brackets",
        a2: "2. commas",
        a3: "3. quotes",
        a4: "4. parantheses",
        correct: "3. quotes",
    },
    {
        q: "A very useful tool used during development and debugging for print content to the debugger is",
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
highScoreButtonsEl.addEventListener("click", buttonsFunction);
