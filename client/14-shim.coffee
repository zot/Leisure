if !Leisure? then Leisure = window.Leisure ? (window.Leisure = {})
reqGuard = false

window.require = (file)->
  if reqGuard then Leisure
  else
    reqGuard = true
    try
      Leisure.require(file)
    finally
      reqGuard = false

for k,v of Org
  Leisure[k] = v

window.Lodash = require 'lodash.min'

jQuery.prototype.shadow = ->
  @
    .map (i, el)-> el.shadowRoot?.firstChild
    .filter (el)-> el?
