//Recupération des questions
let currentQuestionIndex = 0
let questions = []
let selectedDifficulty = ""

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
                    <label type="radio" name="answer" value="${option}">${option}</label>
                    `
                )
                .join("")
            }
            <button type="button" onClick="">Soumettre</button>
        </form>
        `
    }
}

//Gestion du quiz
function calculateScore (callback){
    const correctAnswers = {
        q1:"Paris",
        q2:"Mercure",
        q3:"Jupiter"
    }

    const form = document.getElementById("quiz-form")
    let score = 0

    for(const question in correctAnswers){
        const userAnswer = form[question].value
        if(userAnswer === correctAnswers[question]){
            score++
        }
    }
    callback(score)
}

function displayResult(score, callback){
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = `Votre score est de ${score}.`
    callback(score)
}

function handleMessage(score){
    const resultDiv = document.getElementById("result")
    resultDiv.classList.remove("excellent","good","try-again")
    if(score === 3){
        resultDiv.innerHTML += "<br> Excellent !"
        resultDiv.classList.add("excellent")
    }else if (score === 2){
        resultDiv.innerHTML += "<br> Bon travail, vous pouvez vous améliorer !"
        resultDiv.classList.add("good")
    }else{
        resultDiv.innerHTML += "<br> Vous pouvez faire mieux !"
        resultDiv.classList.add("try-again")
    }
}

function submitQuiz(){
    calculateScore(function(score){
        displayResult(score, function(){
            handleMessage(score)
        })
    })
}

//Verification si l'utilisateur est déjà connecter
function checkAuth(){
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if(isAuthenticated !== "true"){
        alert("Veuillez vous connecter pour accèder au quizz.")
        window.location.href = "login.html"
    }
}

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

//Fonctionnalité deconnexion
document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href = "login.html"
})



document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click",function(){
        const level = btn.getAttribute("data-level")
        loadQuestions(level)
    })
})

