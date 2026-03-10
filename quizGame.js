//Quiz Game
//Questions are Nigerian flavored
//Multiplayer options
//Choose difficulty Levels
//Readline module

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Question bank grouped by difficulty
const questions = {
  easy: [
    { quest: "What is the capital of Nigeria?", ans: "Abuja" },
    { quest: "Which Nigerian currency is used today?", ans: "Naira" }
  ],
  medium: [
    { quest: "Who is known as the 'Father of Nigerian Literature'?", ans: "chinua achebe" },
    { quest: "Which Nigerian city is famous for Nollywood?", ans: "lagos" }
  ],
  hard: [
    { quest: "In what year did Nigeria gain independence?", ans: "1960" },
    { quest: "When did Nigeria come under democratic rule?", ans: "1999" }
  ]
};

let players = [];
let currentPlayer = 0;
let score = [];

// Ask for difficulty level first
function startGame() {
  rl.question("Choose difficulty (easy, medium, hard): ", (level) => {
    if (!questions[level]) {
      console.log("Invalid choice. Defaulting to easy.");
      level = "easy";
    }
    rl.question("Enter number of players: ", (number) => {
      players = Array.from({ length: parseInt(number) }, (_, i) => `Player ${i+1}`);
      score = Array(players.length).fill(0);
      console.log(`\nStarting quiz for ${players.length} players at ${level} level!\n`);
      playQuiz([...questions[level]]); // copy questions
    });
  });
}

function playQuiz(questions) {
  if (questions.length === 0) {
    console.log("Game Over!");
    players.forEach((player, i) => {
      console.log(`${player} scored ${score[i]} points`);
    });
    rl.close();
    return;
  }

  const question = questions.shift();
  const player = players[currentPlayer];

  rl.question(`${player}, ${question.quest} `, (answer) => {
    if (answer.trim().toLowerCase() === question.ans) {
      console.log(" Correct!");
      score[currentPlayer]++;
    } else {
      console.log(` Wrong! Correct answer: ${question.ans}`);
    }
    currentPlayer = (currentPlayer + 1) % players.length; // switch player
    playQuiz(questions);
  });
}

// Start
console.log("Welcome to the Nigerian Quiz Game!");
startGame();
