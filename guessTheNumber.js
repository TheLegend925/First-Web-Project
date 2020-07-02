var largest = 10000; //does not change when guessing
var smallest = 1;
var smallestPossible = smallest; //changes when new ln3 given
var largestPossible = largest;
var guesses = [];
var number = getRndInteger(smallest, largest);
var guessedRight = false;
var validNumber = true;
var tries = 0;
var switchOn = false;
var currentPercentage = 0;

window.onload = function () {
    document.getElementById("header").innerHTML =
        "Guess a number between " + smallest + " and " + largest;

    document.getElementById("guess").addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("guessButton").click();
        }
    });

    /* var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                coll.style.borderRadius = "10px 10px 0 0";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                coll.style.borderRadius = "10px";
            }
        });
    } */
}

function guess() { //when guess button clicked
    var yourGuess = document.getElementById("guess").value;
    var period = yourGuess.indexOf(".");
    var e = yourGuess.indexOf("e");
    guessedRight = false;

    if (switchOn == false) {
        document.getElementById("guess").value = "";
    }

    if (guesses.length == 0) {
        tries = "1 try"
    } else {
        tries = (guesses.length + 1) + " tries"
    }

    if (yourGuess == "") {
        document.getElementById("ln1").innerHTML = "Please type a number";
        validNumber = false;
    } else if (period > -1 || e > -1) {
        document.getElementById("ln1").innerHTML = "Please only type integers"
        validNumber = false;
    } else if (yourGuess < Number(smallestPossible) || yourGuess > Number(largestPossible)) {
        document.getElementById("ln1").innerHTML =
            "Please guess between " + smallestPossible + " and " + largestPossible;
        validNumber = false;
    } else if (yourGuess < number) {
        document.getElementById("ln1").innerHTML = yourGuess + " is too small";
        smallestPossible = yourGuess;
        ln2()
    } else if (yourGuess > number) {
        document.getElementById("ln1").innerHTML = yourGuess + " is too large";
        largestPossible = yourGuess;
        ln2()
    } else if (yourGuess == number) {
        document.getElementById("ln1").innerHTML =
            "The answer is " + number + "!"
        document.getElementById("ln2").innerHTML = "You guessed the number in " + tries + "!";
        document.getElementById("playAgain").innerHTML = "Play Again";
        document.getElementById("guessButton").disabled = true;
        guessedRight = true;
    }

    currentPercentage = 100 - ((largestPossible - smallestPossible) / (largest - smallest) * 100);


    var percentageDisplayed;
    if (currentPercentage >= 99) {
        percentageDisplayed = currentPercentage.toFixed(2);
    } else {
        percentageDisplayed = currentPercentage.toFixed();
    }

    if (percentageDisplayed > 99.99 && guessedRight == false) {
        currentPercentage = 99.99;
    } else if (guessedRight == true) {
        currentPercentage = 100;
    }

    document.getElementById("progressBorder").innerHTML = percentageDisplayed + "%";
    document.getElementById("progress").style.width = currentPercentage - 2 + "%";
    if (currentPercentage > 98 && guessedRight == false) {
        document.getElementById("progress").style.width = "98%";
    }

    var repeatedNumber = guesses.indexOf(yourGuess);
    if (validNumber == true && repeatedNumber == -1) { //adds the guess to the guesses array
        guesses.push(yourGuess)
        document.getElementById("ln3").innerHTML =
            "Your guesses: " + guesses.join(", ");
    }
    validNumber = true;

    function ln2() { //says what the answer is between
        document.getElementById("ln2").innerHTML =
            "The answer is between " + smallestPossible + " and " + largestPossible + ".";
    }

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
}

function revealAnswer() { //when reveal answer button is pressed
    if (guessedRight == false) {
        document.getElementById("ln1").innerHTML = "The answer is " + number;
    }
}

function playAgain() { //when pick another number or play again is pressed
    document.getElementById("guessButton").disabled = false;
    document.getElementById("ln3").innerHTML = "";
    guesses = []
    document.getElementById("playAgain").innerHTML = "Pick another Number";
    document.getElementById("ln1").innerHTML = "New number chosen";
    smallestPossible = smallest;
    largestPossible = largest;
    document.getElementById("ln2").innerHTML = "";
    document.getElementById("guess").value = "";
    if (guessedRight == false) {
        document.getElementById("ln1").innerHTML =
            "New number chosen. The number was " + number + ".";
    }
    number = getRndInteger(smallest, largest);
    currentPercentage = 0
    document.getElementById("progressBorder").innerHTML = currentPercentage + "%"
    document.getElementById("progress").style.width = currentPercentage
}

function setRange() { //after new smallest/largest number is set
    var newSmallestNum = document.getElementById("newSmallestNumber").value;
    var newLargestNum = document.getElementById("newLargestNumber").value;
    if (newSmallestNum != smallest || newLargestNum != largest) {
        smallest = newSmallestNum;
        largest = newLargestNum;
        document.getElementById("header").innerHTML =
            "Guess a number between " + smallest + " and " + largest;
        smallestPossible = smallest;
        largestPossible = largest;
        number = getRndInteger(smallest, largest);
        guessedRight = true;
        playAgain();
        guessedRight = false;
    }
}


function switchClicked() {

    if (switchOn == false) {
        document.getElementById("switch").style.background = "#aed6f1";
        document.getElementById("switchInside").style.margin = "1px 1px 1px 17px";

        switchOn = true;
    } else {
        document.getElementById("switch").style.background = "#ccc";
        document.getElementById("switchInside").style.margin = "1px 10px 1px 1px";
        switchOn = false;
    }
}
