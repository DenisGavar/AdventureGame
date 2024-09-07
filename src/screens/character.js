const readline = require("readline-sync");
const gameState = require("../gameState");

function characterScreen() {
  console.clear();

  gameState.getCharacter().displayStats();

  console.log("\nOptions:");
  console.log("1. Save Game");
  console.log("2. Fight!");
  console.log("3. Play the Guess the number game and restore HP");
  console.log("4. Back to Main Menu");

  const choice = readline.question("Choose an option: ");

  switch (choice) {
    case "1":
      gameState.save();
      gameState.navigateTo("characterScreen");
      break;
    case "2":
      gameState.navigateTo("fightScreen");
      break;
    case "3":
      gameState.navigateTo("guessingGame");
      break;
    case "4":
      gameState.navigateTo("mainScreen");
      break;
    default:
      console.log("Invalid option.");
      gameState.navigateTo("characterScreen");
  }
}

module.exports = { characterScreen };
