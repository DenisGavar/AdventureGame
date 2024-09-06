const readline = require("readline-sync");
const gameState = require("../gameState");
const Character = require("../classes/character");
const CharacterClass = require("../classes/class");

function newGameScreen() {
  console.clear();
  console.log("--- New Game ---");

  // Create a new character
  const name = readline.question("Enter your character's name: ");
  const age = readline.questionInt("Enter your character's age: ");

  // Choose a class
  // TODO: refactor it
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
  gameState.save();
  gameState.navigateTo("characterScreen");
}

module.exports = { newGameScreen };
