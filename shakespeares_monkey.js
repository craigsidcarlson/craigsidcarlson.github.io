let header, body;
let draw_best_header = 'Hi I\'m Craig.';
let draw_best_body = 'Welcome to my site.';
let shakespeare_header, shakespeare_body;
function setup() {
  init();
}

function init() {
  const mutation_rate = 0.01;
  const population_size = 200;
  shakespeare_header = select('#shakespeare_header');
  shakespeare_body = select('#shakespeare_body');

  const possible_header_text = ['Hello World? It\'s Craig', 'Hi my name is Craig', 'Hi, I\'m Craig', 'This is Craig\'s site, leave a message after the beep'];
  const target_header_text = possible_header_text[floor(random(possible_header_text.length))];
  const possible_body_text = ['Welcome to my site, feel free to look around', 'Take a look at what I\'ve been working on', 'The smart rocket game is actually pretty fun', 'Like Beer? Take a look at my beer brewing app', 'I\'m looking for a job', 'Full stack developer looking for a home'];
  const target_body_text = possible_body_text[floor(random(possible_body_text.length))];
  header = new Population(target_header_text, mutation_rate, population_size);
  body = new Population(target_body_text, mutation_rate, population_size);
}
 
function draw() {
  header.evolve();
  body.evolve();
  if(frameCount % 5 === 0)  {
    draw_best_header = header.best;
    draw_best_body = body.best;
  }
  if (header.finished) draw_best_header = header.best;
  if (body.finished) draw_best_body = body.best;
  shakespeare_header.elt.firstChild.textContent = draw_best_header;
  shakespeare_body.elt.firstChild.textContent = draw_best_body;
  if (header.finished && body.finished) {
    console.log('Monkeys have finished');
    noLoop();
  }
}

class Population {
  constructor(target, rate = 0.01, num_ind = 200) {

    this.generation = 0;
    this.finished = false;
    this.target = target;
    this.mutation_rate = rate;
    this.perfect_score = 1;
    this.num_individuals = num_ind;
    this.best = '';
    this.fitness_sum = 0;
    this.max_fitness = 0;
    this.individuals = [];
    for (let i = 0; i < this.num_individuals; i++) {
      this.individuals[i] = new DNA(this.target.length);
    }
  }

  evolve() {
    if (!this.finished) {
      this.calculate_fitness();
      this.natural_selection();
      this.generate();
    }
    // this.evaluate();
  }

  // Calculate Fitness
  calculate_fitness() {
    this.fitness_sum = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      const fitness = this.individuals[i].calculate_fitness(this.target);
      this.fitness_sum += fitness;
    }
  }
  // Generate mating pool
  natural_selection() {
    this.max_fitness = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      if (this.individuals[i].fitness > this.max_fitness) {
        this.max_fitness = this.individuals[i].fitness;
        this.best = this.individuals[i].genes.join('');
        if (this.best === this.target) this.finished = true;
      }
    }

  }
  // Create next generation
  generate() {
    const next_generation = [];
    for (let i = 0; i < this.individuals.length; i++) {
      const parent_a = this.pickOne(this.individuals);
      const parent_b = this.pickOne(this.individuals);
      const child = parent_a.breedWith(parent_b);
      child.mutate(this.mutation_rate);
      next_generation[i] = child;
    }
    this.generation++;
    this.individuals = next_generation;
  }

  pickOne(list) {
    let index = 0;
    let r = random(0, this.fitness_sum);
    while (r > 0) {
      r -= list[index].fitness;
      index++;
    }

    return list[index-1];
  }
}

class DNA {
  constructor(target_length, child = false) {
   this.target_length = target_length;
   this.slice_point = ceil(random(0, this.target_length));
   this.genes = [];
   this.fitness = 0;
   this.accept_probability = 0.01;
   this.possible_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\'.!?,:;/@\\ ';
   if (!child) {
     for ( var i = 0; i < target_length; i++ ) {
       const char = this.generateRandomChar();
       this.genes.push(char);
     }
   }
  }
 
  generateRandomChar() {
     return this.possible_characters.charAt(floor(random(0, this.possible_characters.length)));
  }
 
  calculate_fitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      const this_ascii = this.genes[i].charCodeAt(0);
      const target_ascii = target.charCodeAt(i);
     if(this_ascii === target_ascii) score++;
    }
    this.fitness = score / target.length;
    this.fitness = pow(this.fitness, 5);
    return this.fitness;
  }
 
  breedWith(parent_b) {
   const child = new DNA(this.target_length, true);
   for (let i = 0; i < this.target_length; i++) {
     if (i < this.slice_point) child.genes[i] = this.genes[i];
     else child.genes[i] = parent_b.genes[i];
   }
   return child;
  }
 
  mutate(mutation_rate) {
   for (let i = 0; i < this.genes.length; i++) {
     const random_num = random(0,1);
     if (random_num < mutation_rate) {
       this.genes[i] = this.generateRandomChar();
     }
   }
  }
 }