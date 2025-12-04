const questions = [
    {
        question: "Qual o meu nome",
        answers: [
            {id: 1, text: "Beto", correct:true},
            {id: 2, text: "Marçal JS", correct:false},
            {id: 3, text: "Cristiano", correct:false},
            {id: 4, text: "Ministro Alexandre de Moraes", correct:false},
        ],
    },
    {
        question: "O que é ecologia?",
        answers: [
            {id: 1, text: "Estudo das massas", correct:false},
            {id: 2, text: "Estudo dos seres vivos e ambiente", correct:true},
            {id: 3, text: "Estudo dos números", correct:false},
            {id: 4, text: "Estudo dos morcegos", correct:false},
        ],
    },
    {
        question: "O que é preservar a natureza?",
        answers: [
            {id: 1, text: "Cuidar do meio ambiente", correct:true},
            {id: 2, text: "Queimar árvores", correct:false},
            {id: 3, text: "Matar animais", correct:false},
            {id: 4, text: "Contrabandear animais na fronteira", correct:false},
        ],
    },
] 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.id = answer.id;
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Avançar";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", () => {
        window.location.href = "posTutorial.html";
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    handleNextButton();
});

startQuiz();

// Seleciona elementos
const openBtn = document.getElementById("openPopup"); // botão da porta
const overlay = document.getElementById("popupOverlay"); // fundo escuro
const yesBtn = document.getElementById("yesBtn"); // botão "Sim"
const noBtn = document.getElementById("noBtn");   // botão "Não"

// Abrir pop-up
openBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Fechar pop-up no botão "Não"
noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Redirecionar ao clicar em "Sim"
yesBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // ajuste o link da sua página inicial
});

// Fechar clicando fora da caixa
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});