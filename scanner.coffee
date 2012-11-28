###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
###

if window? and (!global? or global == window)
  window.global = window
  Leisure = window.Leisure
  ReplCore = window.ReplCore
  window.CodeScanner = root = {}
  Prim = window.Prim
  Repl = window.Repl
  Notebook = window.Notebook
  Xus = window.Xus
  $ = window.$
else root = exports ? this

class NodeReplicator
  constructor: (@original)-> @nodes = [@original]
  replicate: (from)->
    for node in nodes
      if node != from then node.innerHTML = from.innerHTML

createScanner = ->
  scanner = Notebook.createNode """<div id='draggable2' class='ui-widget-content' style='width: 250px'>
    <div class='ui-widget-header'>handle.</div>
    <p>Stuff</p>
  </div>"""
  $(scanner).draggable({handle: ".ui-widget-header"}).disableSelection()
  document.body.appendChild scanner

root.createScanner = createScanner
