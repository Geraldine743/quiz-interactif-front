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