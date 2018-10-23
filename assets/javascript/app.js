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
            options: ["a. five", "b. six", "c. ten", "d. eight"],
            answer: 3
        }
    ];


    // test calls to the trivia bank
    for (var i = 0; i < triviaKey.length; i++) {
        console.log("question: " + triviaKey[i].question);
        console.log("option 1: " + triviaKey[i].options[0]);
        console.log("option 2: " + triviaKey[i].options[1]);
        console.log("option 3: " + triviaKey[i].options[2]);
        console.log("option 4: " + triviaKey[i].options[3]);
        console.log("answer: " + triviaKey[i].options[triviaKey[i].answer]);
    }


    // set up initial variables
    var numAnsRight = 0;
    var numAnsWrong = 0;
    var numTimedOut = 0;
    var questionCount = 0;
    var secsLeft = 10;
    var timerOn;
    var selected;
    var activeQ;
    var targetAnswer;


    // function to start game by spawning first question
    function newGame() {
        $("#question").empty();
        numAnsRight = 0;
        numAnsWrong = 0;
        numTimedOut = 0;
        questionCount = 0;
        secsLeft = 10;
        console.log("game started");
        nextQuestion();
    }


    // helper function to time out when no answer is pressed
    function timeOut() {
        $("#timer").html(secsLeft + "s");

        console.log("secsLeft" + secsLeft);

        secsLeft--;

        if (secsLeft === 0) {
            clearInterval(timerOn);
            results();
        }
    }


    // function to count down 1 second at a time
    function startTimer() {
        console.log("timer started");
        $("#timer").html(secsLeft + "s");
        timerOn = setInterval(timeOut, 1000);
    }


    // function to spawn next question
    function nextQuestion() {
        console.log("question" + questionCount + "loaded");
        startTimer();

        $("#result").empty();
        $("#question").html(triviaKey[questionCount].question);

        // spawn options for active question
        for (var i = 0; i < triviaKey[questionCount].options.length; i++) {
            var eachOption = $("<div>");
            eachOption.text(triviaKey[questionCount].options[i]);
            eachOption.val(i);
            eachOption.addClass("selection");
            $("#options").append(eachOption);
        }

        // go to results page when an answer is pressed
        $(".selection").on("click", function () {
            selected = $(this).val();
            clearInterval(timerOn);
            results();
        });
    }


    // function to show correct answer
    function results() {
        targetAnswer = triviaKey[questionCount].options[triviaKey[questionCount].answer];
        console.log("results loaded");
        // clear question, options and timer
        $("#question").empty();
        $("#options").empty();
        $("#timer").empty();
        $("#result").empty();
        
        // show results
        if (selected === triviaKey[questionCount].answer) {
            $('#result').html("You got it! The answer was <BR>" + targetAnswer);
            numAnsRight++;
        } else if (selected != triviaKey[questionCount].answer) {
            $('#result').html("Sorry, the answer was <BR>" + targetAnswer);
            numAnsWrong++;
        } else {
            $('#result').html("Time's up! The answer was <BR> " + targetAnswer);
            numTimedOut++;
        }

        // go to next question or finish game
        if (questionCount < triviaKey.length - 1) {
            questionCount++;
            setTimeout(nextQuestion, 3000);
        } else {
            setTimeout(endGame, 3000);

            $("#timer").html(secsLeft + "s");

            console.log("secsLeft" + secsLeft);

            secsLeft--;
        }
    }


    // function to show final results
    function endGame() {
        console.log("game ended");
        $("#result").append("GAME OVER! <BR>");
        $("#result").append("Number correct:" + numAnsRight);
        $("#result").append("<BR>Number wrong:" + numAnsWrong);
        $("#result").append("<BR> Number timed out:" + numTimedOut);

        // create button to restart game
        $("#restart-btn").show();
    }

    // Start the game when "Start" button is pressed
    $("#start-btn").on("click", function () {
        $(this).hide();
        newGame();
    });

    // restart game when "Restart" button is pressed
    $('#restart-btn').on('click', function () {
        $(this).hide();
        newGame();
    });

    $("#restart-btn").hide();

});