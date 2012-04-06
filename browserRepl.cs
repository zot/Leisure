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
  ReplCore.setHandler (ast, result, a, c, r)->
    if ast.lazpName? then defs.innerHTML += "#{markupDef(ast.lazpCode)}<br>"
    else if result then output.innerHTML += "<b>> #{lastLine} \u2192</b>\n  #{ReplCore.getType result}: #{Pretty.print result}\n"
    ReplCore.processResult result
  input = inputField
  input.onkeypress = (e)->
    if (e.charCode || e.keyCode || e.which) == 13
      lastLine = input.value.replace(/\\/g, '\u03BB')
      ReplCore.processLine(lastLine)
  input.select()

markupDef = (line)->
  if line.match /^\s*#/ then line
  if (match = line.match Lazp.linePat)
    [matched, leading, name, defType] = match
    "<b>#{name}</b> #{defType} #{line.substring(matched.length)}"
  else line

markupLines = (lines)-> lines.split('\n').map(markupDef).join('<br>')

handleFiles = (fileElement)->
  files = fileElement.files
  reader = new FileReader()
  reader.onerror = (evt)-> alert('error' + evt)
  reader.onload = ->
    code = ReplCore.generateCode(files[0], reader.result, false)
    eval(code)
  reader.readAsText(files[0])
  fileElement.value = null
  input.select()

processResult = (result)->
  write("#{getType result}: #{P.print(result)}\n")
  ReplCore.processResult result

root.init = init
root.markupDef = markupDef
root.markupLines = markupLines
root.handleFiles = handleFiles