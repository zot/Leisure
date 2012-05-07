window.Chippy = root = {}

snake = null
space = null
v = cp.v

# this ties an SVG element to a Chipmunk shape and body
# if you want to reuse SVG shapes, use the "use" element
class PolyThing
  constructor: (name, @mass)->
    @svg = document.getElementById(name)
    skel = document.getElementById "#{name}-skeleton"
    bbox = skel.getBBox()
    @midx = bbox.x + bbox.width / 2
    @midy = bbox.y + bbox.height / 2
    pts = (getPoints skel)
    @body = if @mass == Infinity then space.staticBody else space.addBody new cp.Body(@mass, cp.momentForPoly(@mass, pts, v(0,0)))
    @setPos @midx, @midy
    @shape = space.addShape (new cp.PolyShape @body, pts, v(0,0))
    self = this
    @shape.draw = -> self.svgPosition self.body.p.x, self.body.p.y, self.body.a
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
    skel = document.getElementById "#{name}-skeleton"
    pts = (getPoints skel, 0, 0)
    @body = space.staticBody
    @body.setPos v(0, 0)
    @shapes = []
    for i in [0...pts.length - 2] by 2
      shape = space.addShape new cp.SegmentShape @body, v(pts[i], pts[i + 1]), v(pts[i + 2], pts[i + 3]), 1
      shape.draw = ->
      @shapes.push shape
  setElasticity: (e)->
    for s in @shapes
      s.setElasticity e
  setFriction: (f)->
    for s in @shapes
      s.setFriction f

initChippy = ->
  space = new cp.Space();
  space.gravity = v 0, 230
  snake = new PolyThing 'boulder', 200
  snake.setElasticity 1.2
  snake.setFriction 2
  snake.setAngVel 7
  ground = new GroundThing 'ground'
  ground.setElasticity 0.6
  ground.setFriction 1

getPoints = (svg, midx, midy)->
  pts = []
  lastx = 0
  lasty = 0
  if !midx?
    bbox = svg.getBBox()
    midx = bbox.x + bbox.width / 2
    midy = bbox.y + bbox.height / 2
  console.log "POINTS..."
  for p in (svg.getAttribute 'd').split ' '
    crds = p.split ','
    if crds.length == 2
      lastx += Number(crds[0])
      lasty += Number(crds[1])
      pts.unshift lastx - midx, lasty - midy
  console.log ""
  pts

lastStep = Date.now()
remainder = null
resized = true

update = (dt)-> space.step(dt)

running = false

run = ->
  running = true
  stepper = ->
    step()
    if running then requestAnimationFrame(stepper)
  lastStep = Date.now()
  stepper()

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

requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  ((callback)->return window.setTimeout(callback, 1000 / 60))

root.initChippy = initChippy
root.run = run
