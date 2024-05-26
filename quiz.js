document.getElementById("start").addEventListener("click", function() {
    document.getElementById("guide").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startQuiz();
});

function startQuiz() {
    let currentQuestion = 0;
    let score = 0;
    let totalQuestions = MCQS.length;
    let timeLeft = 10;  // Temps initial en secondes pour chaque question
    let timer;  // Variable pour stocker l'identifiant du setInterval

    function displayQuestion(questionIndex) {
        clearInterval(timer);  // Assurez-vous d'arrêter le timer précédent avant de démarrer un nouveau
        timeLeft = 10;  // Réinitialiser le temps pour la nouvelle question
        updateTimerDisplay(timeLeft);  // Mettre à jour l'affichage du timer

        let q = MCQS[questionIndex];
        document.getElementById("questionText").textContent = q.question;
        document.getElementById("questionNo").textContent = "Question " + (questionIndex + 1);
        document.getElementById("option1").textContent = q.choice1;
        document.getElementById("option2").textContent = q.choice2;
        document.getElementById("option3").textContent = q.choice3;
        document.getElementById("option4").textContent = q.choice4;

        Array.from(document.getElementsByClassName("choice_que")).forEach((element, index) => {
            element.onclick = () => {
                clearInterval(timer);  // Arrêter le timer lorsqu'une réponse est sélectionnée
                if (index === q.answer) {
                    score++;
                }
                if (currentQuestion < totalQuestions - 1) {
                    currentQuestion++;
                    displayQuestion(currentQuestion);
                } else {
                    showResult();
                }
            };
        });

        timer = setInterval(function() {
            timeLeft -= 1;
            updateTimerDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (currentQuestion < totalQuestions - 1) {
                    currentQuestion++;
                    displayQuestion(currentQuestion);
                } else {
                    showResult();
                }
            }
        }, 1000);
    }

    function updateTimerDisplay(time) {
        document.getElementById("time").textContent = time;
    }

    function showResult() {
        document.getElementById("quiz").style.display = "none";
        let resultEl = document.getElementById("result");
        resultEl.innerHTML = `<h6>Vous avez terminé le quiz</h6>
                              <h6>Votre score est de : ${score} sur ${totalQuestions}</h6>`;

        if (score >= 6) {
            resultEl.innerHTML += "<h6>Bravo! Vous pouvez désormais avoir l'accès au business case.</h6><button id='businessCase'>Business Case</button>";
            document.getElementById("businessCase").addEventListener("click", function() {
                window.location.href = 'businesscase.html';  // Redirige vers la page businesscase.html
            });
        } else {
            resultEl.innerHTML += "<h6>Recommencez le quiz pour pouvoir accéder au business case.</h6><button id='startAgain'>Recommencer</button>";
            document.getElementById("startAgain").addEventListener("click", function() {
                document.getElementById("result").style.display = "none";
                document.getElementById("guide").style.display = "block";
                startQuiz();
            });
        }
        resultEl.style.display = "block";
    }

    function showBusinessCaseModal() {
        let modal = document.createElement("div");
        modal.style.cssText = "position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;";
        let modalContent = document.createElement("div");
        modalContent.style.cssText = "padding: 20px; background: #fff; border-radius: 10px;";
        modalContent.textContent = "Voici les détails du Business Case.";
        let closeButton = document.createElement("button");
        closeButton.textContent = "Fermer";
        closeButton.onclick = () => modal.remove();
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    displayQuestion(currentQuestion);
}
