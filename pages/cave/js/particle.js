class Particle {
  constructor(fov) {
    this.fov = fov;
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.heading = 0;
    for (let a = -(this.fov/2); a < (this.fov/2); a += 0.5) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    this.blocked = false;
  }

  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -(this.fov/2); a < (this.fov/2); a += 0.5) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  move(v) {
    const velocity = p5.Vector.fromAngle(this.heading);
    velocity.setMag(v);
    this.pos.add(velocity);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
  }

  look() {
    this.blocked = false;
    for (let i = 0; i < this.rays.length; i++) {
      let closest = null;
      let closest_wall_index = null;
      let record = Infinity;
      const middle_ray = this.rays.length / 2 === i;
      for (let j = 0; j < terrain.walls.length; j++) {
        const pt = this.rays[i].cast(terrain.walls[j]);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = this.rays[i].dir.heading() - this.heading;
          d*= cos(a);
          if (d < record) {
            if(middle_ray && d <= move_distance + 2) {
              console.log('blocked');
              this.blocked = true;
            }
            record = d;
            closest = pt;
            closest_wall_index = j;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      if (closest) {
        terrain.walls[closest_wall_index].seen = true;
      } 
    }
  }
}