const readline = require("readline-sync");
const clear = require("console-clear");
const gameState = require("../gameState");

// Function to fetch a quiz question from
// https://quizapi.io
async function fetchQuizQuestion() {
  try {
    // Fetch a question from QuizAPI
    const apiKey = "UEbmdLChjfvcJPOzDJqMO2qtQ5UIl9jSyp7dxW8D"; // UNSAVE!!!
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?limit=1&apiKey=${apiKey}`
    );
    const data = await response.json();

    // Extract the first question from the response
    const question = data[0];
    return question;
  } catch (err) {
    console.error("Error fetching quiz question:", err.message);
    return null;
  }
}

async function quizScreen() {
  clear();
  console.log("Welcome to the Quiz game!");
  console.log("Answer the question correctly to stay alive!");

  console.log("\nOptions:");
  console.log("1. Play");
  console.log("2. Exit (and die)");

  const pattern = /^(1|2)$/;
  let choice = 0;
  do {
    choice = readline.question("Choose an option: ");
  } while (!pattern.test(choice));

  switch (choice) {
    case "1":
      // Play the game
      const question = await fetchQuizQuestion();

      // Something went wrong
      if (!question) {
        console.log("Failed to load a question.");
        return;
      }

      // Display the question
      console.log(`\nQuestion: ${question.question}`);
      const answers = question.answers;
      const correctAnswers = question.correct_answers;

      // Display possible answers
      const options = Object.entries(answers)
        .filter(([key, value]) => value !== null)
        .map(([key, value], index) => `${index + 1}. ${value}`);

      options.forEach((option) => console.log(option));

      // Generate the pattern based on the number of options
      const pattern = new RegExp(`^[1-${options.length}]$`);
      let choice = 0;
      do {
        choice = readline.question("Choose an option: ");
      } while (!pattern.test(choice));

      // 
      const selectedAnswerKey = Object.keys(answers)[choice - 1];

      if (correctAnswers[`${selectedAnswerKey}_correct`] === "true") {
        // Right answer
        console.log("Correct! You survived!");
        gameState.getCharacter().health = 1;
      } else {
        // Wrong answer
        console.log("Incorrect! You have been defeated.");
        gameState.setCharacter(null);
      }

      break;
    case "2":
      gameState.setCharacter(null);
      break;
    default:
      console.log("Invalid option.");
      gameState.navigateTo("quizScreen");
  }
}

module.exports = { quizScreen };
