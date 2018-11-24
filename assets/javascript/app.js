$(document).ready(function () {

    // trivia bank and answer key
    var triviaKey = [{
            question: "What animal goes moo?",
            options: ["a. cow", "b. dog", "c. cat", "d. sheep"],
            answer: 0
        },
        {
            question: "Which of the following is a prime number?",
            options: ["a. one", "b. two", "c. four", "d. nine"],
            answer: 1
        },
        {
            question: "Which color is not in the rainbow?",
            options: ["a. red", "b. blue", "c. brown", "d. yellow"],
            answer: 2
        },
        {
            question: "How many tentacles does a octopus have?",
            options: ["a. eight", "b. six", "c. ten", "d. they actually have two legs and six arms"],
            answer: 3
        }
    ];


    // test calls to the trivia bank
    // for (var i = 0; i < triviaKey.length; i++) {
    //     console.log("question: " + triviaKey[i].question);
    //     console.log("option 1: " + triviaKey[i].options[0]);
    //     console.log("option 2: " + triviaKey[i].options[1]);
    //     console.log("option 3: " + triviaKey[i].options[2]);
    //     console.log("option 4: " + triviaKey[i].options[3]);
    //     console.log("answer: " + triviaKey[i].options[triviaKey[i].answer]);
    // }


    // set up initial variables
    var numAnsRight = 0;
    var numAnsWrong = 0;
    var numTimedOut = 0;
    var questionCount = 0;
    var secsLeft = 10;
    var timerOn;
    var choice;
    var targetAnswer;


    // function to count down 1 second at a time
    function startTimer() {
        $("#timer").html(secsLeft + "s");
        timerOn = setInterval(timeOut, 1000);
    }


    // helper function to time out when no answer is pressed
    function timeOut() {
        secsLeft--;

        $("#timer").html(secsLeft + "s");

        console.log(secsLeft + "s left");

        if (secsLeft < 1) {
            clearInterval(timerOn);
            results();
        }
    }


    // function to spawn next question
    function nextQuestion() {
        console.log("question " + questionCount + " loaded");
        startTimer();

        $("#result").empty();
        $("#question").html(triviaKey[questionCount].question);

        // spawn options for active question
        for (var i = 0; i < triviaKey[questionCount].options.length; i++) {
            var eachOption = $("<button>");
            eachOption.text(triviaKey[questionCount].options[i]);
            eachOption.attr("value", i);
            eachOption.attr("type", "button");
            eachOption.addClass("btn btn-light choice");
            $("#options").append(eachOption);
            $("#options").append("<br>");
            console.log("index value: " + eachOption.attr("value"));
        }

        // go to results page when an answer is pressed
        $(".choice").on("click", function () {
            choice = parseInt($(this).attr("value"));
            console.log("index of choice: " + choice);
            clearInterval(timerOn);
            results();
        });
    }


    // function to show correct answer
    function results() {
        targetAnswer = triviaKey[questionCount].options[triviaKey[questionCount].answer];
        console.log("index of target: " + triviaKey[questionCount].answer);
        console.log("target answer: " + targetAnswer);
        console.log("results loaded");
        // clear question, options and timer
        $("#question").empty();
        $("#options").empty();
        $("#timer").empty();
        $("#result").empty();

        // show results
        if (choice === triviaKey[questionCount].answer) {
            $('#result').html("You got it! The answer was <BR><BR>" + targetAnswer);
            numAnsRight++;
        } else if (secsLeft < 1) {
            $('#result').html("Time's up! The answer was <BR><BR> " + targetAnswer);
            numTimedOut++;
        } else {
            $('#result').html("Sorry, the answer was <BR><BR>" + targetAnswer);
            numAnsWrong++;
        }

        // go to next question if there are more
        if (questionCount < triviaKey.length - 1) {
            questionCount++;
            secsLeft = 10;
            setTimeout(nextQuestion, 2000);
        }

        // finish game if no more questions
        else {
            secsLeft = 10;
            setTimeout(endGame, 2000);
        }
    }


    // function to show final results
    function endGame() {
        console.log("game ended");

        // clear timer and result
        $("#timer").empty();
        $("#result").empty();

        // show final scores
        $("#result").append("<h2>GAME OVER! <h2>");
        $("#result").append("Number correct: " + numAnsRight);
        $("#result").append("<BR>Number wrong: " + numAnsWrong);
        $("#result").append("<BR> Number timed out: " + numTimedOut);

        // show button to restart game
        $("#restart-btn").show();
    }


    // Start the game when "Start" button is pressed
    $("#start-btn").on("click", function () {
        $(this).hide();
        reset();
    });


    // restart game when "Restart" button is pressed
    $('#restart-btn').on('click', function () {
        $(this).hide();
        reset();
    });


    // function to start game by spawning first question
    function reset() {
        numAnsRight = 0;
        numAnsWrong = 0;
        numTimedOut = 0;
        questionCount = 0;
        nextQuestion();
        console.log("game started");
    }

    //  hide restart button when page first loads
    $("#restart-btn").hide();

});