const fs = require('fs');
const filePath = './assets/characters.json';

// Save game data to a file
function saveGame(character) {
  fs.writeFileSync(filePath, JSON.stringify(character, null, 2));
  console.log('Game saved successfully!');
}

module.exports = saveGame;
