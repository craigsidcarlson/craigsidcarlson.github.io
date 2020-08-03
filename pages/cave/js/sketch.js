let width;
let height;
let terrain;
let particle;
const move_distance = 1.618;
function setup() {
  width = windowWidth *0.95;
  height = windowHeight*0.95;
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  const cnv = createCanvas(width, height);
  cnv.position(x, y);
  const particle_fov = 60;
  const resolution = 12;
  // width = windowWidth;
  // height = windowHeight;
  terrain = new GenerateTerrain(resolution);
  particle = new Particle(particle_fov);
}

 
function draw() {
  if (!terrain || !terrain.walls) return;
  if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.05);
  } else if(keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.05);
  } 
  if(keyIsDown(UP_ARROW) && !particle.blocked) {
    particle.move(move_distance);
  }
 
  background(0);

  particle.show();
  particle.look();
  if (keyIsDown(CONTROL)) {
    for (let i = 0; i < terrain.walls.length; i++) {
      terrain.walls[i].cheat();
    }
  } else {
    for (let i = 0; i < terrain.walls.length; i++) {
      terrain.walls[i].show();
    }
  }
}

