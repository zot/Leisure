Copyright (C) 2013-2014, by Bill Burdick, Roy Riggs, Tiny Concepts, TEAM CTHULHU: http://www.teamcthulhu.com/
[Licensed with ZLIB License](../LICENSE)

Leisure integration for environment

    root = require '15-base'
    {
      lazy,
      resolve,
    } = root
    {
      define,
    } = require '16-ast'
    {
      makeMonad,
      _true,
    } = require '17-runtime'
    {
      addDataAfter,
      getDataNamed,
      setDataNamed,
    } = require '23-collaborate'
    {
      toggleLeisureBar,
    } = require '24-orgSupport'
    _ = require 'lodash.min'

    lz = lazy
    rz = resolve

    define 'serverIncrement', ((path, amount, more)->
      if Leisure_shouldDispatch(amount, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)->
        Meteor.call 'incrementField', root.currentDocument.leisure.name, rz(path), rz(amount), (err, res)->
          cont res?.error ? res
    ), 2

    define 'serverAppend', ((path, item, more)->
      if Leisure_shouldDispatch(item, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)->
        Meteor.call 'appendToField', root.currentDocument.leisure.name, rz(path), rz(item), (err, res)->
          cont res?.error ? res
    ), 2

    define 'addDataAfter', (id, value, attrLine, more)->
      if Leisure_shouldDispatch(attrLine, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)->
        cont addDataAfter (rz id), (rz value), (rz attrLine)

    define 'addNamedDataAfter', (name, id, value, attrLine, more)->
      if Leisure_shouldDispatch(attrLine, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)->
        cont addDataAfter (rz id), (rz value), (rz attrLine), null, rz name

    define 'getBaseDataNamed', (name, more)->
      if Leisure_shouldDispatch(name, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)-> cont getDataNamed rz name

    define 'setBaseDataNamed', (name, value, more)->
      if Leisure_shouldDispatch(value, more) then return Leisure.dispatch arguments
      makeMonad (env, cont)->
        setDataNamed rz(name), rz(value)
        cont _true

    define 'toggleLeisureBar', (makeMonad (env, cont)->
      toggleLeisureBar()
      cont _true)
