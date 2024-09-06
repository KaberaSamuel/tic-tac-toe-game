const main = document.querySelector("main");
const resetbtn = document.querySelector("button");
const dialog = document.querySelector("dialog");
const body = document.querySelector("body");
const closebtn = document.querySelector("#close");
const squares = document.querySelectorAll(".block");

let player1;
let player2;
const players = [];
let currentIndex = 0;
let playing = true;
let winner = "none";

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
players.push(player1, player2);

squares.forEach((block) => {
  block.addEventListener("click", () => {
    players[currentIndex].draw(block);
    judgePerMove(players[currentIndex]);
    currentIndex = currentIndex === 0 ? 1 : 0;
  });
});

function judgePerMove(player) {
  const array = [];
  squares.forEach((block) => {
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
    playing = false;
    winner = players[currentIndex];
    handleDialog();
  } else if (!array.includes("")) {
    playing = false;
    winner = "none";
    handleDialog();
  }

  main.style.cssText = playing ? "pointer-events: all" : "pointer-events: none";
}

function reset() {
  squares.forEach((book) => {
    book.textContent = "";
  });
  playing = true;
  currentIndex = 0;
  main.style.cssText = "pointer-events: all";
}

function handleDialog() {
  dialog.classList.add("show");
  const winning = winner === "none" ? false : true;
  dialog.children[1].textContent = winning
    ? `${winner.name} wins`
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
