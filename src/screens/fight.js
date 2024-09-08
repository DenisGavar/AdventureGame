const readline = require("readline-sync");
const clear = require("console-clear");
const _ = require("lodash");
const gameState = require("../gameState");
const Monster = require("../classes/monster");

// Get the monster from the
// https://www.dnd5eapi.co

// just for information, we can also use the following api
// https://api.open5e.com/v1/

async function fetchMonsterStats() {
  try {
    // Get all the monsters
    const response = await fetch("https://www.dnd5eapi.co/api/monsters");
    const data = await response.json();
    // Get a random monster from the list
    const randomMonster =
      data.results[Math.floor(Math.random() * data.results.length)];
    // Get a specific monster
    const monsterStats = await fetch(
      `https://www.dnd5eapi.co${randomMonster.url}`
    );
    const monster = await monsterStats.json();
    // Return monster stats
    return {
      name: monster.name,
      health: monster.hit_points,
      strength: monster.strength,
    };
  } catch (err) {
    console.error("Error fetching monster stats:", err.message);
    return null;
  }
}

async function fightScreen() {
  const character = gameState.getCharacter();

  clear();
  character.displayStats();
  console.log("---------------");

  // Try to get an active saved monster
  let monster = gameState.getActiveMonster();
  if (!monster || _.isEmpty(monster)) {
    // If we don't have an active saved monster, fetch it
    const monsterStats = await fetchMonsterStats();
    if (monsterStats === null) {
      // If we couldn't fetch a monster
      gameState.navigateTo("characterScreen");
      return;
    }
    monster = new Monster(monsterStats);
    gameState.setActiveMonster(monster);
  }
  monster.displayStats();

  // Fighting
  let earnedExperience = 0;
  // A character fights a monster while one of them is alive
  while (character.health > 0 && monster.health > 0) {
    // One exp point for each turn
    earnedExperience++;

    // Character attacks
    monster.health -= character.strength;
    console.log(`You hit the monster. Monster's HP: ${monster.health}`);

    if (monster.health <= 0) {
      console.log(
        `You defeated the monster and earn ${earnedExperience} experience points!`
      );
      character.updateExperience(earnedExperience);
      break;
    }

    // Monster attacks
    character.health -= monster.strength;
    console.log(`Monster hits you. Your HP: ${character.health}`);

    if (character.health <= 0) {
      console.log("You were defeated by the monster. Start a new game.");
      break;
    }
  }

  // Check if the character is dead
  const dead = character.health <= 0;
  if (dead) {
    gameState.setCharacter(null);
  }

  gameState.setActiveMonster(null);
  gameState.save();

  // Return to the character screen or new game screen
  console.log("\nPress any key to continue.");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.once("data", () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    if (dead) {
      gameState.navigateTo("newGameScreen");
    } else {
      gameState.navigateTo("characterScreen");
    }
  });
}

module.exports = { fightScreen };
