// Tạo một số ngẫu nhiên từ 1 đến 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10; // Giới hạn số lần đoán
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

// Hàm kiểm tra số đoán
function checkGuess() {
  const guess = parseInt(guessInput.value);

  // Nếu người chơi không nhập hoặc nhập ngoài phạm vi
  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Please enter a valid number between 1 and 100!";
    return;
  }

  // Tăng số lần thử
  attempts++;
  attemptsDisplay.textContent = `${attempts} / ${maxAttempts}`;

  // So sánh số đoán với số ngẫu nhiên
  if (guess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    message.style.color = "green";
    guessInput.disabled = true;
    checkButton.disabled = true;
    wins++;
    updateScore();
  } else if (guess < randomNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "orange";
  } else {
    message.textContent = "Too high! Try again.";
    message.style.color = "orange";
  }

  // Kiểm tra nếu đã hết lượt đoán
  if (attempts >= maxAttempts && guess !== randomNumber) {
    message.textContent = `😢 Out of attempts! The number was ${randomNumber}.`;
    message.style.color = "red";
    guessInput.disabled = true;
    checkButton.disabled = true;
    losses++;
    updateScore();
  }
}

// Gắn sự kiện cho nút kiểm tra
checkButton.addEventListener("click", checkGuess);

// Thêm sự kiện khi nhấn phím Enter
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Khởi động lại trò chơi
restartButton.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = `${attempts} / ${maxAttempts}`;
  message.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  checkButton.disabled = false;
  message.style.color = "black";
});

// Cập nhật điểm số
function updateScore() {
  scoreDisplay.innerHTML = `<strong>Wins:</strong> ${wins} | <strong>Losses:</strong> ${losses}`;
}
