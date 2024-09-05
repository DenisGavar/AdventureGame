const readline = require('readline-sync');
const { startNewGame, loadGame } = require('./gameEngine');
const saveGameData = require('./save');

// Main menu function
function mainMenu() {
  console.clear();
  console.log('--- Adventure Game ---');
  console.log('1. Start New Game');
  console.log('2. Load Game');
  console.log('3. Exit');

  const choice = readline.question('Choose an option: ');

  switch (choice) {
    case '1':
      startNewGame();
      break;
    case '2':
      loadGame();
      break;
    case '3':
        Exit();
      break;
    default:
      console.log('Invalid option. Please try again.');
      mainMenu();
  }
}

function Exit() {
  console.log('Saving game data...');
  // Implement
  process.exit(0);
}

// Run the main menu when the game starts
mainMenu();
