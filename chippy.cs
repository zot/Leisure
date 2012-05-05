window.Chippy = root = {}

snake = null
space = null
v = cp.v

class Thing
  constructor: (@svg, @size)->
    @bbox = @svg.getBBox()
    @aspect = @bbox.width / @bbox.height
  position: (x, y, rotation)->
    @svg.setAttribute 'transform', "translate(#{x}, #{y}) rotate(#{rotation}) scale(#{@size / @bbox.width * @aspect}, #{@size / @bbox.height / @aspect}) translate(#{-@bbox.x  - @bbox.width / 2}, #{-@bbox.y - @bbox.height / 2})"

initChippy = ->
  snake = new Thing(document.getElementById('snake'), 100)
  space = new cp.Space();
  space.gravity = v 0, -230
  snake.position(100, 100, 0)
  snakeMass = 200
  snakeB = space.addBody new cp.Body(snakeMass, cp.momentForCircle(snakeMass, 0, snake.size, v(0, 0)))
  snakeB.setPos(v(100, 300))
  snakeS = space.addShape new cp.CircleShape(snakeB, snake.size, v(0, 0))
  snakeS.setElasticity 1.2
  snakeS.setFriction 2
  snakeS.draw = -> snake.position(snakeB.p.x, snakeB.p.y, snakeB.a)

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
