const CharacterClass = require('./class');
const getRandomArbitrary = require('../lib/math')


class Character {
  constructor(name, age, characterClass) {
    this.name = name;
    this.age = age;
    this.characterClass = characterClass; // Instance of CharacterClass
    this.strength = this.characterClass.generateStrength();
    this.intelligence = this.characterClass.generateIntelligence();
    this.health = Math.floor(this.strength * 10 * getRandomArbitrary(0.9, 1.1));
    this.experience = 0;
    this.inventory = [];
  }

  displayStats() {
    console.log(`\n${this.name}'s Stats:`);
    console.log(`Age: ${this.age}`);
    console.log(`Class: ${this.characterClass.type}`);
    console.log(`Strength: ${this.strength}`);
    console.log(`Intelligence: ${this.intelligence}`);
    console.log(`Health: ${this.health}`);
    console.log(`Special Ability: ${this.characterClass.specialAbility}`);
    console.log(`Experience: ${this.experience}`);
    console.log(`Inventory: ${this.inventory.join(', ') || 'Empty'}`);
  }
}

module.exports = Character;
