let questions = [{
    question: "What is the baby of a Moth known as?",
    choices: ["Baby", "Infant", "Kit", "Larva"],
    correctAnswer: 3
}, {
    question: "What is the adult of a kid called?",
    choices: ["Calf", "Doe", "Goat", "Chick"],
    correctAnswer: 2
}, {
    question: "What is young of a Buffalo called?",
    choices: ["Calf", "Baby", "Pup", "Cow"],
    correctAnswer: 0
}, {
    question: "What is a baby Aligator called?",
    choices: ["Baby", "Gator", "Hatchling", "Calf"],
    correctAnswer: 2
}, {
    question: "What is a baby Goose called?",
    choices: ["Gooser", "Gosling", "Geezer", "Pup"],
    correctAnswer: 1
}, {
    question: "What is a baby Hamster called?",
    choices: ["Pup", "Mare", "Chick", "Hamsterling"],
    correctAnswer: 0
}
]

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

$(document).ready(function () {
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".nextButton").on("click", function() {
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer!");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion() {
    console.log("In display current Question");

    let question = questions[currentQuestion].question;
    let questionClass = $(document).find(".quizContainer > .question");
    let choiceList = $(document).find(".quizContainer > .choiceList");
    let numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    let choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}