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
  width: 74
  height: 46
  tops: [364]
  lefts: [23, 143, 263, 383, 503, 623]

topInfo =
  width: 74
  height: 58
  tops: [444, 545, 647]
  lefts: [23, 143, 263, 383, 503, 623]

enterButtonInfo =
  width: 194
  height: 58
  tops: [748]
  lefts: [23]

enterRowInfo =
  width: 74
  height: 58
  tops: [748]
  lefts: [263, 383, 503, 623]

numberKeysInfo =
  width: 98
  height: 59
  tops: [850, 952, 1053, 1155]
  lefts: [23, 167, 311, 455, 599]

infos = [menuInfo, topInfo, enterButtonInfo, enterRowInfo, numberKeysInfo]

useSkin = ->
  $('body')
    .css('background', 'url(droid48-blank-cropped.png) fixed no-repeat')
    #.css('font', 'font: 100%/1.618 sans-serif')
    .css('line-height', '49px')
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
  $('#input')
    .css('font-size', '36px')
    .css('top', '0')
    .css('height', 'calc(49px * 4)')
    .css('left', '32px')
    .css('padding', '0')
    .css('padding-left', '2px')
    .css('padding-right', '2px')
    .css('width', '651px')
    .css('position', 'fixed')
    .css('margin', '0')
    .css('border', 'none')
    .css('outline', '1px solid black')
  $('#inputLabel').css('display', 'none')
  $('#outputLabel')
    .css('font-size', '36px')
    .css('top', 'calc(49px * 4)')
    .css('position', 'fixed')
  $('#output')
    .css('font-size', '36px')
    .css('top', 'calc(49px * 5)')
    .css('left', '32px')
    .css('padding', '0')
    .css('padding-left', '2px')
    .css('padding-right', '2px')
    .css('width', '651px')
    .css('position', 'fixed')
    .css('margin', '0')
    .css('border', 'none')
    .css('outline', '1px solid green')

setInput = (info, input, top, left)-> info.divs[top][left].click (evt)-> $('#input').append input

createInfoDivs = (info)->
  info.divs = for top in info.tops
    for left in info.lefts
      div = $(document.createElement 'DIV')
      div
        .css('width', info.width)
        .css('height', info.height)
        .css('top', "#{top}px")
        .css('left', "#{left}px")
        .css('position', 'fixed')
        .css('border', 'blue solid 2px')
      $(document.body).append div
      div

root.useSkin = useSkin
