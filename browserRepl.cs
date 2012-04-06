if window? and (!global? or global == window)
  window.global = window
  window.Repl = root = {}
  Pretty = window.Pretty
else root = exports ? this

lastLine = null
input = null
write = null

init = (inputField, output, defs)->
  write = (line)-> defs.innerHTML += line
  ReplCore.setWriter (line)-> output.innerHTML += line
  ReplCore.setNext -> input.value = ''
  ReplCore.setHandler (ast, result, a, c, r, src)->
    if ast.lazpName? then defs.innerHTML += "#{markupDef(src, ast)}<br>"
    else if result then output.innerHTML += "<b>> #{lastLine} \u2192</b>\n  #{ReplCore.getType result}: #{Pretty.print result}\n"
    ReplCore.processResult result
  input = inputField
  input.onkeypress = (e)->
    if (e.charCode || e.keyCode || e.which) == 13
      lastLine = input.value.replace(/\\/g, '\u03BB')
      ReplCore.processLine(lastLine)
  input.select()

markupDef = (src, ast)->
  if src.match /^\s*#/ then src
  if (match = src.match Lazp.linePat)
    [matched, leading, name, defType] = match
    "<b>#{name}</b> #{defType} #{src.substring(matched.length)}"
  else line

markupLines = (lines)-> lines.split('\n').map(markupDef).join('<br>')

handleFiles = (fileElement)->
  files = fileElement.files
  reader = new FileReader()
  reader.onerror = (evt)->
    window.e = evt
    alert('error' + evt)
    fileElement.value = null
  reader.onload = ->
    code = ReplCore.generateCode(files[0], reader.result, false, true)
    eval(code)
    fileElement.value = null
  reader.readAsText(files[0])
  input.select()

processResult = (result)->
  write("#{getType result}: #{P.print(result)}\n")
  ReplCore.processResult result

root.init = init
root.markupDef = markupDef
root.markupLines = markupLines
root.handleFiles = handleFiles