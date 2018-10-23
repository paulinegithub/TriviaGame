$(document).ready(function () {

    // trivia bank and answer key
    var triviaKey = [{
            question: "question 0",
            options: ["a. hi", "b. no", "c. what", "d. dude"],
            answer: 0
        },
        {
            question: "question 1",
            options: ["a. all", "b. five", "c. two", "d. one"],
            answer: 1
        },
        {
            question: "question 2",
            options: ["a. red", "b. blue", "c. green", "d. yellow"],
            answer: 2
        },
        {
            question: "question 3",
            options: ["a. yes", "b. no", "c. maybe", "d. I don't know"],
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
    var timer;
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
            clearInterval(timer);
            results();
        }
    }


    // function to count down 1 second at a time
    function startTimer() {
        console.log("timer started");
        $("#timer").html(secsLeft + "s");
        timer = setInterval(timeOut, 1000);
    }


    // function to spawn next question
    function nextQuestion() {
        activeQ = triviaKey[questionCount];
        console.log("question" + questionCount + "loaded");
        startTimer();

        $("#result").empty();
        $("#question").html(activeQ.question);

        // spawn options for active question
        for (var i = 0; i < activeQ.options.length; i++) {
            var eachOption = $("<div>");
            eachOption.text(activeQ.options[i]);
            eachOption.attr({
                "data-index": i
            });
            eachOption.addClass("selection");
            $("#options").append(eachOption);
        }

        // go to results page when an answer is pressed
        $(".selection").on("click", function () {
            selected = $(this).data("index");
            clearInterval(timer);
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

        // show results
        if (selected === activeQ.answer) {
            $('#result').html("You got it! The answer was <BR>" + targetAnswer);
            numAnsRight++;
        } else if (selected != activeQ.answer) {
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
        $("#result").append("GAME OVER!");
        $("#result").append("Number correct:" + numAnsRight);
        $("#result").append("Number wrong:" + numAnsWrong);
        $("#result").append("Number timed out:" + numTimedOut);

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