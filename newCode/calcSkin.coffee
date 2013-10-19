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
  menuInfo.divs[0][0].click (evt)->
    $('#simplifiedPanel').addClass 'hidden'
    $('#astPanel').toggleClass 'hidden'
  menuInfo.divs[0][1].click (evt)->
    $('#astPanel').addClass 'hidden'
    $('#simplifiedPanel').toggleClass 'hidden'
  $(document.body)
    .css('font-size', '36px')
  $('#input')
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
  $('#outputLabel').css('display', 'none')
  $('#output')
    .css('top', 'calc(49px * 4.5)')
    .css('height', 'calc(49px * 2)')
    .css('left', '32px')
    .css('padding', '0')
    .css('padding-left', '2px')
    .css('padding-right', '2px')
    .css('width', '651px')
    .css('position', 'fixed')
    .css('margin', '0')
    .css('border', 'none')
    .css('outline', '1px solid green')
  $('#astPanel')
    .css('top', '444px')
    .css('left', '32px')
    .css('width', '655px')
    .css('height', 'calc(800px - 444px)')
    .css('background', 'white')
    .css('position', 'fixed')
    .css('z-index', '1')
    .css('padding', '0')
    .css('margin', '0')
  $('#astLabel').css('display', 'none')
  $('#ast')
    .css('width', 'calc(100% - 4px)')
    .css('height', '100%')
    .css('border', 'none')
    .css('padding', '2px')
  $('#simplifiedPanel')
    .css('top', '444px')
    .css('left', '32px')
    .css('width', '655px')
    .css('height', 'calc(800px - 444px)')
    .css('background', 'white')
    .css('position', 'fixed')
    .css('z-index', '1')
    .css('padding', '0')
    .css('margin', '0')
  $('#simplifiedLabel').css('display', 'none')
  $('#simplified')
    .css('width', 'calc(100% - 4px)')
    .css('height', '100%')
    .css('border', 'none')
    .css('padding', '2px')

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
