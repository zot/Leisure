/*
 * Copyright (C) Dec, 2013, Dominic Tarr
 * MIT License
 *
 * Minor changes by Bill Burdick
 */

(function() {
  if (typeof module == 'undefined') {
      module = {};
  }
  function head (a) {
    return a[0]
  }

  function last (a) {
    return a[a.length - 1]
  }

  function tail(a) {
    return a.slice(1)
  }

  function retreat (e) {
    return e.pop()
  }

  function hasLength (e) {
    return e.length
  }

  function any(ary, test) {
    for(var i=0;i<ary.length;i++)
      if(test(ary[i]))
        return true
    return false
  }

  function score (a) {
    return a.reduce(function (s, a) {
        return s + a.length + a[1] + 1
    }, 0)
  }

  function best (a, b) {
    return score(a) <= score(b) ? a : b
  }


  var _rules // set at the bottom

  // note, naive implementation. will break on circular objects.

  function _equal(a, b) {
    if(a && !b) return false
    if(Array.isArray(a))
      if(a.length != b.length) return false
    if(a && 'object' == typeof a) {
      for(var i in a)
        if(!_equal(a[i], b[i])) return false
      for(var i in b)
        if(!_equal(a[i], b[i])) return false
      return true
    }
    return a == b
  }

  function getArgs(args) {
    return args.length == 1 ? args[0] : [].slice.call(args)
  }

  // return the index of the element not like the others, or -1
  function oddElement(ary, cmp) {
    var c
    function guess(a) {
      var odd = -1
      c = 0
      for (var i = a; i < ary.length; i ++) {
        if(!cmp(ary[a], ary[i])) {
          odd = i, c++
        }
      }
      return c > 1 ? -1 : odd
    }
    //assume that it is the first element.
    var g = guess(0)
    if(-1 != g) return g
    //0 was the odd one, then all the other elements are equal
    //else there more than one different element
    guess(1)
    return c == 0 ? 0 : -1
  }
  var exports = module.exports = function (deps, exports) {
    var equal = (deps && deps.equal) || _equal
    exports = exports || {}
    exports.lcs =
    function lcs() {
      var cache = {}
      var args = getArgs(arguments)
      var a = args[0], b = args[1]

      function key (a,b){
        return a.length + ':' + b.length
      }

      //find length that matches at the head

      if(args.length > 2) {
        //if called with multiple sequences
        //recurse, since lcs(a, b, c, d) == lcs(lcs(a,b), lcs(c,d))
        args.push(lcs(args.shift(), args.shift()))
        return lcs(args)
      }

      //this would be improved by truncating input first
      //and not returning an lcs as an intermediate step.
      //untill that is a performance problem.

      var start = 0, end = 0
      for(var i = 0; i < a.length && i < b.length
        && equal(a[i], b[i])
        ; i ++
      )
        start = i + 1

      if(a.length === start)
        return a.slice()

      for(var i = 0;  i < a.length - start && i < b.length - start
        && equal(a[a.length - 1 - i], b[b.length - 1 - i])
        ; i ++
      )
        end = i

      function recurse (a, b) {
        if(!a.length || !b.length) return []
        //avoid exponential time by caching the results
        if(cache[key(a, b)]) return cache[key(a, b)]

        if(equal(a[0], b[0]))
          return [head(a)].concat(recurse(tail(a), tail(b)))
        else {
          var _a = recurse(tail(a), b)
          var _b = recurse(a, tail(b))
          return cache[key(a,b)] = _a.length > _b.length ? _a : _b
        }
      }

      var middleA = a.slice(start, a.length - end)
      var middleB = b.slice(start, b.length - end)

      return (
        a.slice(0, start).concat(
          recurse(middleA, middleB)
        ).concat(a.slice(a.length - end))
      )
    }

    // given n sequences, calc the lcs, and then chunk strings into stable and unstable sections.
    // unstable chunks are passed to build
    exports.chunk =
    function (q, build) {
      var q = q.map(function (e) { return e.slice() })
      var lcs = exports.lcs.apply(null, q)
      var all = [lcs].concat(q)

      function matchLcs (e) {
        if(e.length && !lcs.length || !e.length && lcs.length)
          return false //incase the last item is null
        return equal(last(e), last(lcs)) || ((e.length + lcs.length) === 0)
      }

      while(any(q, hasLength)) {
        //if each element is at the lcs then this chunk is stable.
        while(q.every(matchLcs) && q.every(hasLength))
          all.forEach(retreat)
        //collect the changes in each array upto the next match with the lcs
        var c = false
        var unstable = q.map(function (e) {
          var change = []
          while(!matchLcs(e)) {
            change.unshift(retreat(e))
            c = true
          }
          return change
        })
        if(c) build(q[0].length, unstable)
      }
    }

    //calculate a diff this is only updates
    exports.optimisticDiff =
    function (a, b) {
      var M = Math.max(a.length, b.length)
      var m = Math.min(a.length, b.length)
      var patch = []
      for(var i = 0; i < M; i++)
        if(a[i] !== b[i]) {
          var cur = [i], deletes = 0
          while(a[i] !== b[i] && i < m) {
            cur[1] = ++deletes
            cur.push(b[i++])
          }
          //the rest are deletes or inserts
          if(i >= m) {
            //the rest are deletes
            if(a.length > b.length)
              cur[1] += a.length - b.length
            //the rest are inserts
            else if(a.length < b.length)
              cur = cur.concat(b.slice(a.length))
          }
          patch.push(cur)
        }

      return patch
    }

    exports.diff =
    function (a, b) {
      var optimistic = exports.optimisticDiff(a, b)
      var changes = []
      exports.chunk([a, b], function (index, unstable) {
        var del = unstable.shift().length
        var insert = unstable.shift()
        changes.push([index, del].concat(insert))
      })
      return best(optimistic, changes)
    }

    exports.patch = function (a, changes, mutate) {
      if(mutate !== true) a = a.slice(a)//copy a
      changes.forEach(function (change) {
        [].splice.apply(a, change)
      })
      return a
    }

    // http://en.wikipedia.org/wiki/Concestor
    // me, concestor, you...
    exports.merge = function () {
      var args = getArgs(arguments)
      var patch = exports.diff3(args)
      return exports.patch(args[0], patch)
    }

    exports.diff3 = function () {
      var args = getArgs(arguments)
      var r = []
      exports.chunk(args, function (index, unstable) {
        var mine = unstable[0]
        var insert = resolve(unstable)
        if(equal(mine, insert)) return
        r.push([index, mine.length].concat(insert))
      })
      return r
    }
    exports.oddOneOut =
      function oddOneOut (changes) {
        changes = changes.slice()
        //put the concestor first
        changes.unshift(changes.splice(1,1)[0])
        var i = oddElement(changes, equal)
        if(i == 0) // concestor was different, 'false conflict'
          return changes[1]
        if (~i)
          return changes[i]
      }
    exports.insertMergeOverDelete =
      //i've implemented this as a seperate rule,
      //because I had second thoughts about this.
      function insertMergeOverDelete (changes) {
        changes = changes.slice()
        changes.splice(1,1)// remove concestor

        //if there is only one non empty change thats okay.
        //else full confilct
        for (var i = 0, nonempty; i < changes.length; i++)
          if(changes[i].length)
            if(!nonempty) nonempty = changes[i]
            else return // full conflict
        return nonempty
      }

    var rules = (deps && deps.rules) || [exports.oddOneOut, exports.insertMergeOverDelete]

    function resolve (changes) {
      var l = rules.length
      for (var i in rules) { // first

        var c = rules[i] && rules[i](changes)
        if(c) return c
      }
      changes.splice(1,1) // remove concestor
      //returning the conflicts as an object is a really bad idea,
      // because == will not detect they are the same. and conflicts build.
      // better to use
      // '<<<<<<<<<<<<<'
      // of course, i wrote this before i started on snob, so i didn't know that then.
      /*var conflict = ['>>>>>>>>>>>>>>>>']
      while(changes.length)
        conflict = conflict.concat(changes.shift()).concat('============')
      conflict.pop()
      conflict.push          ('<<<<<<<<<<<<<<<')
      changes.unshift       ('>>>>>>>>>>>>>>>')
      return conflict*/
      //nah, better is just to use an equal can handle objects
      return {'?': changes}
    }
    return exports
  }
  var ret = exports(null, exports);
  (typeof window != 'undefined' ? window : global).Adiff = ret;
  return ret;
})()
