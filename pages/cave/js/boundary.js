class Boundary {
  constructor(x1, y1, x2, y2, edge = false) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.edge = edge;
    this.seen = false;
  }

  show() {
    stroke(255);

    if (this.edge) {
      strokeWeight(3);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
      strokeWeight(1);
    }
    if (this.seen) {
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }

  cheat() {
    stroke(255);

    if (this.edge) {
      strokeWeight(3);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
      strokeWeight(1);
    } else {
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
}