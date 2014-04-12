Leisure = window.Leisure ? (window.Leisure = {})
reqGuard = false

window.require = (file)->
  if reqGuard then Leisure
  else
    reqGuard = true
    try
      Leisure.require(file)
    finally
      reqGuard = false
