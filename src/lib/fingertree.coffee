# @fileoverview Implementation of Finger Tree, an immutable general-purpose
#   data structure which can further be used to implement random-access
#   sequences, priority-queues, ordered sequences, interval trees, etc.
#
#   Based on:
#   Ralf Hinze and Ross Paterson,
#   "Finger trees: a simple general-purpose data structure",
#   <http://www.soi.city.ac.uk/~ross/papers/FingerTree.html>
# @author Xueqiao Xu <xueqiaoxu@gmail.com>
#
# Converted to CoffeeScript by Bill Burdick, 2015
# I converted this for people like me who prefer to read the code, rather
# than generated docs.  With this in mind, I've condensed the code to make
# it easier to see more code at a time and removed doc generation-only
# information (like @inheritDoc comments).  Also, in the name of readability
# and brevity, I have removed many micro-optimizations (like caching this.*
# in a variable) because I think most VMs will handle these anyway.  Other
# than that, I've tried to preserve the original author's intent.
#
# MIT License
#
# © 2014 Xueqiao Xu <xueqiaoxu@gmail.com>
#
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation
# files (the "Software"), to deal in the Software without
# restriction, including without limitation the rights to use, copy,
# modify, merge, publish, distribute, sublicense, and/or sell copies
# of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
# BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

