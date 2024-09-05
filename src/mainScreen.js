const readline = require("readline-sync");
const { startNewGame, loadGame, continueGame } = require("./gameEngine");
const saveGameData = require("./save");
const gameState = require("./gameState");

function mainScreen() {
  console.clear();
  console.log("--- Adventure Game ---");
  console.log("1. Start New Game");
  console.log("2. Load Game");
  console.log("3. Continue Game");
  console.log("4. Exit");

  const choice = readline.question("Choose an option: ");

  switch (choice) {
    case "1":
      startNewGame();
      break;
    case "2":
      loadGame();
      break;
    case "3":
      continueGame();
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
  console.log("Saving game data...");
  saveGameData();
  process.exit(0);
}

module.exports = { mainScreen };
