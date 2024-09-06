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
        import("./screens/guessingGame.js").then((module) => module.guessingGameScreen());
        break;
      default:
        console.log("Invalid screen");
    }
  }
}

const instance = new GameState();
// TODO: check it
//Object.freeze(instance); // Prevent modifications to the singleton instance

module.exports = instance;
