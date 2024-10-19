const gameboard = [];
const main = document.querySelector("main");
const resetbtn = document.querySelector("button");
const dialog = document.querySelector("dialog");
const body = document.querySelector("body");

//function for creating object instance for each player
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

// object for manupulating game logic and flow
const gameFlow = {
  playing: true,
  drawingBlocks: document.querySelectorAll(".block"),
  currentPlayerIndex: 0,
  winner: "None",
  judgePerMove,
};

const player1 = player("Player_X", "✖️");
const player2 = player("Player_O", "⭕");
gameboard.push(player1, player2, gameFlow);

gameFlow.drawingBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    gameboard[gameFlow.currentPlayerIndex].draw(block);
    judgePerMove(gameboard[gameFlow.currentPlayerIndex]);
    gameboard[gameFlow.currentPlayerIndex] =
      gameboard[gameFlow.currentPlayerIndex] === player1 ? player2 : player1;
  });
});

// function that will called after every move to make game variables and decide which function to call
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
    handleDialog("show winner");
  } else if (!array.includes("")) {
    gameFlow.playing = false;
    handleDialog("show a tie");
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
  gameboard[gameFlow.currentPlayerIndex] = player1;
  judgePerMove(gameboard[gameFlow.currentPlayerIndex]);
}

function handleDialog(message) {
  dialog.classList.add("show");
  if (message === "show winner") {
    dialog.children[1].textContent = `${gameFlow.winner.name} wins`;
    dialog.children[2].textContent = `🎉🎉🎉`;
  } else if (message === "show a tie") {
    dialog.children[1].textContent = "It's a tie";
    dialog.children[2].textContent = "🤝🤝🤝";
  }
}

function showModal() {
  dialog.classList.add("show");
}

resetbtn.addEventListener("click", reset);

const closebtn = document.querySelector("#close");
closebtn.addEventListener("click", () => {
  dialog.classList.remove("show");
});
