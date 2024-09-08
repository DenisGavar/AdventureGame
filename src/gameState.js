// Singletone pattern
// All information about the state of the game

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

  // Operations with the character
  setCharacter(character) {
    this.Character = character;
  }

  getCharacter() {
    return this.Character;
  }

  // Operations with the monster
  setActiveMonster(monster) {
    this.ActiveMonster = monster;
  }

  getActiveMonster() {
    return this.ActiveMonster;
  }

  // Function for changing the game screen
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
        break;
      default:
        console.log("Invalid screen");
        // To the main screen
        this.navigateTo("mainScreen");
    }
  }

  // Save game data to a file
  save() {
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

        // Check if the character is found
        if (this.getCharacter() && !_.isEmpty(this.getCharacter())) {
          console.log("Game loaded successfully!");
          this.navigateTo("characterScreen");
        } else {
          console.log("No active character found. Starting a new game.");
          this.navigateTo("newGameScreen");
        }
      } catch (err) {
        console.error("Error loading game data:", err.message);
      }
    } else {
      console.log("No saved game found. Starting a new game.");
      this.navigateTo("newGameScreen");
    }
  }

  // Check if the current game is found or load it from a file 
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
