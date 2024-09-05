const fs = require('fs');
const filePath = './assets/characters.json';

// Load game data from a file
function loadGameData() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    try {
        return JSON.parse(data);
    } catch {
        return null
    }

  }
  return null;
}

module.exports = loadGameData;
