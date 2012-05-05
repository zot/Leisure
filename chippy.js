(function() {
  var Thing, draw, fps, initChippy, lastStep, remainder, requestAnimationFrame, resized, root, run, running, snake, space, step, update, v;

  window.Chippy = root = {};

  snake = null;

  space = null;

  v = cp.v;

  Thing = (function() {

    function Thing(svg, size) {
      this.svg = svg;
      this.size = size;
      this.bbox = this.svg.getBBox();
      this.aspect = this.bbox.width / this.bbox.height;
    }

    Thing.prototype.position = function position(x, y, rotation) {
      return this.svg.setAttribute('transform', "translate(" + x + ", " + y + ") rotate(" + rotation + ") scale(" + (this.size / this.bbox.width * this.aspect) + ", " + (this.size / this.bbox.height / this.aspect) + ") translate(" + (-this.bbox.x - this.bbox.width / 2) + ", " + (-this.bbox.y - this.bbox.height / 2) + ")");
    };

    return Thing;

  })();

  initChippy = function initChippy() {
    var snakeB, snakeMass, snakeS;
    snake = new Thing(document.getElementById('snake'), 100);
    space = new cp.Space();
    space.gravity = v(0, -230);
    snake.position(100, 100, 0);
    snakeMass = 200;
    snakeB = space.addBody(new cp.Body(snakeMass, cp.momentForCircle(snakeMass, 0, snake.size, v(0, 0))));
    snakeB.setPos(v(100, 300));
    snakeS = space.addShape(new cp.CircleShape(snakeB, snake.size, v(0, 0)));
    snakeS.setElasticity(1.2);
    snakeS.setFriction(2);
    return snakeS.draw = function draw() {
      return snake.position(snakeB.p.x, snakeB.p.y, snakeB.a);
    };
  };

  lastStep = Date.now();

  remainder = null;

  resized = true;

  update = function update(dt) {
    return space.step(dt);
  };

  running = false;

  run = function run() {
    var stepper;
    running = true;
    stepper = function stepper() {
      step();
      if (running) return requestAnimationFrame(stepper);
    };
    lastStep = Date.now();
    return stepper();
  };

  fps = 0;

  step = function step() {
    var dt, lastNumActiveShapes, now;
    now = Date.now();
    dt = (now - lastStep) / 1000;
    lastStep = now;
    if (dt > 0) fps = 0.7 * fps + 0.3 / dt;
    dt = Math.min(dt, 1 / 25);
    remainder += dt;
    while (remainder > 1 / 60) {
      remainder -= 1 / 60;
      update(1 / 60);
    }
    lastNumActiveShapes = space.activeShapes.count;
    if (lastNumActiveShapes > 0 || resized) {
      draw();
      return resized = false;
    }
  };

  draw = function draw() {
    return space.eachShape(function(shape) {
      return shape.draw();
    });
  };

  requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  });

  root.initChippy = initChippy;

  root.run = run;

}).call(this);
