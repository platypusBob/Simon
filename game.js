const redSound = new Audio("./sounds/red.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const errorSound = new Audio("./sounds/wrong.mp3");

let buttonColors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playedSequence = [];
let round = 1;

// Implementation -------------------------------------------------------------

$(document).on("keydown", function(event) {
    if (event.key == "a") {
        playGame(round);
    }
});

// Functions ------------------------------------------------------------------

function generateSequence(size) {
    let randNum = -1;

    for (let i = 0; i < size; i++) {
        randNum = Math.floor(Math.random() * 4);
        sequence.push(buttonColors[randNum]);
    }
}

function flashButton(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function playSequence(sequence) {
    let size = sequence.length;

    for (let a = 0; a < size; a++) {
        setTimeout(function() {
            playSound(sequence[a]);
            flashButton(sequence[a]);
        }, a * 500);
    }
}

function playSound(color) {
    switch (color) {
        case "red":
            redSound.play();
            break;

        case "blue":
            blueSound.play();
            break;

        case "green":
            greenSound.play();
            break;

        case "yellow":
            yellowSound.play();
            break;

        case "error":
            errorSound.play();
            break;
    }
}

function playGame(round) { // round == elements in sequence
    let keysPlayed = 0;

    generateSequence(1);
    playSequence(sequence);

    $(".btn").on("click", function() {
        let lastKey = $(this).attr("id");

        playSound(lastKey);
        flashButton(lastKey);

        keysPlayed++;

        if (lastKey != sequence[keysPlayed - 1]) {
            playSound("error");

            $(".btn").off("click");
            sequence.length = 0;
            round = 1;

            // change h1 to say you lose

            return;
        }

        if (keysPlayed == round) {
            $(".btn").off("click");

            round++;
            
            setTimeout(function() {
                playGame(round);
            }, 1000);
        }
    });
}