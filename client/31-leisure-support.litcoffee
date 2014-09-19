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
    } = require '17-runtime'
    _ = require 'lodash.min'

    lz = lazy
    rz = resolve

    define 'incrementField', (lz (path)->$F(arguments, lz (amount)->
      makeMonad (env, cont)->
        Meteor.call 'incrementField', root.currentDocument.leisure.name, rz(path), rz(amount), (err, res)->
          cont res?.error ? res
    #), 2, null, null, null, true
    )), 2