((root, factory)->
  if typeof define == 'function' && define.amd then define [], factory
  else if typeof exports == 'object' then module.exports = factory()
  else root.FingerTree = factory())(this, ->
    'use strict'

    # Polyfill for Object.create.
    create = Object.create || (o)->
      F = ->
      F.prototype = o
      new F()

    # Placeholder for methods of interfaces / abstract base classes.
    notImplemented = -> throw new Error 'Not Implemented'

    # A split is a container which has 3 parts, in which the left part is the
    # elements that do not satisfy the predicate, the middle part is the
    # first element that satisfies the predicate and the last part is the rest
    # elements.
    class Split
      # @param {Array|FingerTree} left
      # @param {*} mid
      # @param {Array|FingerTree} right
      constructor: (@left, @mid, @right)->

    # A digit is a measured container of one to four elements.
    # @constructor
    # @param {Object.<string, function>} measurer
    # @param {Array.<*>} items
    class Digit
      constructor: (@measurer, @items)->
        @length = @items.length
        m = @measurer.identity()
        for item in @items
          m = @measurer.sum m, @measurer.measure item, this
        # @private
        @measure_ = m;

      # Get the measure of the digit.
      measure: -> @measure_

      # Get the first element stored in the digit.
      peekFirst: -> @items[0]

      # Get the last element stored in the digit.
      peekLast: -> @items[this.items.length - 1]

      # Return a new digit with the first item removed.
      # @return {Digit}
      removeFirst: -> @slice(1)

      # Return a new digit with the first item removed.
      # @return {Digit}
      removeLast: -> @slice(0, this.length - 1)

      # Return a new digit with the items sliced.
      # @param {Number} start
      # @param {Number} end
      # @return {Digit}
      slice: (start, end)->
        if !end? then end = @length
        new Digit @measurer, @items.slice start, end

      # Split the digit into 3 parts, in which the left part is the elements
      # that does not satisfy the predicate, the middle part is the first
      # element that satisfies the predicate and the last part is the rest
      # elements.
      # @param {Function} predicate A function which returns either true or false
      #   given each stored element.
      # @param {*} initial The initial measure for the predicate
      # @return {Split}
      split: (predicate, initial)->
        measure = initial
        i = null

        if @items.length == 1 then new Split [], @items[0], []
        else
          for item, i in @items
            measure = @measurer.sum measure, @measurer.measure(item)
            if predicate measure then break
          new Split @items.slice(0, i), item, @items.slice(i + 1)

      # Return the JSON representation of the digit.
      toJSON: ->
        type: 'digit'
        items: @items
        measure: @measure()

    # A node is a measured container of either 2 or 3 sub-finger-trees.
    class Node
      # @param {Object.<string, function>} measurer
      # @param {Array.<FingerTree>} items
      constructor: (@measurer, @items)->
        m = @measurer.identity()
        for item in @items
          m = @measurer.sum m, @measurer.measure item
        # @private
        @measure_ = m

      # Get the measure of the node.
      measure: -> @measure_

      # Convert the node to a digit.
      # @return {Digit}
      toDigit: -> new Digit @measurer, @items

      # Return the JSON representation of the node.
      toJSON: ->
        type: 'node'
        items: @items
        measure: @measure()

    # Interface of finger-tree.
    # @interface
    class FingerTree
      # Get the measure of the tree.
      @measure: notImplemented

      # Force on a normal FingerTree just returns this
      force: -> this

      # Check whether the tree is empty.
      # @return {boolean} True if the tree is empty.
      isEmpty: notImplemented

      # Return a new tree with an element added to the front.
      # @param {*} v The element to add.
      # @return {FingerTree}
      addFirst: notImplemented

      # Return a new tree with an element added to the end.
      # @param {*} v The element to add.
      # @return {FingerTree} A new finger-tree with the element added.
      addLast: notImplemented

      # Return a new tree with the first element removed.
      # @return {FingerTree}
      removeFirst: notImplemented

      # Return a new tree with the last element removed.
      # @return {FingerTree}
      removeLast: notImplemented

      # Get the first element of the tree.
      # @return {*}
      peekFirst: notImplemented

      # Get the last element of the tree.
      # @return {*}
      peekLast: notImplemented

      # Concatenate this tree with another tree.
      # @param {FingerTree} other
      # @return {FingerTree} The concatenated tree.
      concat: notImplemented

      # Split the tree into two halves, where the first half is a finger-tree
      # which contains all the elements that satisfy the given predicate,
      # while the ones from the other half do not.
      # @param {function(*): boolean} predicate
      # @return {Array.<FingerTree>} An array with the first element being a
      #   finger-tree that contains all the satisfying elements and the second
      #   element being a finger-tree that contains all the other elements.
      split: notImplemented

      # Take elements from the tree until the predicate returns true.
      # @param {function(*): boolean} predicate
      # @return {FingerTree}
      takeUntil: (predicate)-> @split(predicate)[0]

      # Drop elements from the tree until the predicate returns true.
      # @param {function(*): boolean} predicate
      # @return {FingerTree}
      dropUntil: (predicate)-> @split(predicate)[1]

      # @return the JSON representation of the tree.
      toJSON: notImplemented

      # iterate over the nodes
      each: (func)->
        t = this
        while !t.isEmpty()
          func t.peekFirst()
          t = t.removeFirst()

      # iterate over the nodes
      eachReverse: (func)->
        t = this
        while !t.isEmpty()
          func t.peekLast()
          t = t.removeLast()

      toArray: ->
        a = []
        @each (n)-> a.push n
        a

    # An empty finger-tree.
    class Empty extends FingerTree
      constructor: (@measurer)-> @measure_ = @measurer.identity()
      measure: -> @measure_
      addFirst: (v)-> new Single @measurer, v
      addLast: (v)-> new Single @measurer, v
      peekFirst: -> null
      peekLast: -> null
      isEmpty: -> true
      concat: (other)-> other
      split: (predicate)-> [this, this]
      toJSON: ->
        type: 'empty'
        measure: @measure()

    # A finger-tree which contains exactly one element.
    class Single extends FingerTree
      # @param {Object.<string, function>} measurer
      # @param {*} value
      constructor: (@measurer, @value)-> @measure_ = @measurer.measure(@value)

      measure: -> @measure_

      addFirst: (v)->
        new Deep @measurer,
          new Digit(@measurer, [v]),
          new Empty(makeNodeMeasurer @measurer),
          new Digit(@measurer, [@value])

      addLast: (v)->
        new Deep @measurer,
          new Digit(@measurer, [@value]),
          new Empty(makeNodeMeasurer @measurer),
          new Digit(@measurer, [v])

      removeFirst:-> new Empty @measurer

      removeLast: -> new Empty @measurer

      peekFirst: -> @value

      peekLast: -> @value

      isEmpty: -> false

      concat: (other)-> other.addFirst @value

      # Helper function to split the tree into 3 parts.
      # @private
      # @param {function(*): boolean} predicate
      # @param {*} initial The initial measurement for reducing
      # @return {Split}
      splitTree: (predicate, initial)->
        new Split new Empty(@measurer),
          @value,
          new Empty(@measurer)

      split: (predicate)->
        if predicate @measure() then [new Empty(@measurer), this]
        else [this, new Empty @measurer]

      toJSON: ->
        type: 'single'
        value: @value
        measure: @measure()

    # A finger-tree which contains two or more elements.
    class Deep extends FingerTree
      # @param {Object.<string, function>} measurer
      # @param {Digit} left
      # @param {FingerTree} mid
      # @param {Digit} right
      constructor: (@measurer, @left, @mid, @right)->
        # @private
        @measure_ = null

      measure: ->
        if @measure_ == null
          @measure_ = @measurer.sum(
            @measurer.sum(@left.measure(), @mid.measure()),
            @right.measure())
        @measure_

      addFirst: (v)->
        leftItems = @left.items
        if @left.length == 4 then new Deep @measurer,
          new Digit(@measurer, [v, leftItems[0]]),
          @mid.addFirst(new Node(@measurer,
            [leftItems[1],
             leftItems[2],
             leftItems[3]])),
          @right
        else new Deep @measurer,
          new Digit(@measurer, [v].concat(leftItems)),
          @mid,
          @right

      addLast: (v)->
        rightItems = @right.items
        if @right.length == 4 then new Deep @measurer,
          @left,
          @mid.addLast(new Node(@measurer,
            [rightItems[0],
             rightItems[1],
             rightItems[2]])),
          new Digit(@measurer, [rightItems[3], v])
        else new Deep @measurer,
          @left,
          @mid,
          new Digit(@measurer, rightItems.concat([v]))

      removeFirst: ->
        if @left.length > 1
          new Deep @measurer, @left.removeFirst(), @mid, @right
        else if !@mid.isEmpty()
          newMid = new DelayedFingerTree => @mid.removeFirst()
          new Deep @measurer, @mid.peekFirst().toDigit(), newMid, @right
        else if @right.length == 1 then new Single @measurer, @right.items[0]
        else new Deep @measurer, @right.slice(0, 1), @mid, @right.slice(1)

      removeLast: ->
        if @right.length > 1
          new Deep @measurer, @left, @mid, @right.removeLast()
        else if !@mid.isEmpty()
          newMid = new DelayedFingerTree => @mid.removeLast()
          new Deep @measurer, @left, newMid, @mid.peekLast().toDigit()
        else if @left.length == 1 then new Single @measurer, @left.items[0]
        else new Deep @measurer, @left.slice(0, -1), @mid, @left.slice(-1)

      peekFirst: -> @left.peekFirst()

      peekLast: -> @right.peekLast()

      isEmpty: -> false

      concat: (other)->
        other = other.force()
        if other instanceof Empty then this
        else if other instanceof Single then @addLast(other.value)
        else app3 this, [], other

      # Helper function to split the tree into 3 parts.
      # @private
      # @param {function(*): boolean} predicate
      # @param {*} initial The initial measurement for reducing
      # @return {Split}
      splitTree: (predicate, initial)->
        # see if the split point is inside the left tree
        leftMeasure = @measurer.sum initial, @left.measure()
        if predicate leftMeasure
          split = @left.split predicate, initial
          new Split fromArray(split.left, @measurer),
            split.mid,
            deepLeft(@measurer, split.right, @mid, @right)
        else
          # see if the split point is inside the mid tree
          midMeasure = @measurer.sum leftMeasure, @mid.measure()
          if predicate midMeasure
            midSplit = @mid.splitTree predicate, leftMeasure
            split = midSplit.mid.toDigit().split predicate, @measurer.sum(leftMeasure, midSplit.left.measure())
            new Split deepRight(@measurer, @left, midSplit.left, split.left),
              split.mid,
              deepLeft(@measurer, split.right, midSplit.right, @right)
          else
            # the split point is in the right tree
            split = @right.split predicate, midMeasure
            new Split deepRight(@measurer, @left, @mid, split.left),
              split.mid,
              fromArray(split.right, @measurer)

      split: (predicate)->
        if predicate @measure()
          split = @splitTree predicate, @measurer.identity()
          [split.left, split.right.addFirst split.mid]
        else [this, new Empty @measurer]

      toJSON: ->
        type: 'deep',
        left: @left
        mid: @mid
        right: @right
        measure: @measure()

    # A lazy-evaluted finger-tree.
    class DelayedFingerTree
      # @param {function(): FingerTree} thunk A function, which when called, will
      constructor: (@thunk)-> @tree = null
      # Evaluate the thunk and return the finger-tree.
      # @return {FingerTree}
      force: ->
        if @tree == null then @tree = this.thunk()
        @tree
      isEmpty: (v)-> @force().isEmpty()
      measure: -> @force().measure()
      peekFirst: -> @force().peekFirst()
      peekLast: -> @force().peekLast()
      addFirst: (v)-> @force().addFirst(v)
      addLast: (v)-> @force().addLast(v)
      removeFirst: -> @force().removeFirst()
      removeLast: -> @force().removeLast()
      concat: (other)-> @force().concat other
      splitTree: (predicate, initial)-> @force().splitTree(predicate, initial)
      split: (predicate)-> @force().split(predicate)
      takeUntil: (predicate)-> @force().takeUntil other
      dropUntil: (predicate)-> @force().dropUntil other
      toJSON: -> @force().toJSON()
      toArray: -> @force().toArray()

    # @param {Array} left
    # @param {FingerTree} mid
    # @param {Digit} right
    deepLeft = (measurer, left, mid, right)->
      if !left.length
        if mid.isEmpty() then fromArray right.items, measurer
        else new DelayedFingerTree -> new Deep measurer,
           mid.peekFirst().toDigit(),
           mid.removeFirst(),
           right
      else new Deep measurer, new Digit(measurer, left), mid, right

    # @param {Digit} left
    # @param {FingerTree} mid
    # @param {Array} right
    deepRight = (measurer, left, mid, right)->
      if !right.length
        if mid.isEmpty() then fromArray left.items, measurer
        else new DelayedFingerTree -> new Deep measurer,
           left,
           mid.removeLast(),
           mid.peekLast().toDigit()
      else new Deep measurer, left, mid, new Digit measurer, right

    # Helper function to concatenate two finger-trees with additional elements
    # in between.
    # @param {FingerTree} t1 Left finger-tree
    # @param {Array} ts An array of elements in between the two finger-trees
    # @param {FingerTree} t2 Right finger-tree
    # @return {FingerTree}
    app3 = (t1, ts, t2)->
      t1 = t1.force()
      t2 = t2.force()
      if t1 instanceof Empty then prepend t2, ts
      else if t2 instanceof Empty then append t1, ts
      else if t1 instanceof Single then prepend(t2, ts).addFirst t1.value
      else if t2 instanceof Single then append(t1, ts).addLast t2.value
      else new Deep t1.measurer,
        t1.left,
        new DelayedFingerTree(-> app3 t1.mid,
          nodes(t1.measurer,
            t1.right.items
              .concat(ts)
              .concat(t2.left.items)),
          t2.mid),
        t2.right

    # Helper function to group an array of elements into an array of nodes.
    # @param {Object.<string, function>} m Measurer
    # @param {Array} xs
    # @return {Array}
    nodes = (m, xs, res)->
      res = res ? []
      switch xs.length
        when 2 then res.push new Node(m, xs)
        when 3 then res.push new Node(m, xs)
        when 4 then res.push new Node(m, [xs[0], xs[1]]), new Node(m, [xs[2], xs[3]])
        else
          res.push new Node m, [xs[0], xs[1], xs[2]]
          nodes m, xs.slice(3), res
      res

    # Construct a derived measurer which will return the memoized
    # measurement of a node instead of evaluting the node.
    # @param {Object.<string, function>} measurer
    # @return {Object.<string, function>}
    makeNodeMeasurer = (measurer)->
      identity: measurer.identity
      measure: (n)-> n.measure()
      sum: measurer.sum

    # Prepend an array of elements to the left of a tree.
    # Returns a new tree with the original one unmodified.
    # @param {FingerTree} tree
    # @param {Array} xs
    # @return {FingerTree}
    prepend = (tree, xs)->
      for i in [xs.length - 1 .. 0] by -1
        tree = tree.addFirst(xs[i])
      tree

    # Append an array of elements to the right of a tree.
    # Returns a new tree with the original one unmodified.
    # @param {FingerTree} tree
    # @param {Array} xs
    # @return {FingerTree}
    append = (tree, xs)->
      for x in xs
        tree = tree.addLast x
      tree

    # Construct a fingertree from an array.
    # @param {Array} xs An array of elements.
    # @param {Object.<string, function>} measurer
    # @return {FingerTree}
    fromArray = (xs, measurer)->
      measurer = measurer ||
        identity: -> 0
        measure: (v)-> 1
        sum: (a, b)-> a + b
      prepend new Empty(measurer), xs

    FingerTree.fromArray = fromArray

    FingerTree
)
