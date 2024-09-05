const readline = require("readline-sync");
const _ = require("lodash");
const Character = require("./character");
const CharacterClass = require("./class");
const loadGameData = require("./load");
const gameState = require("./gameState");

function startNewGame() {
  console.clear();
  console.log("--- New Game ---");

  // Create a new character
  const name = readline.question("Enter your character's name: ");
  const age = readline.questionInt("Enter your character's age: ");

  // Choose a class
  const classChoice = readline.keyInSelect(
    ["Mage", "Fighter"],
    "Choose your class: "
  );
  const classTypes = ["Mage", "Fighter"];
  const abilities = ["Fireball", "Sword Slash"];
  const chosenClass = new CharacterClass(
    classTypes[classChoice],
    abilities[classChoice]
  );

  // Create the character
  let currentCharacter = new Character(name, age, chosenClass);
  gameState.setCharacter(currentCharacter);
  gameState.navigateTo("characterScreen");
}

function loadGame() {
  gameData = loadGameData();
  currentCharacter = Object.assign(Character.prototype, gameData);
  gameState.setCharacter(currentCharacter);

  if (gameState.getCharacter() && !_.isEmpty(gameState.getCharacter())) {
    console.log("Game loaded successfully!");
    gameState.navigateTo("characterScreen");
  } else {
    console.log("No saved game found. Starting a new game.");
    startNewGame();
  }
}

function continueGame(currentCharacter) {
  if (gameState.getCharacter() && !_.isEmpty(gameState.getCharacter())) {
    console.log("Game loaded successfully!");
    gameState.navigateTo("characterScreen");
  } else {
    console.log("No existing game found. Starting a new game.");
    startNewGame();
  }
}

module.exports = { startNewGame, loadGame, continueGame };
