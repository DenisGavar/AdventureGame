const readline = require("readline-sync");
const saveGameData = require("./save");
const gameState = require("./gameState");

function characterScreen() {
  console.clear();
  gameState.getCharacter().displayStats();

  console.log("\nOptions:");
  console.log("1. Save Game");
  console.log("2. Back to Main Menu");

  const choice = readline.question("Choose an option: ");

  switch (choice) {
    case "1":
      saveGameData();
      break;
    case "2":
      gameState.navigateTo('mainScreen');
      break;
    default:
      console.log("Invalid option.");
      characterScreen();
  }
}

module.exports = { characterScreen };
