// Global variables
var lives = 3;
var timeLeft = 30;
var correct = 0;

// countdown. 
var timerId = setInterval(countdown, 1000);
function countdown() {
    var elem = document.getElementById('timer');
    if (timeLeft == 0) {
    clearTimeout(timerId);
    // function that ends the game.
    $("#gameOverModal").show();
    } else {
    elem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
    }
}

// flips the cards.
function flipCard (element) {
    var elementId = $(element).attr("id");
    var card = $(element).data("card");

    // determines which cards dont match and flips them over.
    $("#" + elementId + "-back").addClass("selected");

    if($("#" + elementId + "-back").is(":visible")){
        $("#" + elementId + "-back").hide();
    }
    console.log("card: " + card);

    // Store card data in the session storage.
    if(sessionStorage.getItem("firstChoice") != null){
        var firstChoice = sessionStorage.getItem("firstChoice");
        var secondChoice = card;
        var check = document.getElementById('Life');
        if(firstChoice == secondChoice){
            // checks if the card data matches
            console.log("a match.");
            correct++;
            console.log(correct);
            // check if card data = time.
            if(card == "time") {
                // add time
                timeLeft = timeLeft + 30;
            }
            // check if card data = lifes.
            if(card == "lifes") {
                // add a life
                lives++;
                check.innerHTML = 'your lives are  ' + lives;
            }
            // check if card data = score.


            // find elemnts that are selected, find class and replace with correct class. 
            $(".selected").removeClass("selected").parent().addClass("matched").removeClass("active");
            // checks if game complete
            if(correct == 6){
                // run modal.
                $("#gameCompleteModal").show();
            }
        }else{
            // means that the cards are not a match.
            console.log("not a match.");
            // remove a life.
            lives--;
            // Update the lives html.
            check.innerHTML = 'your lives are  ' + lives;
            // run out of lives.
            if(lives <= 0){
                // run modal.
                $("#gameOverModal").show();
            }
            setTimeout(function() {
                $(".selected").show().removeClass("selected");
            }, 250);
        } 
        // removes the card data stored.
        sessionStorage.removeItem("firstChoice");
    }else{
        // sets the card data.
        sessionStorage.setItem("firstChoice",card);
    }
}

// Life Bar  (Unfinished)
var lifebar;
var numlives = 0;

function init(){
	output = document.getElementById('output');
	output.innerHTML = level;
	
	lifebar = document.getElementById('lifebar');
	for(var i=0; i<3; i++) addLife();
	
}

// Life Bar  (Unfinished)
var lifebar;
var numlives = 0;

function init(){
	output = document.getElementById('output');
	output.innerHTML = level;
	
	lifebar = document.getElementById('lifebar');
	for(var i=0; i<3; i++) addLife();
	
}

// runs on load.
$(document).ready(function() {
    $(".active").click(function() {
        if($(this).hasClass("active")){
            flipCard($(this));
        }
    });
    // resets the session storage data. 
    sessionStorage.removeItem("firstChoice");
});