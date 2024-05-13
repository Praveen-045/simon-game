level= -1;
var user = [];
var gameflow = [];
var color = ["green","red","yellow","blue"];
var started = false;

$(document).keypress(function(){
    if(!started){
    started=true;
    autogame();
    }
})
$(".btn").click(function(){
    if(started){
        btnanimate(this);
        user.push($(this).attr("id"));
        var len = user.length-1;
        if(!(user[len]===gameflow[len])){
            gameover();
        }
        if(len===level){
            user=[];
            autogame()
        }
    }
})
function autogame(){
    setTimeout(function(){
        level++;
        $("#level").text("level - "+level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = color[randomNumber];
        gameflow.push(randomChosenColour);
       console.log(randomChosenColour);
       $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
       },500);
}

function btnanimate(e){
    $(e).addClass("pressed");
    setTimeout(function(){
        $(e).removeClass("pressed");
    },300);
    var sound = new Audio(e.id+".mp3");
    sound.play();
}
function gameover(){
    started = false;
    $("#level").text("Press any key to restart the game");
    gameflow=[];
    level = -1;
    user=[];
    $("body").addClass("game-over");
    sound = new Audio("gameover.mp3");
    sound.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },500);
}
