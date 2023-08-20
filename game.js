// to store the game pattern 
var gamePattern = [];

// to store the user clicked pattern we create another empty Array
var userClickedPattern = [];

// array having all colours 
var buttonColours = ["red", "blue", "green", "yellow"];

// to check if any of the buttons are clicked 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// the game has not yet started 
var startGame = false;
var level = 0;
$(document).keydown(function () {
   if(!startGame) {
    nextSequence();
    startGame = true;
   }
   $("h2").text("");
});
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // to select the button with the same id 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

// final answer check 
function checkAnswer(currentLevel) {
    // check if the last button clicked is right 
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        var count = 0;
        for(var i = 0; i<gamePattern.length;i++) {
            if(gamePattern[i]===userClickedPattern[i]){
                count++;
                // increments the counts thereby we make use of it when we crosscheck with the last value of the given game pattern
            }
        }
        if(count === gamePattern.length){
            console.log("correct");
            setTimeout(function(){
                nextSequence();
            },1000);
        } }
        else {
            console.log("wrong");
              var wrongAudio = new Audio("sounds/wrong.mp3");
              wrongAudio.play();
              $("body").addClass("game-over");
              setTimeout(function(){
                $("body").removeClass("game-over");
              },200);
              $("h1").text("Game Over");
              $("h2").text("(Press Any Key to Restart)")
              startOver();
    }

}

// reset every variable 
function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
  }