const readlineImport = require("readline");

const questions = [
  { question: "What's the capital of South Africa?", answer: "Pretoria" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the color of the sky?", answer: "blue" },
];

let currentQuestion = 0;
let score = 0;

const readline = readlineImport.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }

  const { question } = questions[currentQuestion];

  readline.question(`${question} `, (answer) => {
    if (
      answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()
    ) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Wrong!");
    }
    currentQuestion++;
    askQuestion();
  });
}

function endQuiz() {
  console.log(`Quiz over! Your score: ${score}/${questions.length}`);
  readline.close();
}

console.log("Welcome to the quiz! Lets test out your JavaScript knowledge");
askQuestion();
