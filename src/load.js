const fs = require("fs");
const filePath = "./assets/characters.json";

// Load game data from a file
function loadGameData() {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error loading game data:", err.message);
    }
  }
  return null;
}

module.exports = loadGameData;
