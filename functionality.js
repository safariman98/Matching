// countdown. 
var timeLeft = 30;
var timerId = setInterval(countdown, 1000);
function countdown() {
    var elem = document.getElementById('timer');
    if (timeLeft == 0) {
    clearTimeout(timerId);
    // function that ends the game.
    $("#myModal").show();
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
        if(firstChoice == secondChoice){
            // checks if the card data matches
            console.log("a match.");
            // find elemnts that are selected, find class and replace with correct class. 
            $(".selected").removeClass("selected").parent().addClass("matched").removeClass("active");
        }else{
            // means that the cards are not a match.
            console.log("not a match.");
            setTimeout(function() {
                $(".selected").show().removeClass("selected");
            }, 2000);
        } 
        // removes the card data stored.
        sessionStorage.removeItem("firstChoice");
    }else{
        // sets the card data.
        sessionStorage.setItem("firstChoice",card);
    }
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

