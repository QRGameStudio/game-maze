class MazeView {
  private maze: Maze;
  private container: HTMLElement;
  private cellWidht: number;
  private leftOffset: number;
  private topOffset: number;

  constructor(maze: Maze, container: HTMLElement) {
    this.maze = maze;
    this.container = container;
    this.topOffset = 32;
    this.cellWidht = Math.floor(
      (Math.min(container.getBoundingClientRect().width, container.getBoundingClientRect().height) * 0.9 - 16) / maze.width
    );
    this.leftOffset = Math.floor((container.getBoundingClientRect().width - maze.width * this.cellWidht) / 2);
  }

  private clearBoard = () => {
    this.container.innerHTML = "";
  };

  private drawCell = (col: number, row: number) => {
    const e = document.createElement("div");
    e.className = "cell ";
    if (this.maze.vertical[row][col] !== true || row === this.maze.height - 1) {
      e.className += "bottom ";
    }
    if (this.maze.horizontal[row][col] !== true || col === this.maze.width - 1) {
      e.className += "right ";
    }
    if (col === 0) e.className += "left ";
    if (row === 0 && col !== 0) e.className += "top";
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + this.cellWidht * col}px`;
    e.style.top = `${this.topOffset + this.cellWidht * row}px`;
    this.container.appendChild(e);
  };

  private drawPerson = () => {
    const e = document.createElement("div");
    e.className = "person";
    e.style.width = `${parseInt((this.cellWidht * 0.8).toString())}px`;
    e.style.height = `${parseInt((this.cellWidht * 0.8).toString())}px`;
    e.style.left = `${
      this.leftOffset + parseInt((this.cellWidht * 0.1).toString()) + this.cellWidht * this.maze.getPersonPosition().x
    }px`;
    e.style.top = `${
      this.topOffset + parseInt((this.cellWidht * 0.1).toString()) + this.cellWidht * this.maze.getPersonPosition().y
    }px`;
    this.container.appendChild(e);
  };

  private drawButtons = () => {
    const ub = document.createElement("div");
    ub.className = "moveBtn";
    ub.style.width = "100vw";
    ub.style.height = "30vh";
    ub.style.top = "0";
    ub.onclick = () => this.maze.move("up");
    this.container.appendChild(ub);

    const db = document.createElement("div");
    db.className = "moveBtn";
    db.style.width = "100vw";
    db.style.height = "30vh";
    db.style.top = "70vh";
    db.onclick = () => this.maze.move("down");
    this.container.appendChild(db);

    const lb = document.createElement("div");
    lb.className = "moveBtn";
    lb.style.width = "50vw";
    lb.style.height = "40vh";
    lb.style.top = "30vh";
    lb.onclick = () => this.maze.move("left");
    this.container.appendChild(lb);

    const rb = document.createElement("div");
    rb.className = "moveBtn";
    rb.style.width = "50vw";
    rb.style.height = "40vh";
    rb.style.top = "30vh";
    rb.style.left = "50vw";
    rb.onclick = () => this.maze.move("right");
    this.container.appendChild(rb);
  };

  draw = () => {
    this.clearBoard();
    Array.from(Array(this.maze.height).keys()).forEach((i) =>
      Array.from(Array(this.maze.width).keys()).forEach((j) => this.drawCell(i, j))
    );
    this.drawPerson();
    this.drawButtons();
  };
}
