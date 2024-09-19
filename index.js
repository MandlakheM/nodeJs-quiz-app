const readlineImport = require("readline");
const { questions } = require("./questions.json");

// const questions = [
//   { question: "What's the capital of South Africa?", answer: "Pretoria" },
//   { question: "What is 2 + 2?", answer: "4" },
//   { question: "What is the color of the sky?", answer: "blue" },
// ];
// console.log(questions);

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

  const { question, options } = questions[currentQuestion];

  console.log(`\nQuestion ${currentQuestion + 1}: ${question}`);
  for (const option in options) {
    console.log(`${option}: ${options[option]}`);
  }

  readline.question("Your answer is: ", (answer) => {
    if (answer.toLowerCase() === questions[currentQuestion].answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(
        `Wrong! The correct answer is: ${questions[currentQuestion].answer}`
      );
    }
    currentQuestion++;
    askQuestion();
  });
}

function endQuiz() {
  console.log(`\nQuiz over! Your score: ${score}/${questions.length}`);
  readline.close();
}

console.log(
  "Welcome to the quiz! Let's test your knowledge on React, Redux, and Node.js."
);
askQuestion();
