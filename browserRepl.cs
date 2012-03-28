if window? and (!global? or global == window)
  window.global = window
  window.Repl = root = {}
else root = exports ? this

lastLine = null

init = (input, output, defs)->
  ReplCore.setWriter (line)-> output.innerHTML += line
  ReplCore.setNext -> input.value = ''
  ReplCore.setHandler (ast, result, a, c, r)->
    if ast.lazpName? then defs.innerHTML += "#{markupDef(lastLine)}<br>"
    else output.innerHTML += "#{lastLine} \u2192\n  #{result} (#{ReplCore.getType result})\n"
  input.onkeypress = (evt)->
    if evt.charCode == 13
      lastLine = input.value.replace(/\\/g, '\u03BB')
      ReplCore.processLine(lastLine)
  ReplCore.help()

markupDef = (line)->
  match = line.match /^[^=]*(?=\s*=)/
  "<b>#{match[0]}</b>#{line.substring(match[0].length)}"

root.init = init