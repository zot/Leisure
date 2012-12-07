####
# Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl
# 
# (licensed with ZLIB license)
# 
# This software is provided 'as-is', without any express or implied
# warranty. In no event will the authors be held liable for any damages
# arising from the use of this software.
# 
# Permission is granted to anyone to use this software for any purpose,
# including commercial applications, and to alter it and redistribute it
# freely, subject to the following restrictions:
# 
# 1. The origin of this software must not be misrepresented; you must not
# claim that you wrote the original software. If you use this software
# in a product, an acknowledgment in the product documentation would be
# appreciated but is not required.
# 
# 2. Altered source versions must be plainly marked as such, and must not be
# misrepresented as being the original software.
# 
# 3. This notice may not be removed or altered from any source distribution.
####

####
# Use Xus to access storage
# 
# File structure in storage, just use HTML5 file system API for autosave
# Later, do offline mode with syncing
# This lets people share files and get functionality sooner (I think)
# 
# LeisureStorage
#    +- info.json
#    +- Imports -- projects from other users
#    |  +- ImportedProject1-Name -- this is a link to another user's shared Leisure project
#    |  +- ImportedProejct2-Name
#    +- Projects -- your own projects
#       +- Project1-Name
#       |  +- info.json -- list files that are imported: name -> original id -- most likely in an imported project
#       |  +- main.lsr -- main file, which imports the others (order might be important?)
#       |  +- file1.lsr
#       |  +- file2.lsr
#       |  +- import1.lsr -- listed in info.json
#       |  +- import2.lsr -- listed in info.json
#       |  +- ...
#       +- Project2-Name
#       |  +- ...
#       +- ...
# 
####

if window? and (!global? or global == window)
  root = window.Storage ? (window.Storage = {})
  Notebook = window.Notebook ? (window.Notebook = {})
  Xus = window.Xus ? (window.Xus = {})
  window.global = window
else
  root = exports ? this

storageChoices = null
peer = null

initStorage = (callback)->
  if peer then callback()
  else
    peer = Xus.createDirectPeer Notebook.xusServer
    peer.set 'this/name', 'docBase'
    peer.set 'this/links', ['leisure/storage']
    peer.listen 'leisure/storage', false, true, (cmd)->
      storageChoices = peer.get 'leisure/storage'
      callback()

root.initStorage = initStorage
