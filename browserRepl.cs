if window? and (!global? or global == window)
  window.global = window
  window.Repl = root = {}
  Pretty = window.Pretty
else root = exports ? this

lastLine = null

init = (input, output, defs)->
  ReplCore.setWriter (line)-> output.innerHTML += line
  ReplCore.setNext -> input.value = ''
  ReplCore.setHandler (ast, result, a, c, r)->
    if ast.lazpName? then defs.innerHTML += "#{markupDef(lastLine)}<br>"
    else output.innerHTML += "#{lastLine} \u2192\n  #{ReplCore.getType result}: #{Pretty.print result}\n"
  input.onkeypress = (e)->
    if (e.charCode || e.keyCode || e.which) == 13
      lastLine = input.value.replace(/\\/g, '\u03BB')
      ReplCore.processLine(lastLine)
  ReplCore.help()

markupDef = (line)->
  if (match = line.match /^[^=]*(?=\s*=)/) then "<b>#{match[0]}</b>#{line.substring(match[0].length)}"
  else line

markupLines = (lines)-> lines.split('\n').map(markupDef).join('<br>')

root.init = init
root.markupDef = markupDef
root.markupLines = markupLines