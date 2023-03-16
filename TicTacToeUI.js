const rowElements = document.querySelectorAll('.row');
const statusElement = document.querySelector('#status');

const handleClick = async (row, col) => {
  try {
    await (isPlayerXTurn ? E(ticTacToeContract).makeMoveX(row, col) : E(ticTacToeContract).makeMoveO(row, col));
    updateBoard(row, col);
    isPlayerXTurn = !isPlayerXTurn;
    statusElement.textContent = `Turn: ${isPlayerXTurn ? 'X' : 'O'}`;
  } catch (error) {
    console.error(error);
    statusElement.textContent = `Error: ${error.message}`;
  }
};

const updateBoard = (row, col) => {
  const cellElement = rowElements[row].children[col];
  cellElement.textContent = isPlayerXTurn ? 'X' : 'O';
};

for (const rowElement of rowElements) {
  for (const cellElement of rowElement.children) {
    cellElement.addEventListener('click', () => {
      handleClick(Number(cellElement.dataset.row), Number(cellElement.dataset.col));
    });
  }
}
