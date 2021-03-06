// Generated by CoffeeScript 2.4.1
(function() {
  // Simple operational transformation engine
  'use strict';
  define(['fingertree', 'lodash', './testing', 'immutable'], function(Fingertree, _, Testing, Immutable) {
    var Replacements, Set, assert, assertEq, diag, eachReplacement, mergeRepl, replacements;
    ({assert, assertEq} = Testing);
    ({Set} = Immutable);
    //diag = (args...)-> console.log args...
    diag = function(...args) {};
    // Replacements captures successive replacements within a version
    Replacements = class Replacements {
      constructor(reps) {
        this.replacements = reps != null ? reps : Fingertree.fromArray([], {
          identity: function() {
            return {
              initial: 0,
              final: 0,
              float: 0
            };
          },
          measure: function(n) {
            return {
              initial: n.offset + n.length,
              final: n.offset + n.text.length,
              float: n.text.length - n.length
            };
          },
          sum: function(a, b) {
            return {
              initial: a.initial + b.initial,
              final: a.final + b.final,
              float: a.float + b.float
            };
          }
        });
      }

      snapshot() {
        return new Replacements(this.replacements);
      }

      isEmpty() {
        return this.replacements.isEmpty();
      }

      initialBounds() {
        if (this.isEmpty()) {
          return {
            start: 0,
            end: 0
          };
        } else {
          return {
            start: this.replacements.peekFirst().offset,
            end: this.replacements.measure().initial
          };
        }
      }

      finalBounds() {
        if (this.isEmpty()) {
          return {
            start: 0,
            end: 0
          };
        } else {
          return {
            start: this.replacements.peekFirst().offset,
            end: this.replacements.measure().final
          };
        }
      }

      measure() {
        return this.replacements.measure();
      }

      floatFor(offset) {
        return this.replacements.split(function(m) {
          return m.initial > offset;
        })[0].measure().float;
      }

      addFloat(start, float) {
        var first, l, n, rest;
        [first, rest] = this.replacements.split(function(m) {
          return m.final >= start;
        });
        l = first.measure().final;
        if (!rest.isEmpty()) {
          n = rest.peekFirst();
          rest = rest.removeFirst().addFirst(_.defaults({
            offset: n.offset + float
          }, n));
          return this.replacements = first.concat(rest);
        }
      }

      replace(repl) {
        var end, first, l, next, node, old, ref, rest, start, text;
        ({start, end, text} = repl);
        [first, rest] = this.replacements.split(function(m) {
          return m.final >= start;
        });
        l = first.measure().final;
        if (!rest.isEmpty() && l + (old = rest.peekFirst()).offset <= end) {
          node = mergeRepl(l, old, repl);
          rest = rest.removeFirst();
        } else {
          node = {
            offset: repl.start - l,
            length: repl.end - repl.start,
            text: text,
            labels: (ref = repl.labels) != null ? ref : []
          };
          if (!rest.isEmpty()) {
            next = rest.peekFirst();
            rest = rest.removeFirst().addFirst(_.defaults({
              offset: next.offset + l - repl.end
            }, next));
          }
        }
        this.replacements = first.concat(rest.addFirst(node));
        return old != null ? old.repl : void 0;
      }

      dump() {
        return console.log(this.toString());
      }

      toString() {
        var strs;
        strs = [];
        this.eachOperation(function(start, end, text) {
          return strs.push(`${start}, ${end}, ${JSON.stringify(text)}`);
        });
        return strs.join('\n');
      }

      toConcurrent(conc) {
        conc = conc != null ? conc : new ConcurrentReplacements();
        this.eachOperation(function(start, end, text, cookies) {
          return conc.replace({start, end, text, cookies});
        });
        return conc;
      }

      eachOperation(func) {
        var n, start, t;
        t = this.replacements;
        while (!t.isEmpty()) {
          n = t.peekLast();
          t = t.removeLast();
          start = t.measure().initial + n.offset;
          func(start, start + n.length, n.text, n.labels, n);
        }
        return null;
      }

      merge(replacements) {
        return replacements.eachOperation((start, end, text, labels) => {
          return this.replace({start, end, text, labels});
        });
      }

      toArray() {
        var j, label, len, n, ref, results, start, t;
        results = [];
        t = this.replacements;
        while (!t.isEmpty()) {
          n = t.peekFirst();
          t = t.removeFirst();
          start = t.measure().initial + n.offset;
          results.push(start, start + n.length, n.text);
          ref = n.labels;
          for (j = 0, len = ref.length; j < len; j++) {
            label = ref[j];
            results.push(label);
          }
        }
        return results;
      }

      getRepls() {
        var repls;
        repls = [];
        this.eachOperation(function(start, end, text) {
          return repls.push({start, end, text});
        });
        return repls;
      }

    };
    eachReplacement = function(reps, func) {
      var end, i, labels, results1, start, text;
      i = 0;
      results1 = [];
      while (i < reps.length) {
        start = reps[i++];
        end = reps[i++];
        text = reps[i++];
        labels = [];
        while (typeof reps[i] === 'object') {
          labels.push(reps[i++]);
        }
        results1.push(func(start, end, text, labels));
      }
      return results1;
    };
    Replacements.fromArray = function(reps) {
      var j, len, repl, seq;
      seq = new Replacements();
      if (typeof reps[0] === 'number') {
        eachReplacement(reps, function(start, end, text, labels) {
          return seq.replace({start, end, text, labels});
        });
      } else {
        for (j = 0, len = reps.length; j < len; j++) {
          repl = reps[j];
          seq.replace(repl);
        }
      }
      return seq;
    };
    // Merge overlapping repl with node
    mergeRepl = function(offset, node, repl) {
      var end, j, label, labels, len, newStart, rEnd, rStart, ref, start;
      start = offset + node.offset;
      end = start + node.length;
      rStart = Math.max(0, repl.start - start);
      rEnd = repl.end - start;
      newStart = Math.min(start, repl.start);
      labels = (function() {
        var j, len, ref, results1;
        if (rStart === node.text.length) {
          return node.labels.slice(0);
        } else {
          ref = node.labels;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            label = ref[j];
            results1.push({
              name: label.name,
              offset: rStart >= label.offset ? label.offset : label.offset + repl.text.length - repl.start + repl.end
            });
          }
          return results1;
        }
      })();
      if (repl.labels != null) {
        ref = repl.labels;
        for (j = 0, len = ref.length; j < len; j++) {
          label = ref[j];
          labels.push({
            name: label.name,
            offset: label.offset + rStart
          });
        }
      }
      return {
        offset: newStart - offset,
        length: end + Math.max(0, repl.end - start - node.text.length) - Math.min(repl.start, start),
        text: node.text.substring(0, rStart) + repl.text + node.text.substring(rEnd),
        labels: labels
      };
    };
    replacements = function(reps) {
      var j, len, repl, s;
      s = new Replacements();
      for (j = 0, len = reps.length; j < len; j++) {
        repl = reps[j];
        s.replace(repl);
      }
      return s;
    };
    return Object.assign(Leisure, {
      Replacements: {Replacements, replacements}
    }).Replacements;
  });

}).call(this);

//# sourceMappingURL=replacements.js.map
