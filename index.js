import prompt from 'readline-sync';
import wordBank from './word-bank.js';

// - After each round, display the results. The results should be how many games the player won out of the total games played.

// - If a player guesses a special character, it should not count as a guess.

// - Repeat guesses should not count against the player. For example, if the player has three guesses left, and he has already guessed the letter "a", he should still have three guesses left when he guesses "a" second time.

// Still need a win condition and play again.

const getRandomWord = (wordBank) => {
  let word = Math.floor(Math.random() * wordBank.length);
  return wordBank[word];
};
let randomWord = getRandomWord(wordBank);
// Generates a randomWord passing wordBank into the function. Must return wordBank[word] or else it is a number.

const getBlankWord = (randomWord) => {
  let blankWord = [];
  for (let i = 0; i < randomWord.length; i++) {
    blankWord.push('_');
  }
  return blankWord
};
let blankWord = getBlankWord(randomWord);
// Put our randomWord into our getBlankWord function and push each index or [i] of our randomWord into our blankWord array. Each time our index or [i] is being replaced with '_' or underscore. Then combing our underscores into a string and separating each one with a space.

const guessCheck = (guess, word) => {
    return word.includes(guess);
};
//Callback function to see if out LetterGuess is in our randomWord.

const findMatches = (letterGuess, randomWord, blankWord) => {
  for (let i = 0; i < randomWord.length; i++) {
    let index = randomWord[i];
    if (index === letterGuess) {
      blankWord[i] = letterGuess;
    }
  }
  return blankWord
};
// Passes in letterGuess, our randomWord and our blankWord. Replaces our blackWord with our letterGuess if the index or [i] of our randomWord is equal to our letterGuess.

const hangmanArt = (numberOfTries) => {
  switch (numberOfTries) {
    case 5: console.log('(\n')
    break;
    case 4: console.log('( ͡°\n')
    break;
    case 3: console.log('( ͡° ͜ \n')
    break;
    case 2: console.log('( ͡° ͜ʖ \n')
    break;
    case 1: console.log('( ͡° ͜ʖ ͡°\n')
    break;
    case 0: console.log('( ͡° ͜ʖ ͡°)\n')
    break;
  }
};
// Switch statement that takes in our numberOfTries and console.logs based on how many attempts are left.

let alreadyGuessed = [];
const guessArray = (askGuess) => {
  alreadyGuessed.push(`${askGuess}`);
  return alreadyGuessed;
}
// Callback to show what letters have already been guessed.

const checkIfLetter = (askGuess) => {
  if (/[a-zA-Z]/.test(askGuess)) {
    return askGuess[0].toLowerCase();
  } else if (/[^a-zA-Z]/.test(askGuess)) {
    return askGuess + `\n**${askGuess} is NOT a letter*\n Please guess again`;
  } 
};
// Callback that checks to see if the userInput is a letter.

const startLoop = () => {
  console.log('\nWelcome to Hang "LennyFace" man!\nPress ctrl+c to stop');
  console.log('===================\n');
  console.log(randomWord);
  // Remove before submit
  console.log(blankWord.join('' + ' '));
  // Runs once at the start of the game.

  let numberOfTries = 6;
  while (numberOfTries > 0) {
    const askGuess = prompt.question('\nPlease guess a letter : ');
    // Prompts user to guess a letter.
    const letterGuess = checkIfLetter(askGuess);
    // Turn the user guess to lowercase.
    console.log('\n===================');
    console.log(`*You guessed : ${letterGuess}*\n`);

    if (guessCheck(letterGuess, randomWord) && checkIfLetter(askGuess)) {
      blankWord = findMatches(letterGuess, randomWord, blankWord);
      hangmanArt(numberOfTries);
      //  Calls back to our findMatches function and replaces our letterGuess with our blankWord[i].
    } else {
      numberOfTries--;
      hangmanArt(numberOfTries);
      // Calls our switch statement to show art based on number of tries.
    } 
    console.log(blankWord.join('' + ' '));
    console.log(`\nTries left: ${numberOfTries}`);
    console.log(`Letters already guessed: ${guessArray(askGuess)}`)
    // Shows what letters have been guessed.
    console.log('===================');
    // Shows number of tries and our blankWord after its gone through our loop
  }

  // Runs only once the while loop breaks
};

startLoop();
// Starts game and loops through our while loop. Game ends after decrement operator is less than 1.