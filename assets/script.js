
//start the quiz by clicking the button


//end the quiz

// save initals and score to local storage
var initalsInput = document.querySelector("initials");
var scoreInput = document.querySelector("score");

signupButton.addEventListener("click", function(event) {
    event.preventDefault();

    var user = {
        player: initialsInput.value.trim(),
        score: scoreInput.value.trim(),
    };

    localStorage.setItem("user", JSON.stringify(user));
});