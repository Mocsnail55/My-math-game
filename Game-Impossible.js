var num1 = document.querySelector(".num1");
var num2 = document.querySelector(".num2");
var operator = document.querySelector(".operator");
var input = document.querySelector(".answer");

document.querySelector(".input-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.querySelector("button").click();
    }
});


window.addEventListener('beforeunload', () => {
    console.log('User clicked back button');
     resetGame();
     
});

const startingMinutes = 4;
let time = startingMinutes * 60;
const countdownEl = document.getElementById("Timer");

let correctAnswers = localStorage.getItem("correctAnswers") 
    ? parseInt(localStorage.getItem("correctAnswers")) 
    : 0; 

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time > 0) {
        time--; 
    } else {
        clearInterval(timerInterval);
        alert("Time is up!");
        resetGame();
    }
}

updateCountdown(); 
const timerInterval = setInterval(updateCountdown, 1000);

function randomQuestion() {
    let randomNum1 = Math.floor(Math.random() * 50);
    let randomNum2 = Math.floor(Math.random() * 50);
    let operators = ["+", "-", "x"];
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    operator.textContent = randomOperator;
    num1.textContent = randomNum1;
    num2.textContent = randomNum2;
}

randomQuestion();

function checkAnswer() {
    let number1 = parseInt(num1.textContent);
    let number2 = parseInt(num2.textContent);
    let op = operator.textContent;
    let userAnswer = parseInt(input.value);

    let correctAnswer;
    if (op === "+") {
        correctAnswer = number1 + number2;
    } else if (op === "-") {
        correctAnswer = number1 - number2;
    } else if (op === "x") {
        correctAnswer = number1 * number2;
    } 

    if (userAnswer === correctAnswer) {
        correctAnswers++;
        questions.innerHTML++;
        localStorage.setItem("correctAnswers", correctAnswers); 
        alert(`Correct! ${correctAnswers}/25`);

        if (correctAnswers >= 25) {
            clearInterval(timerInterval);
            alert("You win! You answered 25 questions correctly.");
            resetGame();
        } else {
            input.value = ""; 
            randomQuestion(); 
        }
    } else {
        alert("Wrong! Try again.");
    }
}


function resetGame() {
    localStorage.removeItem("correctAnswers"); 
    window.location.href = "./index.html";
}
