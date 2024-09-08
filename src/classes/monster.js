class Monster {
  constructor({ name, strength, health }) {
    this.name = name;
    this.strength = strength;
    this.health = health;
  }

  // Display monster stats
  displayStats() {
    console.log(`\n${this.name}'s Stats:`);
    console.log(`Strength: ${this.strength}`);
    console.log(`Health: ${this.health}`);
  }
}

module.exports = Monster;
