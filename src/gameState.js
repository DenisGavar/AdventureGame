const filePath = "./assets/characters.json";
const fs = require("fs");
const _ = require("lodash");
const Character = require("./classes/character.js");
const CharacterClass = require("./classes/class");

class GameState {
  constructor() {
    if (!GameState.instance) {
      this.Character = null;
      this.ActiveMonster = null;
      GameState.instance = this;
    }
    return GameState.instance;
  }

  setCharacter(character) {
    this.Character = character;
  }

  getCharacter() {
    return this.Character;
  }

  setActiveMonster(monster) {
    this.ActiveMonster = monster;
  }

  getActiveMonster() {
    return this.ActiveMonster;
  }

  navigateTo(screen) {
    switch (screen) {
      case "mainScreen":
        import("./screens/main.js").then((module) => module.mainScreen());
        break;
      case "characterScreen":
        import("./screens/character.js").then((module) =>
          module.characterScreen()
        );
        break;
      case "fightScreen":
        import("./screens/fight.js").then((module) => module.fightScreen());
        break;
      case "guessingGame":
        import("./screens/guessingGame.js").then((module) =>
          module.guessingGameScreen()
        );
        break;
      case "newGameScreen":
        import("./screens/newGame.js").then((module) => module.newGameScreen());
      default:
        console.log("Invalid screen");
    }
  }

  // Save game data to a file
  save() {
    if (this.getCharacter().health <= 0) {
      this.setCharacter(null);
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify(this, null, 2));
      console.log("Game saved successfully!");
    } catch (err) {
      console.error("Error saving game data: ", err.message);
    }
  }

  // Load game data from a file
  async load() {
    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        const gameData = await JSON.parse(data);

        Object.assign(this, gameData);

        // Reassign prototypes
        if (this.getCharacter()) {
          Object.setPrototypeOf(this.Character, Character.prototype);
        }
        if (this.getActiveMonster()) {
          Object.setPrototypeOf(this.ActiveMonster, Monster.prototype);
        }

        if (this.getCharacter() && !_.isEmpty(this.getCharacter())) {
          console.log("Game loaded successfully!");
          this.navigateTo("characterScreen");
        }
      } catch (err) {
        console.error("Error loading game data:", err.message);
      }
    } else {
      console.log("No saved game found. Starting a new game.");
      this.navigateTo("newGameScreen");
    }
  }

  continueGame() {
    if (this.getCharacter() && !_.isEmpty(this.getCharacter())) {
      console.log("Game loaded successfully!");
      this.navigateTo("characterScreen");
    } else {
      console.log("Loading a game...");
      this.load();
    }
  }
}

const instance = new GameState();
// TODO: check it
//Object.freeze(instance); // Prevent modifications to the singleton instance

module.exports = instance;
