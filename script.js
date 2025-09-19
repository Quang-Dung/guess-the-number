// Tạo một số ngẫu nhiên từ 1 đến 50
let randomNumber = Math.floor(Math.random() * 50) + 1;
let attempts = 0;
const maxAttempts = 5; // Giới hạn số lần đoán (5 lần)
let wins = 0;
let losses = 0;

// Truy cập các phần tử DOM
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.createElement("p");

// Thêm phần thống kê điểm số
scoreDisplay.innerHTML = `<strong>Wins:</strong> ${wins} | <strong>Losses:</strong> ${losses}`;
document.querySelector(".container").appendChild(scoreDisplay);

// Hàm reset game
function resetGame() {
  randomNumber = Math.floor(Math.random() * 50) + 1;
  attempts = 0;
  attemptsDisplay.textContent = `${attempts} / ${maxAttempts}`;
  message.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  checkButton.disabled = false;
  message.style.color = "black";
}

// Hàm kiểm tra số đoán
function checkGuess() {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 50) {
    message.textContent = "Please enter a valid number between 1 and 50!";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `${attempts} / ${maxAttempts}`;

  if (guess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    message.style.color = "green";
    guessInput.disabled = true;
    checkButton.disabled = true;
    wins++;
    updateScore();
    setTimeout(resetGame, 2000);
  } else if (guess < randomNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "orange";
  } else {
    message.textContent = "Too high! Try again.";
    message.style.color = "orange";
  }

  if (attempts >= maxAttempts && guess !== randomNumber) {
    message.textContent = `😢 Out of attempts! The number was ${randomNumber}.`;
    message.style.color = "red";
    guessInput.disabled = true;
    checkButton.disabled = true;
    losses++;
    updateScore();
    setTimeout(resetGame, 2000);
  }
}

checkButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

restartButton.addEventListener("click", resetGame);

function updateScore() {
  scoreDisplay.innerHTML = `<strong>Wins:</strong> ${wins} | <strong>Losses:</strong> ${losses}`;
}
