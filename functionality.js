// flips the cards.
function flipCard (element) {
    var elementId = $(element).attr("id");
    var card = $(element).data("card");

    // to do: determine which ones have been picked as previous cards that match will flip over when they shouldn't.

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
            // to do: figure out a way to freeze cards that match. 
            console.log("a match.");
        }else{
            // means that the cards are not a match.
            // to do: turn the cards back over. 
            console.log("not a match.");
            setTimeout(function() {
                $(".selected").show();
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
    $(".gameCard").click(function() {
        flipCard($(this));
    });
    // resets the session storage data. 
    sessionStorage.removeItem("firstChoice");
});

