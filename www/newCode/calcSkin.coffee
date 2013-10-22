{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require './base'
rz = resolve
lz = lazy
{
  createNode,
} = require './browserSupport'

menuInfo =
  class: 'mode'
  width: 74
  height: 46
  tops: [364]
  lefts: [23, 143, 263, 383, 503, 623]

topInfo =
  class: 'function'
  width: 74
  height: 58
  tops: [444, 545, 647]
  lefts: [23, 143, 263, 383, 503, 623]

enterButtonInfo =
  class: 'enterButton'
  width: 194
  height: 58
  tops: [748]
  lefts: [23]

enterRowInfo =
  class: 'enterRow'
  width: 74
  height: 58
  tops: [748]
  lefts: [263, 383, 503, 623]

numberKeysInfo =
  class: 'numbers'
  width: 98
  height: 59
  tops: [850, 952, 1053, 1155]
  lefts: [23, 167, 311, 455, 599]

infos = [menuInfo, topInfo, enterButtonInfo, enterRowInfo, numberKeysInfo]

useSkin = ->
  $('body')
    .addClass('calcMain')
  $(document.head).append "<link href='calcSkin.css' rel='stylesheet' type='text/css'>"
  for info in infos
    createInfoDivs info
  setInput numberKeysInfo, 0, 3, 1
  setInput numberKeysInfo, 1, 2, 1
  setInput numberKeysInfo, 2, 2, 2
  setInput numberKeysInfo, 3, 2, 3
  setInput numberKeysInfo, 4, 1, 1
  setInput numberKeysInfo, 5, 1, 2
  setInput numberKeysInfo, 6, 1, 3
  setInput numberKeysInfo, 7, 0, 1
  setInput numberKeysInfo, 8, 0, 2
  setInput numberKeysInfo, 9, 0, 3
  setInput numberKeysInfo, '/', 0, 4
  setInput numberKeysInfo, '*', 1, 4
  setInput numberKeysInfo, '-', 2, 4
  setInput numberKeysInfo, '+', 3, 4
  setInput numberKeysInfo, '.', 3, 2
  setInput numberKeysInfo, ' ', 3, 3
  enterRowInfo.divs[0][3].mousedown (evt)->
    document.execCommand 'insertText', false, String(input)
    evt.preventDefault()

  menuInfo.divs[0][0].mousedown (evt)->
    evt.preventDefault()
    $('#simplifiedPanel').addClass 'hidden'
    $('#astPanel').toggleClass 'hidden'
  menuInfo.divs[0][1].mousedown (evt)->
    evt.preventDefault()
    $('#astPanel').addClass 'hidden'
    $('#simplifiedPanel').toggleClass 'hidden'

setInput = (info, input, top, left)->
  info.divs[top][left].mousedown (evt)->
    document.execCommand 'insertText', false, String(input)
    evt.preventDefault()

createInfoDivs = (info)->
  info.divs = for top in [0...info.tops.length]
    for left in [0...info.lefts.length]
      div = $(document.createElement 'DIV')
      div
        .addClass('calcButton')
        .addClass(info.class)
        .addClass("top#{top}")
        .addClass("left#{left}")
      $('#calc').append div
      div

root.useSkin = useSkin
