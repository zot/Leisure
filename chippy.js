(function() {
  var GroundThing, PolyThing, draw, fps, getPoints, initChippy, lastStep, remainder, requestAnimationFrame, resized, root, run, running, snake, space, step, update, v;

  window.Chippy = root = {};

  snake = null;

  space = null;

  v = cp.v;

  PolyThing = (function() {

    function PolyThing(name, mass) {
      var bbox, pts, self, skel;
      this.mass = mass;
      this.svg = document.getElementById(name);
      skel = document.getElementById("" + name + "-skeleton");
      bbox = skel.getBBox();
      this.midx = bbox.x + bbox.width / 2;
      this.midy = bbox.y + bbox.height / 2;
      pts = getPoints(skel);
      this.body = this.mass === Infinity ? space.staticBody : space.addBody(new cp.Body(this.mass, cp.momentForPoly(this.mass, pts, v(0, 0))));
      this.setPos(this.midx, this.midy);
      this.shape = space.addShape(new cp.PolyShape(this.body, pts, v(0, 0)));
      self = this;
      this.shape.draw = function draw() {
        return self.svgPosition(self.body.p.x, self.body.p.y, self.body.a);
      };
    }

    PolyThing.prototype.svgPosition = function svgPosition(x, y, rotation) {
      return this.svg.setAttribute('transform', "translate(" + x + ", " + y + ") rotate(" + (rotation / Math.PI * 180) + ") translate(" + (-this.midx) + ", " + (-this.midy) + ")");
    };

    PolyThing.prototype.setPos = function setPos(x, y) {
      return this.body.setPos(v(x, y));
    };

    PolyThing.prototype.setElasticity = function setElasticity(e) {
      return this.shape.setElasticity(e);
    };

    PolyThing.prototype.setFriction = function setFriction(f) {
      return this.shape.setFriction(f);
    };

    PolyThing.prototype.setAngVel = function setAngVel(v) {
      return this.body.w = v;
    };

    return PolyThing;

  })();

  GroundThing = (function() {

    function GroundThing(name) {
      var i, pts, shape, skel, _ref;
      skel = document.getElementById("" + name + "-skeleton");
      pts = getPoints(skel, 0, 0);
      this.body = space.staticBody;
      this.body.setPos(v(0, 0));
      this.shapes = [];
      for (i = 0, _ref = pts.length - 2; i < _ref; i += 2) {
        shape = space.addShape(new cp.SegmentShape(this.body, v(pts[i], pts[i + 1]), v(pts[i + 2], pts[i + 3]), 1));
        shape.draw = function draw() {};
        this.shapes.push(shape);
      }
    }

    GroundThing.prototype.setElasticity = function setElasticity(e) {
      var s, _i, _len, _ref, _results;
      _ref = this.shapes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push(s.setElasticity(e));
      }
      return _results;
    };

    GroundThing.prototype.setFriction = function setFriction(f) {
      var s, _i, _len, _ref, _results;
      _ref = this.shapes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push(s.setFriction(f));
      }
      return _results;
    };

    return GroundThing;

  })();

  initChippy = function initChippy() {
    var ground;
    space = new cp.Space();
    space.gravity = v(0, 230);
    snake = new PolyThing('boulder', 200);
    snake.setElasticity(1.2);
    snake.setFriction(2);
    snake.setAngVel(7);
    ground = new GroundThing('ground');
    ground.setElasticity(0.6);
    return ground.setFriction(1);
  };

  getPoints = function getPoints(svg, midx, midy) {
    var bbox, crds, lastx, lasty, p, pts, _i, _len, _ref;
    pts = [];
    lastx = 0;
    lasty = 0;
    if (!(midx != null)) {
      bbox = svg.getBBox();
      midx = bbox.x + bbox.width / 2;
      midy = bbox.y + bbox.height / 2;
    }
    console.log("POINTS...");
    _ref = (svg.getAttribute('d')).split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      crds = p.split(',');
      if (crds.length === 2) {
        lastx += Number(crds[0]);
        lasty += Number(crds[1]);
        pts.unshift(lastx - midx, lasty - midy);
      }
    }
    console.log("");
    return pts;
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
