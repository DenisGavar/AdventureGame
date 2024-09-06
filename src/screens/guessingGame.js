const readline = require("readline-sync");
const gameState = require("../gameState");

function guessingGameScreen() {
  console.clear();
  console.log("Welcome to the Guess the number game!");
  console.log("Rules:");
  console.log("Players can bet any number of points before the game begins.");
  console.log(
    "The game starts with a multiplier of 10, which decreases by 1 with each guess."
  );
  console.log(
    "If you guess the number correctly, your bet is multiplied by the current multiplier, and you win that many HP (but your HP can't be more than the maximum)."
  );
  console.log(
    "If the multiplier drops below 0, you lose the amount of HP equal to your bet times the negative multiplier."
  );
  console.log("I'm thinking of a number between 1 and 100.");
  // Random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let multiplier = 10;
  let guess = 0;
  const character = gameState.getCharacter();

  // Bet
  let bet = 0;
  do {
    bet = readline.questionInt("Enter your bet: ");
  } while (bet <= 0);

  while (true) {
    do {
      guess = readline.questionInt("Guess the number (1-100): ");
    } while (guess < 1 || guess > 100);

    if (guess < randomNumber) {
      console.log("Too low!");
    } else if (guess > randomNumber) {
      console.log("Too high!");
    } else {
      console.log("Congratulations! You guessed the correct number.");
      break;
    }

    multiplier--;
  }

  // Calculate awards
  const earnedHP = Math.min(
    bet * multiplier,
    character.maxHealth - character.health
  );
  if (multiplier > 0) {
    console.log(`You win ${earnedHP} HP!`);
  } else {
    console.log(`You lose ${Math.abs(earnedHP)} HP!`);
  }
  character.health += earnedHP;
  console.log(`Your HP: ${character.health}/${character.maxHealth}`);

  const dead = character.health <= 0;
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

module.exports = { guessingGameScreen };
