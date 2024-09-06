const fs = require("fs");
const filePath = "./assets/characters.json";
const gameState = require("./gameState");

// Save game data to a file
function saveGame() {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify(gameState, null, 2)
    );
    console.log("Game saved successfully!");
  } catch (err) {
    console.error("Error saving game data: ", err.message);
  }
}

module.exports = saveGame;
