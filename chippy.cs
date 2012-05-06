window.Chippy = root = {}

snake = null
space = null
v = cp.v

# this ties an SVG element to a Chipmunk shape and body
# if you want to reuse SVG shapes, use the "use" element
class Thing
  constructor: (@svg, @size, @mass, @moment)->
    @bbox = @svg.getBBox()
    @aspect = @bbox.width / @bbox.height
    if @moment == Infinity then @body = space.staticBody
    else @body = space.addBody new cp.Body(@mass, @moment)
  setShape: (sh)->
    @shape = space.addShape sh
    self = this
    @shape.draw = -> self.svgPosition self.body.p.x, self.body.p.y, self.body.a
  svgPosition: (x, y, rotation)->
    if @size? then @svg.setAttribute 'transform', "translate(#{x}, #{y}) rotate(#{rotation / Math.PI * 180}) scale(#{@size / @bbox.width * @aspect}, #{@size / @bbox.height / @aspect}) translate(#{-@bbox.x  - @bbox.width / 2}, #{-@bbox.y - @bbox.height / 2})"
    else @svg.setAttribute 'transform', "translate(#{x}, #{y}) rotate(#{rotation / Math.PI * 180}) translate(#{-@bbox.x  - @bbox.width / 2}, #{-@bbox.y - @bbox.height / 2})"
  setPos: (x, y)-> @body.setPos v(x, y)
  setElasticity: (e)-> @shape.setElasticity e
  setFriction: (f)-> @shape.setFriction f
  setAngVel: (v)-> @body.w = v

initChippy = ->
  space = new cp.Space();
  space.gravity = v 0, 230
  snakeMass = 200
  snakeSize = 100
  snake = new Thing document.getElementById('snake'), snakeSize, snakeMass, cp.momentForCircle(snakeMass, 0, snakeSize, v(0, 0))
  snake.setPos 100, 300
  snake.setShape new cp.CircleShape(snake.body, snake.size / 2, v(0, 0))
  snake.setElasticity 1.2
  snake.setFriction 2
  snake.setAngVel 1
  ground = new Thing document.getElementById('ground'), null, 0, Infinity
  b = ground.svg.getBBox()
  ground.setPos b.x, b.y
  ground.setShape new cp.SegmentShape ground.body, v(-b.width / 2, 0), v(b.width / 2, 0), 1
  ground.setElasticity 0.6
  ground.setFriction 1

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
