var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); 
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    // esta fue mi solucion
    // checkAnswer(buttonColours.indexOf(userChosenColour));
});

$(document).keydown(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * (4) + 0);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }


    // esta fue mi solucion
    // if(buttonColours[currentLevel] === gamePattern[gamePattern.length - 1] ){
    //     console.log("success");
    // }
    // else {
    //     console.log("wrong");
    // }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}





