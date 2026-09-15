const questions = [

    {
        question: "Qual é considerada a maior flor individual do mundo?",
        image: "🌺",
        answers: [
            "Rosa",
            "Rafflesia arnoldii",
            "Girassol",
            "Tulipa"
        ],
        correct: 1
    },

    {
        question: "Qual flor é conhecida por acompanhar o movimento do sol?",
        image: "🌻",
        answers: [
            "Girassol",
            "Orquídea",
            "Lírio",
            "Margarida"
        ],
        correct: 0
    },

    {
        question: "Qual dessas flores é muito associada ao amor e ao romance?",
        image: "🌹",
        answers: [
            "Lavanda",
            "Rosa",
            "Jasmim",
            "Hortênsia"
        ],
        correct: 1
    },

    {
        question: "Qual flor é conhecida por ter uma grande variedade de cores e espécies?",
        image: "🌷",
        answers: [
            "Tulipa",
            "Girassol",
            "Dália",
            "Cravo"
        ],
        correct: 0
    },

    {
        question: "Qual dessas plantas produz flores e também é muito usada como tempero?",
        image: "🌿",
        answers: [
            "Manjericão",
            "Samambaia",
            "Pinheiro",
            "Musgo"
        ],
        correct: 0
    },

    {
        question: "Qual flor é famosa por seu perfume e costuma ser usada na produção de perfumes?",
        image: "💜",
        answers: [
            "Lavanda",
            "Girassol",
            "Papoula",
            "Dália"
        ],
        correct: 0
    },

    {
        question: "A qual grupo pertence a maioria das plantas que produzem flores?",
        image: "🌼",
        answers: [
            "Briófitas",
            "Pteridófitas",
            "Angiospermas",
            "Algas"
        ],
        correct: 2
    },

    {
        question: "Qual flor é frequentemente associada à paz?",
        image: "🕊️",
        answers: [
            "Rosa vermelha",
            "Lírio branco",
            "Tulipa preta",
            "Girassol"
        ],
        correct: 1
    },

    {
        question: "Qual dessas flores possui espinhos em seu caule?",
        image: "🌹",
        answers: [
            "Rosa",
            "Margarida",
            "Orquídea",
            "Violeta"
        ],
        correct: 0
    },

    {
        question: "Qual é a principal função das flores nas plantas com flores?",
        image: "🌸",
        answers: [
            "Produzir sombra",
            "Realizar a reprodução",
            "Absorver água",
            "Produzir raízes"
        ],
        correct: 1
    }

];


// ELEMENTOS

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const currentQuestion = document.getElementById("currentQuestion");
const totalQuestions = document.getElementById("totalQuestions");

const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");
const answersContainer = document.getElementById("answers");

const progressBar = document.getElementById("progressBar");

const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("finalScore");
const correctAnswers = document.getElementById("correctAnswers");
const wrongAnswers = document.getElementById("wrongAnswers");
const percentage = document.getElementById("percentage");

const resultMessage = document.getElementById("resultMessage");
const resultDetails = document.getElementById("resultDetails");


// VARIÁVEIS

let questionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;


// INICIAR QUIZ

startButton.addEventListener("click", startQuiz);

function startQuiz() {

    questionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;

    scoreText.textContent = "0";

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    quizScreen.classList.add("active");

    totalQuestions.textContent = questions.length;

    showQuestion();
}


// MOSTRAR PERGUNTA

function showQuestion() {

    const question = questions[questionIndex];

    currentQuestion.textContent = questionIndex + 1;

    questionText.textContent = question.question;

    questionImage.textContent = question.image;

    feedback.textContent = "";
    feedback.className = "feedback";

    const progress =
        ((questionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer-button");

        button.innerHTML = `
            <span class="answer-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>${answer}</span>
        `;

        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });

        answersContainer.appendChild(button);

    });

}


// VERIFICAR RESPOSTA

function checkAnswer(selectedIndex, selectedButton) {

    const question = questions[questionIndex];

    const buttons =
        document.querySelectorAll(".answer-button");


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selectedIndex === question.correct) {

        selectedButton.classList.add("correct");

        score += 100;

        correctCount++;

        scoreText.textContent = score;

        feedback.textContent =
            "🌸 Muito bem! Você acertou!";

        feedback.classList.add("correct-text");

    } else {

        selectedButton.classList.add("wrong");

        buttons[question.correct].classList.add("correct");

        wrongCount++;

        feedback.textContent =
            "🌱 Quase! A resposta correta está marcada.";

        feedback.classList.add("wrong-text");

    }


    setTimeout(nextQuestion, 1300);

}


// PRÓXIMA PERGUNTA

function nextQuestion() {

    questionIndex++;

    if (questionIndex >= questions.length) {

        showResult();

    } else {

        showQuestion();

    }

}


// RESULTADO

function showResult() {

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScore.textContent = score;

    correctAnswers.textContent = correctCount;

    wrongAnswers.textContent = wrongCount;


    const percent = Math.round(
        (correctCount / questions.length) * 100
    );

    percentage.textContent = `${percent}%`;


    if (percent === 100) {

        resultMessage.textContent = "🌺 Perfeito!";

        resultDetails.textContent =
            "Você mostrou que entende muito de flores.";

    }

    else if (percent >= 80) {

        resultMessage.textContent = "🌷 Excelente!";

        resultDetails.textContent =
            "Você foi muito bem no quiz.";

    }

    else if (percent >= 60) {

        resultMessage.textContent = "🌼 Muito bom!";

        resultDetails.textContent =
            "Você já sabe bastante sobre flores.";

    }

    else if (percent >= 40) {

        resultMessage.textContent = "🌱 Continue tentando!";

        resultDetails.textContent =
            "Você pode aprender ainda mais sobre o mundo das flores.";

    }

    else {

        resultMessage.textContent = "🌿 Hora de estudar!";

        resultDetails.textContent =
            "Que tal conhecer mais curiosidades sobre flores?";

    }

}


// JOGAR NOVAMENTE

restartButton.addEventListener("click", startQuiz);