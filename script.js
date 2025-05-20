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

// fonctionnalité deconnexion
document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href = "login.html"
})