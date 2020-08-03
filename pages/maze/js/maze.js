class Maze {
  constructor(w, h, cs, init_index) {
    this.cell_size = cs;
    this.width = w;
    this.height = h;
    this.cols = floor(this.width/this.cell_size);
    this.rows = floor(this.height/this.cell_size);
    this.cells = [];
    this.current = this.cells[init_index];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.cells.push(new Cell(r, c, this.cell_size, this.cell_size));
      }
    }
    this.stack = [init_index];
    this.finish = createVector(this.width - (this.cell_size/2), this.height - (this.cell_size / 2));
    this.victorious = false;
  }

  visitCell() {
    const index = this.stack[this.stack.length - 1];
    if(index == null) return;
    this.cells[index].visited = true;
    this.current = this.cells[index];
    this.checkCellNeighbors(this.current.r, this.current.c);
    if (this.current.neighbors.length > 0) {
      const random_neighbor = floor(random(0, this.current.neighbors.length));
      const next_index = this.current.neighbors[random_neighbor];
        this.stack.push(next_index);
        this.removeWalls(index, next_index);
    } else {
      this.stack.pop();
    }
  }

  showFinish() {
    fill(255);
    ellipse(this.finish.x, this.finish.y, 4);
  }

  isVictorious(particlePosition) {
    const distance_to_victory = p5.Vector.dist(particlePosition, this.finish)
    if (distance_to_victory < this.cell_size / 2) {
      this.victorious = true;
    }
    return this.victorious;
  }

  checkCellNeighbors(r,c) {
    this.current.neighbors = [];
    this.checkTop(r, c);
    this.checkRight(r, c);
    this.checkBottom(r, c);
    this.checkLeft(r, c);
  }
  checkTop(r, c) {
    const top_index = this.getCellIndex(r-1, c);
    if(!top_index) return;
    const top = this.cells[top_index];
    if (!top.visited) this.current.neighbors.push(top_index);
  }

  checkRight(r, c) {
    const right_index = this.getCellIndex(r, c+1);
    if(!right_index) return;
    const right = this.cells[right_index];
    if (!right.visited) this.current.neighbors.push(right_index);
  }
  
  checkBottom(r, c) {
    const bottom_index = this.getCellIndex(r+1, c);
    if(!bottom_index) return;
    const bottom = this.cells[bottom_index];
    if (!bottom.visited) this.current.neighbors.push(bottom_index);
  }
  checkLeft(r, c) {
    const left_index = this.getCellIndex(r, c-1);
    if(!left_index) return;
    const left = this.cells[left_index];
    if (!left.visited) this.current.neighbors.push(left_index);
  }

  getCellIndex(r, c) {
    if ( c < 0 || r < 0 || r > this.rows - 1 || c > this.cols - 1) return null;
    return c + (r * this.cols);
  }

  removeWalls(index, next_index) {
    const delta = index - next_index;
    if (delta === 1) {
      // Remove left wall from index cell
       this.cells[index].removeWall(3);
      // Remove right wall from next index cell
      this.cells[next_index].removeWall(1);
    } else if (delta === -1) {
      // Remove right wall from index cell
      this.cells[index].removeWall(1);
      // Remove left wall from next index cell
      this.cells[next_index].removeWall(3);
    } else if (delta === -this.cols) {
      // Remove bottom from index cell
      this.cells[index].removeWall(2);
      // Remove top from next index cell
      this.cells[next_index].removeWall(0); 
    } else if(delta === this.cols) {
      // Remove top from index cell
      this.cells[index].removeWall(0);
      // Remove bottom from next index cell
      this.cells[next_index].removeWall(2); 
    } else {
      console.log(`Should not happen ${x}`);
    }
  }

  getWalls() {
    const walls = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].walls.length; j++) {
        if(this.cells[i].walls[j])
        walls.push(this.cells[i].walls[j]);
      }
    }
    return walls;
  }
}