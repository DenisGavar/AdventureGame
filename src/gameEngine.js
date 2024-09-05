const readline = require('readline-sync');
const Character = require('./character');
const CharacterClass = require('./class');
const saveGameData = require('./save');
const loadGameData = require('./load');


let currentCharacter = null;

function startNewGame() {
  console.clear();
  console.log('--- New Game ---');

  // Create a new character
  const name = readline.question('Enter your character\'s name: ');
  const age = readline.questionInt('Enter your character\'s age: ');

  // Choose a class
  const classChoice = readline.keyInSelect(['Mage', 'Fighter'], 'Choose your class: ');
  const classTypes = ['Mage', 'Fighter'];
  const abilities = ['Fireball', 'Sword Slash'];
  const chosenClass = new CharacterClass(classTypes[classChoice], abilities[classChoice]);

  // Create the character with class-defined strength and intelligence
  currentCharacter = new Character(name, age, chosenClass);
  mainScreen();
}

function loadGame() {

  gameData = loadGameData();
  currentCharacter = Object.assign(Character.prototype, gameData)

  if (currentCharacter) {
    console.log('Game loaded successfully!');
    mainScreen();
  } else {
    console.log('No saved game found. Starting a new game.');
    startNewGame();
  }
}

function mainScreen() {
  console.clear();
  currentCharacter.displayStats();

  console.log('\nOptions:');
  console.log('1. Save Game');
  console.log('2. Back to Main Menu');
  
  const choice = readline.question('Choose an option: ');

  switch (choice) {
    case '1':
      saveGameData(currentCharacter);
      break;
    case '2':
      mainMenu();
      break;
    default:
      console.log('Invalid option. Returning to main screen...');
      mainScreen();
  }
}

module.exports = { startNewGame, loadGame };
