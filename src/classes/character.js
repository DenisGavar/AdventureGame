class Character {
  constructor(name, age, characterClass) {
    this.name = name;
    this.age = age;
    this.characterClass = characterClass; // Instance of CharacterClass
    this.strength = this.characterClass.generateStrength();
    this.intelligence = this.characterClass.generateIntelligence();
    this.health = this.strength * 10;
    this.maxHealth = this.health;
    this.experience = 0;
    this.level = 1;
    this.inventory = [];
  }

  displayStats() {
    console.log(`\n${this.name}'s Stats:`);
    console.log(`Age: ${this.age}`);
    console.log(`Class: ${this.characterClass.type}`);
    console.log(`Strength: ${this.strength}`);
    console.log(`Intelligence: ${this.intelligence}`);
    console.log(`Health: ${this.health}/${this.maxHealth}`);
    console.log(`Special Ability: ${this.characterClass.specialAbility}`);
    console.log(`Experience: ${this.experience}`);
    console.log(`Level: ${this.level}`);
    console.log(`Inventory: ${this.inventory.join(", ") || "Empty"}`);
  }

  checkLevelUp() {
    while (this.experience >= Math.pow(10, this.level)) {
      this.level++;
      this.strength++;
      this.intelligence++;
      this.health = this.strength * 10;
      this.maxHealth = this.health;  
      console.log(
        `Congratulations! ${this.name} leveled up to Level ${this.level}`
      );
    }
  }

  updateExperience(value) {
    this.experience += value;
    this.checkLevelUp();
  }
}

module.exports = Character;
