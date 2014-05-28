    ObjectWrapper = Lazy({}).__proto__
    ArrayWrapper = Lazy([]).__proto__
    ConcatenatedSequence = Lazy().concat().__proto__

    largs = (args)-> Lazy.generate ((i)->args[i]), args.length

    prepVarargs = (args)->
      Lazy()
        .concat(largs args)
        .toArray()

    addExtras = (proto)->
      ext =
        __proto__: proto
        pick: -> wrap (if arguments.length > 0
          proto.pick.call @, prepVarargs arguments
        else proto.pick.call @, arguments[0])
        keys: -> wrap proto.keys.call @
        values: -> wrap proto.values.call @
        concat: -> wrap proto.concat.apply @, arguments
        take: -> wrap proto.take.apply @, arguments
        drop: -> wrap proto.drop.apply @, arguments

    L_ArrayWrapper = addExtras ArrayWrapper
    L_ObjectWrapper = addExtras ObjectWrapper
    L_ConcatenatedSequence = addExtras ConcatenatedSequence

    patch = (obj, proto)->
      obj.__proto__ = proto
      obj

    wrap = (result)->
      patch result, switch result.__proto__
        when ArrayWrapper then L_ArrayWrapper
        when ObjectWrapper then L_ObjectWrapper
        when ConcatenatedSequence then L_ConcatenatedSequence
        else result.__proto__

    L = ->
      wrap (if arguments.length > 1
        Lazy().concat largs arguments
      else Lazy(arguments[0]))

    patch L, L_ArrayWrapper

    if Meteor
      if window? then window.L = L else global.L = L
