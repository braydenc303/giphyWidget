// 1. Before you can make any part of our site work, you need to create an array of strings, 
// each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
var junkFood = ["cupcake", "burger", "hot dog", "chips", 
                "candy bar", "lollipop", "popsicle", "pizza",
                "buffalo wings", "fried chicken", "ice cream",
                "pretzels", "cookies", "corndog", "nachos",
                "chicken nuggets", "brownies", "candy", "popcorn",
                "mac and cheese"]

// 2. Your app should take the topics in this array and create buttons in your HTML.
// * Try using a loop that appends a button for each string in the array.
$(document).ready(makeButtons(junkFood));

function makeButtons() {
    $("header").empty();
    for (var i = 0; i < junkFood.length; i++) {
        $("header").append("<button data-category = '" + junkFood[i] + "'>" + junkFood[i].toUpperCase() + "</button>");
    }
}

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and 
// place them on the page.
$("header").on("click", "button", function() {
    var category = $(this).attr("data-category");
    // console.log(category);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=STrsqiGUC2AsGFAUFLvmOUAMxcdUUt6a&limit=10&rating=pg";
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        var results = response.data;
        for(var i = 0; i < results.length; i++) {
            var foodDiv = $("<div>");
            foodDiv.attr("class", "category");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height_still.url);
            foodImage.attr("data-still",  results[i].images.fixed_height_still.url);
            foodImage.attr("data-animate",  results[i].images.fixed_height.url);
            foodImage.attr("data-state", "still");
            foodImage.attr("class", "gif");
            foodDiv.append(foodImage);
            // 5. Under every gif, display its rating (PG, G, so on).
            foodDiv.append(p);
            $("#gifContainer").prepend(foodDiv);
        }
    });

   
});

// 4. When the user clicks one of the still GIPHY images, the gif should animate. 
// If the user clicks the gif again, it should stop playing.
$("#gifContainer").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var pauseGif = $(this).attr("data-still");
    var animateGif = $(this).attr("data-animate");
    if (state === "still") {
        $(this).attr("src", animateGif);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", pauseGif);
        $(this).attr("data-state", "still");
    }
});

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. 
// Then make a function call that takes each topic in the array remakes the buttons on the page.

$("#addFavorite").on("click", function(event) {
    event.preventDefault();
    var food = $("#addCategory").val().trim();
    junkFood.push(food);
    makeButtons();
});