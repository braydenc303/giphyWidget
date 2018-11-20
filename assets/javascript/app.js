var junkFood = ["cupcake", "burger", "hot dog", "chips", 
                "candy bar", "lollipop", "popsicle", "pizza",
                "buffalo wings", "fried chicken", "ice cream",
                "pretzels", "cookies", "corndog", "nachos",
                "chicken nuggets", "brownies", "candy", "popcorn",
                "mac and cheese"]

$(document).ready(makeButtons(junkFood));

function makeButtons() {
    for (var i = 0; i < junkFood.length; i++) {
        $("header").append("<button data-category = '" + junkFood[i] + "'>" + junkFood[i].toUpperCase() + "</button>");
    }
}

$("header").on("click", "button", function() {
    var category = $(this).attr("data-category");
    console.log(category);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=STrsqiGUC2AsGFAUFLvmOUAMxcdUUt6a&limit=10";
    console.log(queryURL);
});

