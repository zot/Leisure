(function() {
  var Thing, draw, fps, initChippy, lastStep, remainder, requestAnimationFrame, resized, root, run, running, snake, space, step, update, v;

  window.Chippy = root = {};

  snake = null;

  space = null;

  v = cp.v;

  Thing = (function() {

    function Thing(svg, size, mass, moment) {
      this.svg = svg;
      this.size = size;
      this.mass = mass;
      this.moment = moment;
      this.bbox = this.svg.getBBox();
      this.aspect = this.bbox.width / this.bbox.height;
      if (this.moment === Infinity) {
        this.body = space.staticBody;
      } else {
        this.body = space.addBody(new cp.Body(this.mass, this.moment));
      }
    }

    Thing.prototype.setShape = function setShape(sh) {
      var self;
      this.shape = space.addShape(sh);
      self = this;
      return this.shape.draw = function draw() {
        return self.svgPosition(self.body.p.x, self.body.p.y, self.body.a);
      };
    };

    Thing.prototype.svgPosition = function svgPosition(x, y, rotation) {
      if (this.size != null) {
        return this.svg.setAttribute('transform', "translate(" + x + ", " + y + ") rotate(" + (rotation / Math.PI * 180) + ") scale(" + (this.size / this.bbox.width * this.aspect) + ", " + (this.size / this.bbox.height / this.aspect) + ") translate(" + (-this.bbox.x - this.bbox.width / 2) + ", " + (-this.bbox.y - this.bbox.height / 2) + ")");
      } else {
        return this.svg.setAttribute('transform', "translate(" + x + ", " + y + ") rotate(" + (rotation / Math.PI * 180) + ") translate(" + (-this.bbox.x - this.bbox.width / 2) + ", " + (-this.bbox.y - this.bbox.height / 2) + ")");
      }
    };

    Thing.prototype.setPos = function setPos(x, y) {
      return this.body.setPos(v(x, y));
    };

    Thing.prototype.setElasticity = function setElasticity(e) {
      return this.shape.setElasticity(e);
    };

    Thing.prototype.setFriction = function setFriction(f) {
      return this.shape.setFriction(f);
    };

    Thing.prototype.setAngVel = function setAngVel(v) {
      return this.body.w = v;
    };

    return Thing;

  })();

  initChippy = function initChippy() {
    var b, ground, snakeMass, snakeSize;
    space = new cp.Space();
    space.gravity = v(0, 230);
    snakeMass = 200;
    snakeSize = 100;
    snake = new Thing(document.getElementById('snake'), snakeSize, snakeMass, cp.momentForCircle(snakeMass, 0, snakeSize, v(0, 0)));
    snake.setPos(100, 300);
    snake.setShape(new cp.CircleShape(snake.body, snake.size / 2, v(0, 0)));
    snake.setElasticity(1.2);
    snake.setFriction(2);
    snake.setAngVel(1);
    ground = new Thing(document.getElementById('ground'), null, 0, Infinity);
    b = ground.svg.getBBox();
    ground.setPos(b.x, b.y);
    ground.setShape(new cp.SegmentShape(ground.body, v(-b.width / 2, 0), v(b.width / 2, 0), 1));
    ground.setElasticity(0.6);
    return ground.setFriction(1);
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
