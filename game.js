
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []
let randomChosenColour="";

let userClickedPattern = [];

let level = 0;
let started=false;

// start game
$(document).on("keypress",function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})


// random choice
function nextSequence(){
    userClickedPattern =[];


    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour)

}

// user choice
$(".btn").on("click",function(event){
    let userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
      //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
})

// sound
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);   

}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
       if(userClickedPattern.length===gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        },1000)
       }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

    
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
    }

}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}