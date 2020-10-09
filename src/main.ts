/// <reference path="./maze.ts" />

const selectDifficulty = (content: HTMLElement) => {
  [
    { lbl: "easy", size: 10 },
    { lbl: "medium", size: 22 },
    { lbl: "hard", size: 38 },
  ].forEach((dif, i) => {
    const e = document.createElement("div");
    e.className = "bttn ";
    e.style.width = `80vw`;
    e.style.height = `10vh`;
    e.style.left = `10vw`;
    e.style.top = `${10 + 12 * i}vh`;
    e.style.fontSize = `${Math.floor(content.getBoundingClientRect().height * 0.05)}px`;
    e.innerHTML = dif.lbl;
    e.onclick = () => {
      content.innerHTML = "";
      startGame(dif.size, content);
    };
    content.appendChild(e);
  });
};

const startGame = (size: number, content: HTMLElement) =>
  new Maze(size, size, content, () => {
    const e = document.createElement("div");
    e.className = "gameOver";
    e.onclick = init;
    content.appendChild(e);
  });

const init = () => {
  // @ts-ignore
  new GTheme().apply();

  const content = document.getElementById("game-content");
  content.innerHTML = "";
  selectDifficulty(content);
};

window.onload = init;
