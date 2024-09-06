const getRandomArbitrary = require("../../lib/math");

class CharacterClass {
  constructor(type, specialAbility) {
    this.type = type;
    this.specialAbility = specialAbility;
  }

  // Generate strength based on class type
  generateStrength() {
    if (this.type === "Fighter") {
      return getRandomArbitrary(7, 10); // Strength: 7-10
    } else if (this.type === "Mage") {
      return getRandomArbitrary(3, 5); // Strength: 3-5
    }
    return 5; // Default
  }

  // Generate intelligence based on class type
  generateIntelligence() {
    if (this.type === "Fighter") {
      return getRandomArbitrary(4, 6); // Intelligence: 4-6
    } else if (this.type === "Mage") {
      return getRandomArbitrary(8, 10); // Intelligence: 8-10
    }
    return 5; // Default
  }
}

module.exports = CharacterClass;
