const gameboard = [];
const main = document.querySelector("main");
const resetbtn = document.querySelector("button");
const dialog = document.querySelector("dialog");
const body = document.querySelector("body");
const closebtn = document.querySelector("#close");
let player1;
let player2;

const gameFlow = {
  playing: true,
  drawingBlocks: document.querySelectorAll(".block"),
  currentPlayerIndex: 0,
  winner: "None",
  judgePerMove,
};

function player(name, char) {
  return {
    name,
    character: char,
    draw: function (element) {
      element.textContent =
        element.textContent === "" ? this.character : element.textContent;
    },
  };
}

player1 = player("Player_X", "✖️");
player2 = player("Player_O", "⭕");
gameboard.push(player1, player2, gameFlow);

gameFlow.drawingBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    gameboard[gameFlow.currentPlayerIndex].draw(block);
    judgePerMove(gameboard[gameFlow.currentPlayerIndex]);
    gameFlow.currentPlayerIndex = gameFlow.currentPlayerIndex === 0 ? 1 : 0;
  });
});

function judgePerMove(player) {
  const array = [];
  gameFlow.drawingBlocks.forEach((block) => {
    array.push(block.textContent);
  });

  // checking to see three consective blocks with same mark in all possible directions
  if (
    (array[0] == array[1] && array[1] == array[2] && array[1] !== "") ||
    (array[3] == array[4] && array[4] == array[5] && array[4] !== "") ||
    (array[6] == array[7] && array[7] == array[8] && array[7] !== "") ||
    (array[0] == array[3] && array[3] == array[6] && array[3] !== "") ||
    (array[1] == array[4] && array[4] == array[7] && array[4] !== "") ||
    (array[2] == array[5] && array[5] == array[8] && array[5] !== "") ||
    (array[0] == array[4] && array[4] == array[8] && array[4] !== "") ||
    (array[6] == array[4] && array[4] == array[2] && array[4] !== "")
  ) {
    gameFlow.playing = false;
    gameFlow.winner = gameboard[gameFlow.currentPlayerIndex];
    handleDialog();
  } else if (!array.includes("")) {
    gameFlow.playing = false;
    gameFlow.winner = "none";
    handleDialog();
  }

  main.style.cssText = gameFlow.playing
    ? "pointer-events: all"
    : "pointer-events: none";
}

function reset() {
  gameFlow.drawingBlocks.forEach((book) => {
    book.textContent = "";
  });
  gameFlow.playing = true;
  gameFlow.currentPlayerIndex = 0;
  main.style.cssText = "pointer-events: all";
}

function handleDialog() {
  dialog.classList.add("show");
  const winning = gameFlow.winner === "none" ? false : true;
  dialog.children[1].textContent = winning
    ? `${gameFlow.winner.name} wins`
    : "It's a tie";
  dialog.children[2].textContent = winning ? "🎉🎉🎉" : "🤝🤝🤝";
}

function showModal() {
  dialog.classList.add("show");
}

resetbtn.addEventListener("click", reset);

closebtn.addEventListener("click", () => {
  dialog.classList.remove("show");
});
