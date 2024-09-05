class GameState {
  constructor() {
    if (!GameState.instance) {
      this.Character = null;
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

  navigateTo(screen) {
    switch (screen) {
      case 'mainScreen':
        import('./screens/mainScreen.js').then(module => module.mainScreen());
        break;
      case 'characterScreen':
        import('./screens/characterScreen.js').then(module => module.characterScreen());
        break;
      default:
        console.log('Invalid screen');
    }
  }
}

const instance = new GameState();
// TODO: check it
//Object.freeze(instance); // Prevent modifications to the singleton instance

module.exports = instance;
