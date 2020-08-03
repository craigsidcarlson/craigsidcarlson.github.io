class Cell {
  constructor(r, c, w, h) {
    this.r = r;
    this.c = c;
    this.w = w;
    this.h = h;
    this.x = this.c*cell_size;
    this.y = this.r*cell_size;
    this.walls = [];
    this.walls[0] = new Boundary(this.x, this.y, this.x+this.w, this.y);
    this.walls[1] = new Boundary(this.x+this.w, this.y, this.x+this.w, this.y+this.w);
    this.walls[2] = new Boundary(this.x, this.y+this.w, this.x+this.w, this.y+this.w);
    this.walls[3] = new Boundary(this.x, this.y, this.x, this.y+this.w);
    this.visited = false;
    this.neighbors = []
  }

  show() {
    stroke(255);
    //
    for (let i = 0; i < this.walls.length; i++) {
      if(this.walls[i]) this.walls[i].show();
    }
  }
  cheat() {
    stroke(255);
    //
    for (let i = 0; i < this.walls.length; i++) {
      if(this.walls[i]) this.walls[i].cheat();
    }
  }

  removeWall(index) {
    this.walls[index] = null;
  }
}