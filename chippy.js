(function() {
  var Chippy, GroundThing, Leisure, PolyThing, Prim, boulder, collisionSegment, doc, draw, fps, getPoints, initChippy, lastStep, remainder, requestAnimationFrame, resized, root, running, showArbitersAndContacts, showArbitersAndContactsX, space, startStepper, step, stepper, svgTransform, update, v;

  Chippy = root = {};

  if (typeof window !== "undefined" && window !== null) {
    Leisure = window.Leisure;
    Prim = window.Prim;
    window.Chippy = root;
    v = cp.v;
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    });
  } else {
    Leisure = require('./leisure');
    Prim = require('./prim');
  }

  doc = null;

  boulder = null;

  space = null;

  collisionSegment = null;

  PolyThing = (function() {

    function PolyThing(name, mass) {
      var bbox, pts, self, skel;
      this.mass = mass;
      this.svg = doc.getElementById(name);
      skel = doc.getElementById("" + name + "-skeleton");
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
      skel = doc.getElementById("" + name + "-skeleton");
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

  initChippy = function initChippy(document) {
    var ground;
    doc = document;
    space = new cp.Space();
    space.gravity = v(0, 230);
    root.boulder = boulder = new PolyThing('boulder', 200);
    boulder.setElasticity(1.4);
    boulder.setFriction(0.3);
    boulder.setAngVel(10);
    ground = new GroundThing('ground');
    ground.setElasticity(0.6);
    ground.setFriction(1);
    collisionSegment = doc.createElementNS("http://www.w3.org/2000/svg", 'line');
    collisionSegment.setAttribute('style', 'display: none; stroke: #f00; stroke-width: 5');
    collisionSegment.setAttribute('x1', '0');
    collisionSegment.setAttribute('y1', '0');
    collisionSegment.setAttribute('x2', '0');
    collisionSegment.setAttribute('y2', '0');
    return doc.getElementById("layer1").appendChild(collisionSegment);
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

  svgTransform = function svgTransform(svg, x, y) {
    var pt;
    if (!(typeof pt !== "undefined" && pt !== null)) pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.getCTM());
  };

  lastStep = Date.now();

  remainder = null;

  resized = true;

  update = function update(dt) {
    return space.step(dt);
  };

  running = false;

  stepper = function stepper(cont) {
    step();
    return requestAnimationFrame(cont);
  };

  startStepper = function startStepper(cont) {
    running = true;
    lastStep = Date.now();
    return stepper(cont);
  };

  Leisure.define('startPhysics', Prim.makeMonad(function(env, cont) {
    return startStepper(function() {
      return cont(false);
    });
  }));

  Leisure.define('stepPhysics', Prim.makeMonad(function(env, cont) {
    return stepper(function() {
      return cont(false);
    });
  }));

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

  showArbitersAndContacts = function showArbitersAndContacts() {
    var arb, _i, _len, _ref;
    _ref = space.arbiters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      arb = _ref[_i];
      if (arb.a === boulder.shape || arb.b === boulder.shape) {
        collisionSegment.setAttribute('x1', String(boulder.body.p.x));
        collisionSegment.setAttribute('y1', String(boulder.body.p.y));
        collisionSegment.setAttribute('x2', String(arb.contacts[0].p.x));
        collisionSegment.setAttribute('y2', String(arb.contacts[0].p.y));
        collisionSegment.style.display = '';
        return;
      }
    }
    return collisionSegment.style.display = 'none';
  };

  showArbitersAndContactsX = function showArbitersAndContactsX() {
    var arb, cont, contacts, _i, _j, _len, _len2, _ref, _ref2;
    contacts = '';
    _ref = space.arbiters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      arb = _ref[_i];
      _ref2 = arb.contacts;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        cont = _ref2[_j];
        contacts += cont.toString();
        window.cont = cont;
      }
      window.arb = arb;
    }
    if (contacts) return console.log("Contacts: " + contacts);
  };

  root.initChippy = initChippy;

  root.svgTransform = svgTransform;

  root.boulder = boulder;

  root.showArbitersAndContacts = showArbitersAndContacts;

}).call(this);
