const readlineImport = require("readline");
const { questions } = require("./questions.json");

// console.log(questions);

let currentQuestion = 0;
let score = 0;
const timePerQuestion = 15;
const totalQuizDuration = 95;
let remainingTimeForQuestion = timePerQuestion;
let remainingTimeForQuiz = totalQuizDuration;

const readline = readlineImport.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let questionInterval;
let quizInterval;

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

  remainingTimeForQuestion = timePerQuestion;
  questionInterval = setInterval(() => {
    remainingTimeForQuestion--;
    process.stdout.write(
      `\rTime left for this question: ${remainingTimeForQuestion}s `
    );

    if (remainingTimeForQuestion <= 0) {
      clearInterval(questionInterval);
      console.log("\nTime's up for this question!");
      currentQuestion++;
      askQuestion();
    }
  }, 1000);

  readline.question("\nYour answer is: ", (answer) => {
    clearInterval(questionInterval);

    if (answer.toLowerCase() === questions[currentQuestion].answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Wrong!!");
    }
    currentQuestion++;
    askQuestion();
  });
}

function endQuiz() {
  clearInterval(quizInterval);
  console.log(`\nQuiz over! Your score: ${score}/${questions.length}`);
  readline.close();
}

function startQuiz() {
  console.log(
    "Welcome to the quiz! Let's test your knowledge on React, Redux, and Node.js."
  );

  quizInterval = setInterval(() => {
    remainingTimeForQuiz--;
    // process.stdout.write(
    //   `\rTotal time left for the quiz: ${remainingTimeForQuiz}s `
    // );

    if (remainingTimeForQuiz <= 0) {
      clearInterval(quizInterval);
      console.log("\nTime's up for the entire quiz!");
      endQuiz();
    }
  }, 1000);

  askQuestion();
}

startQuiz();
