Chippy = root = {}
if window?
  Leisure = window.Leisure
  Prim = window.Prim
  window.Chippy = root
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
boulder = null
space = null
collisionSegment = null

# this ties an SVG element to a Chipmunk shape and body
# if you want to reuse SVG shapes, use the "use" element
class PolyThing
  constructor: (name, @mass)->
    @svg = doc.getElementById(name)
    skel = doc.getElementById "#{name}-skeleton"
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
    skel = doc.getElementById "#{name}-skeleton"
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

initChippy = (document)->
  doc = document
  space = new cp.Space()
  space.gravity = v 0, 230
  root.boulder = boulder = new PolyThing 'boulder', 200
  boulder.setElasticity 1.4
  boulder.setFriction 0.3
  boulder.setAngVel 10
  ground = new GroundThing 'ground'
  ground.setElasticity 0.6
  ground.setFriction 1
  collisionSegment = doc.createElementNS "http://www.w3.org/2000/svg", 'line'
  collisionSegment.setAttribute 'style', 'display: none; stroke: #f00; stroke-width: 5'
  collisionSegment.setAttribute 'x1', '0'
  collisionSegment.setAttribute 'y1', '0'
  collisionSegment.setAttribute 'x2', '0'
  collisionSegment.setAttribute 'y2', '0'
  doc.getElementById("layer1").appendChild collisionSegment

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
      # use unshift to make the widing right
      pts.unshift lastx - midx, lasty - midy
  console.log ""
  pts

svgTransform = (svg, x, y)->
  if !pt? then pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  pt.matrixTransform(svg.getCTM())

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

Leisure.define 'startPhysics', ->Prim.makeMonad (env, cont)-> startStepper -> cont(false)

Leisure.define 'stepPhysics', ->Prim.makeMonad (env, cont)-> stepper -> cont(false)

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

showArbitersAndContacts = ->
  for arb in space.arbiters
    if arb.a == boulder.shape or arb.b == boulder.shape
      collisionSegment.setAttribute 'x1', String(boulder.body.p.x)
      collisionSegment.setAttribute 'y1', String(boulder.body.p.y)
      collisionSegment.setAttribute 'x2', String(arb.contacts[0].p.x)
      collisionSegment.setAttribute 'y2', String(arb.contacts[0].p.y)
      collisionSegment.style.display = ''
      return
  collisionSegment.style.display = 'none'

showArbitersAndContactsX = ->
  contacts = ''
  for arb in space.arbiters
    for cont in arb.contacts
      contacts += cont.toString()
      window.cont = cont
    window.arb = arb
  if contacts then console.log "Contacts: #{contacts}"

root.initChippy = initChippy
root.svgTransform = svgTransform
root.boulder = boulder
root.showArbitersAndContacts = showArbitersAndContacts
