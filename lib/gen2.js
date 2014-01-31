// Generated by CoffeeScript 1.6.3
/*
# New code generation example
*/


(function() {
  var LeisureFunc, cons, cons2, head, lambda1, lambda2, lambda3, plus, plus2, root, rz,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = module.exports;

  rz = global.resolve = function(value) {
    if (typeof value === 'function') {
      if (typeof value.memo !== 'undefined') {
        return value.memo;
      } else {
        if (value.creationStack) {
          value.creationStack = null;
        }
        if (value.args) {
          value.args = null;
        }
        return value.memo = value();
      }
    } else {
      return value;
    }
  };

  LeisureFunc = (function() {
    function LeisureFunc() {}

    LeisureFunc.prototype.call = function(arg) {
      return this;
    };

    return LeisureFunc;

  })();

  cons = {
    __proto__: LeisureFunc.prototype,
    call: function(a) {
      return new cons2(a, this);
    },
    arity: 2
  };

  cons2 = (function(_super) {
    __extends(cons2, _super);

    function cons2(a) {
      this.a = a;
    }

    cons2.prototype.call = function(b) {
      return new lambda1(b, this);
    };

    cons2.prototype.arity = 1;

    return cons2;

  })(LeisureFunc);

  lambda1 = (function(_super) {
    __extends(lambda1, _super);

    function lambda1(b, __parent__) {
      this.b = b;
      this.__parent__ = __parent__;
    }

    lambda1.prototype.call = function(f) {
      return rz(f).call(this.__parent__.a).call(this.b);
    };

    lambda1.prototype.arity = 1;

    return lambda1;

  })(LeisureFunc);

  head = {
    __proto__: LeisureFunc.prototype,
    call: function(l) {
      return rz(l).call(lambda2);
    },
    arity: 1
  };

  lambda2 = {
    __proto__: LeisureFunc.prototype,
    call: function(a) {
      return new lambda3(a, this);
    },
    arity: 1
  };

  lambda3 = (function(_super) {
    __extends(lambda3, _super);

    function lambda3(a) {
      this.a = a;
    }

    lambda3.prototype.call = function(b) {
      return rz(this.a);
    };

    lambda3.prototype.arity = 1;

    return lambda3;

  })(LeisureFunc);

  plus = {
    __proto__: LeisureFunc.prototype,
    call: function(a) {
      return new plus2(a, this);
    },
    arity: 2
  };

  plus2 = (function(_super) {
    __extends(plus2, _super);

    function plus2(a) {
      this.a = a;
    }

    plus2.prototype.call = function(b) {
      return rz(this.a) + rz(b);
    };

    plus2.prototype.arity = 1;

    return plus2;

  })(LeisureFunc);

  console.log("1 + 2 = " + (plus.call(1).call(2)));

  console.log("head (cons 1 2): " + (head.call(function() {
    return cons.call(1).call(2);
  })));

}).call(this);

/*
//@ sourceMappingURL=gen2.map
*/