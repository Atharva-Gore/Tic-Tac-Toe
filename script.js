const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const celebration = document.getElementById('celebration');

let currentPlayer = 'x';
let boardState = Array(9).fill(null);
let scores = { x: 0, o: 0 };
let gameActive = true;

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'x';
  gameActive = true;
  setStatus(`🎮 ${currentPlayer.toUpperCase()}'s Turn`);
  celebration.classList.add('hidden');
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer === 'x' ? '❌' : '⭕';

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer.toUpperCase()} Wins! 🎉🏆`);
    scores[currentPlayer]++;
    updateScores();
    return;
  }

  if (boardState.every(cell => cell)) {
    endGame(`It's a Draw 🤝`);
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  setStatus(`🔄 ${currentPlayer.toUpperCase()}'s Turn`);
}

function checkWin(player) {
  return WINNING_COMBOS.some(combo =>
    combo.every(index => boardState[index] === player)
  );
}

function endGame(message) {
  gameActive = false;
  setStatus(message);
  celebration.classList.remove('hidden');
}

function setStatus(message) {
  statusText.textContent = message;
}

function updateScores() {
  scoreX.textContent = scores.x;
  scoreO.textContent = scores.o;
}

restartBtn.addEventListener('click', startGame);

startGame();
