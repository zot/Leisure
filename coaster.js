(function() {
  var CircleThing, Coaster, GroundThing, Leisure, PolyThing, Prim, boulder, coasterBottom, coasterTop, collisionSegment, doc, draw, fps, getPoints, ground, initCoaster, lastStep, remainder, requestAnimationFrame, resized, root, running, space, startStepper, step, stepper, svgTransform, touchingGround, update, v,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Coaster = root = {};

  if (typeof window !== "undefined" && window !== null) {
    Leisure = window.Leisure;
    Prim = window.Prim;
    window.Coaster = root;
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

  CircleThing = (function() {

    function CircleThing(name, mass) {
      var bbox, pts, self, skel;
      this.mass = mass;
      this.svg = doc.getElementById(name);
      skel = doc.getElementById("" + name + "-skeleton");
      if (!(skel != null)) skel = this.svg;
      bbox = skel.getBBox();
      this.midx = bbox.x + bbox.width / 2;
      this.midy = bbox.y + bbox.height / 2;
      pts = getPoints(skel);
      this.body = this.mass === Infinity ? space.staticBody : space.addBody(new cp.Body(this.mass, cp.momentForCircle(this.mass, 0, bbox.width / 2, v(0, 0))));
      this.setPos(this.midx, this.midy);
      this.shape = space.addShape(new cp.CircleShape(this.body, bbox.width / 2, v(0, 0)));
      self = this;
      this.shape.draw = function draw() {
        return self.svgPosition(self.body.p.x, self.body.p.y, self.body.a);
      };
    }

    CircleThing.prototype.svgPosition = function svgPosition(x, y, rotation) {
      return this.svg.setAttribute('transform', "translate(" + x + ", " + y + ") rotate(" + (rotation / Math.PI * 180) + ") translate(" + (-this.midx) + ", " + (-this.midy) + ")");
    };

    CircleThing.prototype.setPos = function setPos(x, y) {
      return this.body.setPos(v(x, y));
    };

    CircleThing.prototype.setElasticity = function setElasticity(e) {
      return this.shape.setElasticity(e);
    };

    CircleThing.prototype.setFriction = function setFriction(f) {
      return this.shape.setFriction(f);
    };

    CircleThing.prototype.setAngVel = function setAngVel(v) {
      return this.body.w = v;
    };

    return CircleThing;

  })();

  PolyThing = (function() {

    function PolyThing(name, mass) {
      var bbox, i, pts, self, skel, _ref;
      this.mass = mass;
      this.svg = doc.getElementById(name);
      skel = doc.getElementById("" + name + "-skeleton");
      if (!(skel != null)) skel = this.svg;
      bbox = skel.getBBox();
      this.midx = bbox.x + bbox.width / 2;
      this.midy = bbox.y + bbox.height / 2;
      pts = getPoints(skel);
      this.pts = [];
      for (i = 0, _ref = pts.length; i < _ref; i += 2) {
        this.pts.push(v(pts[i], pts[i + 1]));
      }
      this.body = this.mass === Infinity ? space.staticBody : space.addBody(new cp.Body(this.mass, cp.momentForPoly(this.mass, pts, v(0, 0))));
      this.setPos(this.midx, this.midy);
      this.shape = space.addShape(new cp.PolyShape(this.body, pts, v(0, 0)));
      self = this;
      this.shape.draw = function draw() {
        return self.svgPosition(self.body.p.x, self.body.p.y, self.body.a);
      };
    }

    PolyThing.prototype.pointClosestTo = function pointClosestTo(p) {
      var d, i, r, s, td, _ref;
      r = this.pts[0];
      d = cp.v.dot(r, r);
      for (i = 1, _ref = this.pts.length; 1 <= _ref ? i < _ref : i > _ref; 1 <= _ref ? i++ : i--) {
        s = cp.v.sub(p, this.pts[i]);
        td = cp.v.dot(s, s);
        if (td < d) {
          d = td;
          r = s;
        }
      }
      return r;
    };

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

  coasterTop = null;

  coasterBottom = null;

  ground = null;

  initCoaster = function initCoaster(document) {
    var apron, joint, pt;
    doc = document;
    root.space = space = new cp.Space();
    space.gravity = v(0, 230);
    root.coasterTop = coasterTop = new CircleThing('coaster-top', 200);
    coasterTop.setElasticity(0);
    coasterTop.setFriction(10);
    root.apron = apron = new PolyThing('apron', 1);
    coasterTop.shape.group = apron.shape.group = 1;
    pt = apron.pointClosestTo(coasterTop.body.p);
    joint = new cp.PivotJoint(coasterTop.body, apron.body, coasterTop.body.p);
    space.addConstraint(joint);
    root.ground = ground = new GroundThing('ground');
    ground.setElasticity(0);
    return ground.setFriction(1);
  };

  touchingGround = function touchingGround(shape) {
    var arb, bodies, _i, _len, _ref, _ref2, _ref3;
    _ref = space.arbiters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      arb = _ref[_i];
      bodies = [arb.body_a, arb.body_b];
      if ((_ref2 = shape.body, __indexOf.call(bodies, _ref2) >= 0) && (_ref3 = ground.body, __indexOf.call(bodies, _ref3) >= 0)) {
        return true;
      }
    }
    return false;
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

  root.initCoaster = initCoaster;

  root.svgTransform = svgTransform;

  root.boulder = boulder;

  root.touchingGround = touchingGround;

}).call(this);
