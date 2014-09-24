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

    define 'incrementField', (lz (path)->$F(arguments, lz (amount)->
      makeMonad (env, cont)->
        Meteor.call 'incrementField', root.currentDocument.leisure.name, rz(path), rz(amount), (err, res)->
          cont res?.error ? res
    #), 2, null, null, null, true
    )), 2

    define 'addDataAfter', lz (id)->$F(arguments, lz (value)-> $F(arguments, lz (attrLine)->
      makeMonad (env, cont)->
        addDataAfter (rz id), (rz value), (rz attrLine)
        cont _true))

    define 'getBaseDataNamed', lz (name)->
      makeMonad (env, cont)-> cont getDataNamed rz name

    define 'setBaseDataNamed', lz (name)-> $F(arguments, lz (value)->
      makeMonad (env, cont)->
        setDataNamed rz(name), rz(value)
        cont _true)

    define 'toggleLeisureBar', lz (makeMonad (env, cont)->
      toggleLeisureBar()
      cont _true)
