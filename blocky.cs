Blocky = root = {}
if window?
  Leisure = window.Leisure
  Prim = window.Prim
  window.Blocky = root
  v = cp.v
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    ((callback)->return window.setTimeout(callback, 1000 / 60))
else
  Leisure = require './leisure'
  Prim = require './prim'

doc = null
block = null
space = null
ground = null

# this ties an SVG element to a Chipmunk shape and body
# if you want to reuse SVG shapes, use the "use" element
class CircleThing
  constructor: (name, @mass)->
    @svg = doc.getElementById(name)
    skel = doc.getElementById "#{name}-skeleton"
    if !skel? then skel = @svg
    bbox = skel.getBBox()
    @midx = bbox.x + bbox.width / 2
    @midy = bbox.y + bbox.height / 2
    pts = (getPoints skel)
    @body = if @mass == Infinity then space.staticBody else space.addBody new cp.Body(@mass, cp.momentForCircle(@mass, 0, bbox.width / 2, v(0,0)))
    @setPos @midx, @midy
    @shape = space.addShape (new cp.CircleShape @body, bbox.width / 2, v(0,0))
    self = this
    @shape.draw = -> self.svgPosition self.body.p.x, self.body.p.y, self.body.a
  svgPosition: (x, y, rotation)->
    @svg.setAttribute 'transform', "translate(#{x}, #{y}) rotate(#{rotation / Math.PI * 180}) translate(#{-@midx}, #{-@midy})"
  setPos: (x, y)-> @body.setPos v(x, y)
  setElasticity: (e)-> @shape.setElasticity e
  setFriction: (f)-> @shape.setFriction f
  setAngVel: (v)-> @body.w = v

class PolyThing
  constructor: (name, @mass)->
    @svg = doc.getElementById(name)
    skel = doc.getElementById "#{name}-skeleton"
    if !skel? then skel = @svg
    bbox = skel.getBBox()
    @midx = bbox.x + bbox.width / 2
    @midy = bbox.y + bbox.height / 2
    pts = (getPoints skel)
    @pts = []
    for i in [0...pts.length] by 2
      @pts.push v(pts[i], pts[i + 1])
    @body = if @mass == Infinity then space.staticBody else space.addBody new cp.Body(@mass, cp.momentForPoly(@mass, pts, v(0,0)))
    @setPos @midx, @midy
    @shape = space.addShape (new cp.PolyShape @body, pts, v(0,0))
    self = this
    @shape.draw = -> self.svgPosition self.body.p.x, self.body.p.y, self.body.a
  pointClosestTo: (p)->
    r = @pts[0]
    d = cp.v.dot(r, r)
    for i in [1...@pts.length]
      s = cp.v.sub(p, @pts[i])
      td = cp.v.dot(s, s)
      if td < d
        d = td
        r = s
    r
  svgPosition: (x, y, rotation)->
    @svg.setAttribute 'transform', "translate(#{x}, #{y}) rotate(#{rotation / Math.PI * 180}) translate(#{-@midx}, #{-@midy})"
  setPos: (x, y)-> @body.setPos v(x, y)
  setElasticity: (e)-> @shape.setElasticity e
  setFriction: (f)-> @shape.setFriction f
  setAngVel: (v)-> @body.w = v

# this ties an SVG element to a Chipmunk shape and body
# if you want to reuse SVG shapes, use the "use" element
class GroundThing
  constructor: (name)->
    skel = doc.getElementById "#{name}-skeleton"
    pts = (getPoints skel, 0, 0)
    @body = space.staticBody
    @body.setPos v(0, 0)
    @shapes = []
    for i in [0...pts.length - 2] by 2
      shape = space.addShape new cp.SegmentShape @body, v(pts[i], pts[i + 1]), v(pts[i + 2], pts[i + 3]), 2
      shape.draw = ->
      @shapes.push shape
  setElasticity: (e)->
    for s in @shapes
      s.setElasticity e
  setFriction: (f)->
    for s in @shapes
      s.setFriction f

moveBlockBy = (move)->
  block.body.applyImpulse(Blocky.block.body.rot.mult(move * Blocky.block.body.m), v(0, 0))

jumpBlockBy = (move)->
  block.body.applyImpulse(v(0, -1).mult(move * Blocky.block.body.m), v(0, 0))

initBlocky = (document)->
  doc = document
  root.space = space = new cp.Space()
  space.gravity = v 0, 230
  root.block = block = new PolyThing 'block', 100
  block.setElasticity 0
  block.setFriction 0.5
  block.v_limit = 200
  ###
  root.forward = forward = new CircleThing 'forward', 10
  forward.setElasticity 0
  forward.setFriction 0
  space.addConstraint new cp.PivotJoint(block.body, forward.body, forward.body.p)
  root.reverse = reverse = new CircleThing 'reverse', 10
  reverse.setElasticity 0
  reverse.setFriction 0
  space.addConstraint new cp.PivotJoint(block.body, reverse.body, reverse.body.p)
  ###
  root.forward = root.reverse = root.block
  root.ground = ground = new GroundThing 'ground'
  ground.setElasticity 0
  ground.setFriction 1

touchingGround = (shape)->
  for arb in space.arbiters
    bodies = [arb.body_a, arb.body_b]
    if (shape.body in bodies) and (ground.body in bodies) then return true
  return false

wright = (shape)->
  a = null
  found = false
  for arb in space.arbiters
    bodies = [arb.body_a, arb.body_b]
    if (shape.body in bodies) and (ground.body in bodies)
      if found then return
      a = arb
  window.ARB = a

getPoints = (svg, midx, midy)->
  pts = []
  lastx = 0
  lasty = 0
  if !midx?
    bbox = svg.getBBox()
    midx = bbox.x + bbox.width / 2
    midy = bbox.y + bbox.height / 2
  for p in (svg.getAttribute 'd').split ' '
    crds = p.split ','
    if crds.length == 2
      lastx += Number(crds[0])
      lasty += Number(crds[1])
      pts.push lastx - midx, lasty - midy
  pts

svgTransform = (svg, x, y)->
  if !pt? then pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  pt.matrixTransform(svg.getCTM())

##############
# Running it
##############

Leisure.define 'startPhysics', Prim.makeMonad (env, cont)-> startStepper -> cont(false)

Leisure.define 'stepPhysics', Prim.makeMonad (env, cont)-> stepper -> cont(false)

lastStep = Date.now()
remainder = null
resized = true

update = (dt)-> space.step(dt)

running = false

stepper = (cont)->
  step()
  requestAnimationFrame(cont)

startStepper = (cont)->
  running = true
  lastStep = Date.now()
  stepper(cont)

fps = 0

step = ->
  now = Date.now()
  dt = (now - lastStep) / 1000
  lastStep = now
  if (dt > 0) then fps = 0.7 * fps + 0.3 /dt
  dt = Math.min(dt, 1/25) # throttle from chipmunk-js demo
  remainder += dt
  while remainder > 1/60
    remainder -= 1/60
    update 1/60
  lastNumActiveShapes = space.activeShapes.count;
  if lastNumActiveShapes > 0 || resized
    draw()
    resized = false

draw = -> space.eachShape (shape)-> shape.draw()

root.initBlocky = initBlocky
root.svgTransform = svgTransform
root.touchingGround = touchingGround
root.moveBlockBy = moveBlockBy
root.jumpBlockBy = jumpBlockBy
