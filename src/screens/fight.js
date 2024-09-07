const readline = require("readline-sync");
const _ = require("lodash");
const gameState = require("../gameState");
const Monster = require("../classes/monster");

async function fetchMonsterStats() {
  try {
    const response = await fetch("https://www.dnd5eapi.co/api/monsters");
    const data = await response.json();
    const randomMonster =
      data.results[Math.floor(Math.random() * data.results.length)];
    const monsterStats = await fetch(
      `https://www.dnd5eapi.co${randomMonster.url}`
    );
    const monster = await monsterStats.json();
    return {
      name: monster.name,
      health: monster.hit_points,
      strength: monster.strength,
    };
  } catch (err) {
    console.error("Error fetching monster stats:", err);
    return null;
  }
}

async function fightScreen() {
  const character = gameState.getCharacter();

  console.clear();
  character.displayStats();
  console.log("---------------");

  let monster = gameState.getActiveMonster();
  if (!monster || _.isEmpty(monster)) {
    // if we don't have an active monster, fetch it
    const monsterStats = await fetchMonsterStats();
    if (monsterStats === null) {
      // if we couldn't fwtch monster
      //gameState.navigateTo("characterScreen");
      return;
    }
    monster = new Monster(monsterStats);
    gameState.setActiveMonster(monster);
  }
  monster.displayStats();

  let earnedExperience = 0;
  let dead = false;
  // fight with a monster
  while (character.health > 0 && monster.health > 0) {
    // one exp point for each turn
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
      dead = true;
      break;
    }
  }

  gameState.setActiveMonster(null);
  gameState.save();

  // Return to the character menu or new game
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
