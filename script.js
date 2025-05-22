//Recupération des questions
let currentQuestionIndex = 0
let questions = []
let selectedDifficulty = ""
let score = 0

async function loadQuestions(difficulty) {
    try{
        const response = await fetch ("questions.json")
        const allQuestions = await response.json()
        questions = allQuestions.filter((q)=>q.difficulty === difficulty)
        selectedDifficulty = difficulty
        currentQuestionIndex = 0
        startQuiz()
    }catch(error){
        console.log("Erreur lors du chargement des questions", error)
    }
}

//Demarrer le quiz
function startQuiz(){
    document.querySelector(".difficulty-selection").classList.add("hidden")
    document.getElementById("quiz-container").classList.remove("hidden")
    showQuestion()
}

//Afficher le quiz
function showQuestion(){
    if(currentQuestionIndex<questions.length){
        const questionData = questions[currentQuestionIndex]
        
        const questionContainer = document.getElementById("quiz-container")
        questionContainer.innerHTML = `
        <div class="question">
            <p>${questionData.question}</p>
        </div>
        <form id="quiz-form">
            ${questionData.options
                .map(
                    (option, index) =>
                    `
                    <label class="option">
                    <input type="radio" name="answer" value="${option}">
                    <span class="custom-radio"></span>
                    ${option}</label>
                    `
                )
                .join("")
            }
            <button type="button" onclick="submitAnswer()">Soumettre</button>
        </form>
        `
    }else{
        showFinalResult()
    }
}

function submitAnswer(){
    const form = document.getElementById("quiz-form")
    const selectedAnswer = form.answer.value
    if(!selectedAnswer){
        alert("Veuillez selectionner une réponse.")
        return
    }
    checkAnswer(selectedAnswer)
    currentQuestionIndex++
    showQuestion()
}


function checkAnswer(selectedAnswer){
    const currentQuestion = questions[currentQuestionIndex]
    if(selectedAnswer === currentQuestion.answer){
        incrementScore()
    }
}

function incrementScore(){
    score++
}

function showFinalResult(){
    const quizContainer = document.getElementById("quiz-container")
    quizContainer.innerHTML=`
        <div id="result">
            <p>Votre score final est de ${score} sur ${questions.length}.</p>
        </div>
    `
}

document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click",function(){
        const level = btn.getAttribute("data-level")
        loadQuestions(level)
    })
})

//Au moment de charger la page, on verifier si l'utilisateur est dans le localStorage et on l'affiche sur la page d'accueil
function showUserMenu (username){
    const usernameDisplay = document.getElementById("username-display")
    usernameDisplay.textContent = username
}
document.addEventListener("DOMContentLoaded", function(){
    const storedUsername = localStorage.getItem("username")
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if(storedUsername && isAuthenticated === "true"){
        showUserMenu(storedUsername)
    }else{
        window.location.href = "login.html"
    }
})

//Verification si l'utilisateur est déjà connecter
function checkAuth(){
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if(isAuthenticated !== "true"){
        alert("Veuillez vous connecter pour accèder au quizz.")
        window.location.href = "login.html"
    }
}

//Fonctionnalité deconnexion
document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href = "login.html"
})





