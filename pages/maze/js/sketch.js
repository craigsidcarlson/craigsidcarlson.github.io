let width, height;
let maze;
const cell_size = 100;
let next_index = 0;
let walls = [];
const move_distance = 2;
function setup() {
  width = floor(windowWidth/cell_size) * cell_size;
  height = floor(windowHeight/cell_size) * cell_size;;
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  const cnv = createCanvas(width, height);
  cnv.position(x, y);
  maze = new Maze(width, height, cell_size, next_index);
  while(maze.stack.length) maze.visitCell();
  walls = maze.getWalls();
  const start_x = cell_size / 2;
  const start_y = cell_size / 2;
  const particle_fov = 60;
  particle = new Particle(start_x, start_y, particle_fov);
}
 
function draw() {

  if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.08);
  } else if(keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.08);
  } 
  if(keyIsDown(UP_ARROW) && !particle.blocked) {
    particle.move(move_distance);
  }
 
  background(0);
  particle.show();
  particle.look(walls);

  const victorious = maze.isVictorious(particle.pos);
  if (victorious) {
    for (let i  = 0; i < maze.cells.length; i++) {
      maze.cells[i].cheat();
    }
  } else {
    for (let i  = 0; i < maze.cells.length; i++) {
      maze.cells[i].show();
    }
  }
  maze.showFinish();
}

