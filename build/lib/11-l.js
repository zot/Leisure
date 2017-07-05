// Generated by CoffeeScript 1.12.6
(function() {
  var ArrayWrapper, ConcatenatedSequence, L, L_ArrayWrapper, L_ConcatenatedSequence, L_ObjectWrapper, ObjectWrapper, addExtras, largs, patch, prepVarargs, wrap;

  ObjectWrapper = Lazy({}).__proto__;

  ArrayWrapper = Lazy([]).__proto__;

  ConcatenatedSequence = Lazy().concat().__proto__;

  largs = function(args) {
    return Lazy.generate((function(i) {
      return args[i];
    }), args.length);
  };

  prepVarargs = function(args) {
    return Lazy().concat(largs(args)).toArray();
  };

  addExtras = function(proto) {
    var ext;
    return ext = {
      __proto__: proto,
      pick: function() {
        return wrap((arguments.length > 0 ? proto.pick.call(this, prepVarargs(arguments)) : proto.pick.call(this, arguments[0])));
      },
      keys: function() {
        return wrap(proto.keys.call(this));
      },
      values: function() {
        return wrap(proto.values.call(this));
      },
      concat: function() {
        return wrap(proto.concat.apply(this, arguments));
      },
      take: function() {
        return wrap(proto.take.apply(this, arguments));
      },
      drop: function() {
        return wrap(proto.drop.apply(this, arguments));
      }
    };
  };

  L_ArrayWrapper = addExtras(ArrayWrapper);

  L_ObjectWrapper = addExtras(ObjectWrapper);

  L_ConcatenatedSequence = addExtras(ConcatenatedSequence);

  patch = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };

  wrap = function(result) {
    return patch(result, (function() {
      switch (result.__proto__) {
        case ArrayWrapper:
          return L_ArrayWrapper;
        case ObjectWrapper:
          return L_ObjectWrapper;
        case ConcatenatedSequence:
          return L_ConcatenatedSequence;
        default:
          return result.__proto__;
      }
    })());
  };

  L = function() {
    return wrap((arguments.length > 1 ? Lazy().concat(largs(arguments)) : Lazy(arguments[0])));
  };

  patch(L, L_ArrayWrapper);

  (typeof window !== "undefined" && window !== null ? window : global).L = L;

}).call(this);

//# sourceMappingURL=11-l.js.map
