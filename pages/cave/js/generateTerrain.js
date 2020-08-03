class GenerateTerrain {
  constructor(rez) {
    this.walls = [];
    this.field = [];
    this.rez = rez;
    this.increment = 0.1;
    this.noise = new OpenSimplexNoise(Date.now());
    this.cols = width / rez + 1;
    this.rows = height / rez + 1;
    for(let i = 0; i < this.cols; i++) {
      const k  = [];
      for (let j = 0; j < this.rows; j++) {
        k.push(0);
      }
      this.field.push(k);
    }

    // Add borders to screen
    this.walls.push(new Boundary(0, 0, width, 0, true));
    this.walls.push(new Boundary(width, 0, width, height, true));
    this.walls.push(new Boundary(width, height, 0, height, true));
    this.walls.push(new Boundary(0, height, 0, 0, true));

    let xoff = 0;
    for(let i = 0; i < this.cols; i++) {
      xoff += this.increment;
      let yoff = 0;
      for (let j = 0; j <this. rows; j++) {
        this.field[i][j] = float(this.noise.noise2D(xoff, yoff));
        yoff += this.increment;
      }
    }

    // March squares algorithm
    for(let i = 0; i < this.cols - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        const x = i * this.rez;
        const y  = j * this.rez;
        const a = createVector(x + this.rez * 0.5, y);
        const b = createVector(x + this.rez, y + this.rez * 0.5);
        const c = createVector(x + this.rez * 0.5, y + this.rez);
        const d = createVector(x , y + this.rez * 0.5);
        strokeWeight(1);
        const state = GenerateTerrain.getState(ceil(this.field[i][j]), ceil(this.field[i+1][j]), ceil(this.field[i+1][j+1]), ceil(this.field[i][j+1]));
        stroke(255);
        switch(state) {
          case 1:
            this.generateBoundary(c,d);
            break;
          case 2:
            this.generateBoundary(b,c);
            break;
          case 3:
            this.generateBoundary(b,d);
            break;
          case 4:
            this.generateBoundary(a,b);
            break;
          case 5:
            this.generateBoundary(a,d);
            this.generateBoundary(b,c);
            break;
          case 6:
            this.generateBoundary(a,c);
            break;
          case 7:
            this.generateBoundary(a,d);
            break;
          case 8:
            this.generateBoundary(a,d);
            break;
          case 9:
            this.generateBoundary(a,c);
            break;
          case 10:
            this.generateBoundary(a,b);
            this.generateBoundary(c,d);
            break;
          case 11:
            this.generateBoundary(a,b);
            break;
          case 12:
            this.generateBoundary(b,d);
            break;
          case 13:
            this.generateBoundary(b,c);
            break;
          case 14:
            this.generateBoundary(c,d);
            break;
        }
      }
    }
  }

  static getState(a,b,c,d) {
    return a * 8 + b * 4 + c * 2 + d;
  }

  generateBoundary(v1, v2) {
    this.walls.push(new Boundary(v1.x, v1.y, v2.x, v2.y));
  }
}