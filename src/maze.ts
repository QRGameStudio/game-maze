/// <reference path="./mazeView.ts" />

interface IPosition {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

class Maze {
  readonly width: number;
  readonly height: number;
  readonly horizontal: boolean[][];
  readonly vertical: boolean[][];
  private view: MazeView;
  private personPos: IPosition;
  private gameOver: () => void;

  constructor(width: number, height: number, container: HTMLElement, gameOver: () => void) {
    this.width = width;
    this.height = height;
    this.horizontal = [];
    this.vertical = [];
    this.personPos = { x: width - 1, y: height - 1 };
    this.gameOver = gameOver;
    this.view = new MazeView(this, container);
    this.generate();
    this.view.draw();
  }

  private generate = () => {
    let n = this.width * this.height - 1;
    for (let j = 0; j < this.width + 1; j++) this.horizontal[j] = [];
    for (let j = 0; j < this.height + 1; j++) this.vertical[j] = [];

    let here = [Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)];
    let path = [here];
    let unvisited = [];
    for (let j = 0; j < this.width + 2; j++) {
      unvisited[j] = [];
      for (let k = 0; k < this.height + 1; k++)
        unvisited[j].push(j > 0 && j < this.width + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
    }
    while (0 < n) {
      let potential = [
        [here[0] + 1, here[1]],
        [here[0], here[1] + 1],
        [here[0] - 1, here[1]],
        [here[0], here[1] - 1],
      ];
      let neighbors = [];
      for (let j = 0; j < 4; j++) if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) neighbors.push(potential[j]);
      if (neighbors.length) {
        n = n - 1;
        let next = neighbors[Math.floor(Math.random() * neighbors.length)];
        unvisited[next[0] + 1][next[1] + 1] = false;
        if (next[0] == here[0]) this.horizontal[next[0]][(next[1] + here[1] - 1) / 2] = true;
        else this.vertical[(next[0] + here[0] - 1) / 2][next[1]] = true;
        path.push((here = next));
      } else here = path.pop();
    }
  };

  move = (dir: Direction) => {
    if (dir === "up") {
      if (this.personPos.y !== 0 && this.vertical[this.personPos.y - 1][this.personPos.x]) this.personPos.y -= 1;
    } else if (dir === "down") {
      if (this.personPos.y < this.height - 1 && this.vertical[this.personPos.y][this.personPos.x]) this.personPos.y += 1;
    } else if (dir === "left") {
      if (this.personPos.x !== 0 && this.horizontal[this.personPos.y][this.personPos.x - 1]) this.personPos.x -= 1;
    } else if (dir === "right") {
      if (this.personPos.x < this.width - 1 && this.horizontal[this.personPos.y][this.personPos.x]) this.personPos.x += 1;
    }
    this.view.draw();
    if (this.personPos.x === 0 && this.personPos.y === 0) this.gameOver();
  };

  getPersonPosition = () => {
    return { ...this.personPos };
  };
}
