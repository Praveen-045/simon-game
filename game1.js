level = -1;
var user = [];
var gameflow = [];
var color = ["green", "red", "yellow", "blue"];
var started = false;
var soundEnabled = true;
var videoElement = document.getElementById("bg-video");

document.addEventListener('keydown', startGame); 
document.addEventListener('click', startGame);

function startGame() {
    if (!started) {
        started = true;
        // Show the video and hide the background image
        document.body.style.backgroundImage = 'none';  // Remove background image
        videoElement.style.opacity = 1;  // Fade in the video
        videoElement.play();  // Start playing the video

        autogame();  // Start the game
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
        // Lower the video volume while playing
        videoElement.volume = 0.1;  // Lower video volume to 10%
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

        // Change video with smooth transition
        changeBackgroundVideo(level);
        
        // After the game sequence, restore the video volume
        videoElement.volume = 1.0;  // Set volume back to 100%
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

// Change the background video with a smooth fade transition
function changeBackgroundVideo(level) {
    setTimeout(function() {
        if (level === 0) {
            videoElement.style.opacity = 0;// Wait for the fade out transition to complete before changing video source
            videoElement.src = "fight1.mp4"; // Change to another fight video
            videoElement.load(); // This reloads the video to ensure the new source is properly loaded
            videoElement.muted = false; // Ensure sound is enabled
            videoElement.play();
            videoElement.style.opacity = 1; // Fade the video back in
        } else if (level === 10) {
            videoElement.style.opacity = 0;// Wait for the fade out transition to complete before changing video source
            videoElement.src = "fight2.mp4"; // Change to another fight video
            videoElement.load(); // This reloads the video to ensure the new source is properly loaded
            videoElement.muted = false; // Ensure sound is enabled
            videoElement.play();
            videoElement.style.opacity = 1; // Fade the video back in
        }
        else if (level === 20) {
            videoElement.style.opacity = 0;// Wait for the fade out transition to complete before changing video source
            videoElement.src = "fight3.mp4"; // Change to another fight video
            videoElement.load(); // This reloads the video to ensure the new source is properly loaded
            videoElement.muted = false; // Ensure sound is enabled
            videoElement.play();
            videoElement.style.opacity = 1; // Fade the video back in
        }
        // Add more conditions for other levels if necessary
    }, 1000);  // Match the transition duration (1s) before changing video source
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
