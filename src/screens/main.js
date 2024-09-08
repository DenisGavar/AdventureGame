const readline = require("readline-sync");
const clear = require("console-clear");
const gameState = require("../gameState");

function mainScreen() {
  clear();
  console.log("--- Adventure Game ---");
  console.log("1. Start New Game");
  console.log("2. Load Game");
  console.log("3. Continue Game");
  console.log("4. Exit");

  const choice = readline.question("Choose an option: ");

  switch (choice) {
    case "1":
      gameState.navigateTo("newGameScreen");
      break;
    case "2":
      gameState.load();
      break;
    case "3":
      gameState.continueGame();
      break;
    case "4":
      exit();
      break;
    default:
      console.log("Invalid option. Please try again.");
      gameState.navigateTo("mainScreen");
  }
}

function exit() {
  // TODO: save the game data, but notto overwrite it with empty data
  process.exit(0);
}

module.exports = { mainScreen };
