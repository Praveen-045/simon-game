level = -1;
var user = [];
var gameflow = [];
var color = ["green", "red", "yellow", "blue"];
var started = false;
var soundEnabled = true; // Added flag to control sound

document.addEventListener('keydown', startGame); 
document.addEventListener('click', startGame);

function startGame() {
    if (!started) {
        started = true;
        autogame();
    }
}

// Handle click events for game buttons
$(".btn").click(function() {
    if (started) {
        btnanimate(this);
        user.push($(this).attr("id"));
        var len = user.length - 1;
        if (!(user[len] === gameflow[len])) {
            gameover();
        }
        if (len === level) {
            user = [];
            autogame();
        }
    }
});

// Auto generate game sequence
function autogame() {
    setTimeout(function() {
        level++;
        $("#level").text("Level - " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = color[randomNumber];
        gameflow.push(randomChosenColour);
        console.log(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        if (soundEnabled) {
            playSound(randomChosenColour);
        }
    }, 500);
}

// Button animation
function btnanimate(e) {
    $(e).addClass("pressed");
    setTimeout(function() {
        $(e).removeClass("pressed");
    }, 300);
    if (soundEnabled) {
        playSound(e.id);
    }
}

// Play the sound associated with a color
function playSound(name) {
    var sound = new Audio(name + ".mp3");
    sound.play();
}

// Handle game over
function gameover() {
    started = false;
    $("#level").text("Game Over! Press any key to restart.");
    gameflow = [];
    level = -1;
    user = [];
    $("body").addClass("game-over");
    if (soundEnabled) {
        var sound = new Audio("gameover.mp3");
        sound.play();
    }
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 500);
}

// Mute or unmute sounds
$("#mute").click(function() {
    soundEnabled = !soundEnabled;
    $(this).text(soundEnabled ? "Mute" : "Unmute");
});
