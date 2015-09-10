// Generated by CoffeeScript 1.9.3
(function() {
  define(['./lib/fingertree', './lib/lodash.min', './testing'], function(Fingertree, _, Testing) {
    var ConcurrentReplacements, SequentialReplacements, addOperation, addOperations, assert, assertEq, computeNodeEffect, concurrentReplacements, isReplace, mergeRepl, newNode, replacementsString, runReplacements, sequentialReplacements, sortReplacements, tests;
    assert = Testing.assert, assertEq = Testing.assertEq;
    ConcurrentReplacements = (function() {
      function ConcurrentReplacements(replacements1) {
        this.replacements = replacements1;
        if (!this.replacements) {
          this.replacements = Fingertree.fromArray([], {
            identity: function() {
              return {
                maxOffset: -1,
                float: 0
              };
            },
            measure: function(v) {
              return {
                maxOffset: v.start,
                float: v.float
              };
            },
            sum: function(a, b) {
              return {
                maxOffset: Math.max(a.maxOffset, b.maxOffset),
                float: a.float + b.float
              };
            }
          });
        }
      }

      ConcurrentReplacements.prototype.isEmpty = function() {
        return this.replacements.isEmpty();
      };

      ConcurrentReplacements.prototype.toString = function() {
        var ops;
        ops = [];
        this.eachOperation(function(start, end, text) {
          return ops.push("(" + start + ", " + end + ", " + (JSON.stringify(text)) + ")");
        });
        return ops.join(' ');
      };

      ConcurrentReplacements.prototype.snapshot = function() {
        return new ConcurrentReplacements(this.replacements);
      };

      ConcurrentReplacements.prototype.floatFor = function(repl) {
        var first, float, i, len, m, n, op, ref, ref1, rest;
        ref = this.replacements.split(function(m) {
          return m.maxOffset >= repl.start;
        }), first = ref[0], rest = ref[1];
        m = first.measure();
        if (!rest.isEmpty() && (n = rest.peekFirst()).start === repl.start) {
          float = m.float;
          ref1 = n.operations;
          for (i = 0, len = ref1.length; i < len; i++) {
            op = ref1[i];
            if (op.start <= repl.start && !isReplace(op)) {
              float += op.text.length - op.end + op.start;
            }
          }
          return float;
        } else {
          return m.float;
        }
      };

      ConcurrentReplacements.prototype.replace = function(repl) {
        var first, next, node, prev, ref, rest, target;
        ref = this.replacements.split(function(m) {
          return m.maxOffset >= repl.start;
        }), first = ref[0], rest = ref[1];
        if (!first.isEmpty() && (prev = first.peekLast()).end > repl.start - 2) {
          first = first.removeLast();
          node = addOperation(prev, repl);
        } else {
          node = !rest.isEmpty() && (target = rest.peekFirst()).start === repl.start ? (rest = rest.removeFirst(), addOperation(target, repl)) : newNode(repl);
        }
        while (!rest.isEmpty() && node.end > (next = rest.peekFirst()).start - 2) {
          rest = rest.removeFirst();
          node = addOperations(node, next.operations);
        }
        return this.replacements = first.concat(rest.addFirst(node));
      };

      ConcurrentReplacements.prototype.eachOperation = function(func) {
        var float, i, len, node, offset, ref, ref1, repl, results, t, tmpOff;
        offset = 0;
        t = this.replacements;
        results = [];
        while (!t.isEmpty()) {
          tmpOff = offset;
          node = t.peekFirst();
          float = 0;
          ref = node.activeOperations;
          for (i = 0, len = ref.length; i < len; i++) {
            repl = ref[i];
            func(repl.start + tmpOff, repl.end + tmpOff, repl.text, (ref1 = repl.cookies) != null ? ref1 : [repl], node);
            tmpOff += repl.text.length;
            float += repl.text.length - repl.end + repl.start;
          }
          offset += float;
          results.push(t = t.removeFirst());
        }
        return results;
      };

      return ConcurrentReplacements;

    })();
    isReplace = function(repl) {
      return repl.end > repl.start && repl.text.length;
    };
    computeNodeEffect = function(node) {
      var del, end, float, i, insertionText, j, len, len1, op, operation, operations, ref, repl;
      insertionText = '';
      repl = null;
      del = null;
      operations = [];
      float = 0;
      end = node.start;
      ref = node.operations;
      for (i = 0, len = ref.length; i < len; i++) {
        op = ref[i];
        if (op.end === op.start) {
          operations.push(op);
          float += op.text.length;
        } else if (!op.text.length) {
          del = op;
        } else {
          repl = op;
        }
      }
      if (del) {
        operations.unshift(del);
      } else if (repl) {
        operations.push(repl);
      }
      if (operation = del || repl) {
        float += operation.text.length - operation.end + operation.start;
      }
      for (j = 0, len1 = operations.length; j < len1; j++) {
        op = operations[j];
        end = Math.max(end, op.end);
      }
      node.float = float;
      node.end = end;
      node.activeOperations = operations;
      return node;
    };
    addOperation = function(node, record) {
      return addOperations(node, [record]);
    };
    addOperations = function(node, records) {
      return computeNodeEffect({
        start: node.start,
        operations: node.operations.concat(records)
      });
    };
    newNode = function(repl) {
      return computeNodeEffect({
        start: repl.start,
        operations: [repl]
      });
    };
    SequentialReplacements = (function() {
      function SequentialReplacements(reps) {
        this.replacements = reps != null ? reps : Fingertree.fromArray([], {
          identity: function() {
            return {
              initial: 0,
              final: 0
            };
          },
          measure: function(n) {
            return {
              initial: n.leading + n.length,
              final: n.leading + n.text.length
            };
          },
          sum: function(a, b) {
            return {
              initial: a.initial + b.initial,
              final: a.final + b.final
            };
          }
        });
      }

      SequentialReplacements.prototype.snapshot = function() {
        return new SequentialReplacements(this.replacements);
      };

      SequentialReplacements.prototype.isEmpty = function() {
        return this.replacements.isEmpty();
      };

      SequentialReplacements.prototype.initialBounds = function() {
        if (this.isEmpty()) {
          return {
            start: 0,
            end: 0
          };
        } else {
          return {
            start: this.replacements.peekFirst().leading,
            end: this.replacements.measure().initial
          };
        }
      };

      SequentialReplacements.prototype.finalBounds = function() {
        if (this.isEmpty()) {
          return {
            start: 0,
            end: 0
          };
        } else {
          return {
            start: this.replacements.peekFirst().leading,
            end: this.replacements.measure().final
          };
        }
      };

      SequentialReplacements.prototype.replace = function(repl) {
        var end, first, l, next, node, old, ref, ref1, rest, start, text;
        start = repl.start, end = repl.end, text = repl.text;
        ref = this.replacements.split(function(m) {
          return m.final >= start;
        }), first = ref[0], rest = ref[1];
        l = first.measure().final;
        if (!rest.isEmpty() && l + (old = rest.peekFirst()).leading <= end) {
          node = mergeRepl(l, old, repl);
          rest = rest.removeFirst();
        } else {
          node = {
            leading: repl.start - l,
            length: repl.end - repl.start,
            text: text,
            cookies: (ref1 = repl.cookies) != null ? ref1 : [repl]
          };
          if (!rest.isEmpty()) {
            next = rest.peekFirst();
            rest = rest.removeFirst().addFirst(_.merge({}, next, {
              leading: next.leading - repl.end
            }));
          }
        }
        this.replacements = first.concat(rest.addFirst(node));
        return old != null ? old.repl : void 0;
      };

      SequentialReplacements.prototype.dump = function() {
        return console.log(this.toString());
      };

      SequentialReplacements.prototype.toString = function() {
        var strs;
        strs = [];
        this.eachOperation(function(start, end, text) {
          return strs.push(start + ", " + end + ", " + (JSON.stringify(text)));
        });
        return strs.join('\n');
      };

      SequentialReplacements.prototype.eachOperation = function(func) {
        var n, offset, start, t;
        t = this.replacements;
        offset = 0;
        while (!t.isEmpty()) {
          n = t.peekFirst();
          start = offset + n.leading;
          func(start, start + n.length, n.text, n.cookies, n);
          offset += n.leading + n.text.length;
          t = t.removeFirst();
        }
        return null;
      };

      SequentialReplacements.prototype.merge = function(replacements) {
        var newReps;
        newReps = this.snapshot();
        replacements.eachOperation(function(start, end, text, cookies, node) {
          return newReps.replace({
            start: start,
            end: end,
            text: text,
            cookies: cookies
          });
        });
        return newReps;
      };

      return SequentialReplacements;

    })();
    mergeRepl = function(offset, node, repl) {
      var end, newStart, rEnd, rStart, ref, start;
      start = offset + node.leading;
      end = start + node.length;
      rStart = Math.max(0, repl.start - start);
      rEnd = repl.end - start;
      newStart = Math.min(start, repl.start);
      return {
        leading: newStart - offset,
        length: end + Math.max(0, repl.end - start - node.text.length) - Math.min(repl.start, start),
        text: node.text.substring(0, rStart) + repl.text + node.text.substring(rEnd),
        cookies: node.cookies.concat((ref = repl.cookies) != null ? ref : [repl])
      };
    };
    runReplacements = function(reps, func) {
      var connectionOps, curId, curVersion, i, len, prepConnection, prepVersion, repl, versionOps;
      reps = reps.slice();
      curVersion = -1;
      curId = null;
      reps = sortReplacements(reps);
      connectionOps = new SequentialReplacements();
      versionOps = new ConcurrentReplacements();
      prepConnection = function(id) {
        connectionOps.eachOperation(function(start, end, text, cookies, node) {
          return versionOps.replace({
            start: start,
            end: end,
            text: text,
            cookies: cookies
          });
        });
        connectionOps = new SequentialReplacements();
        return curId = id;
      };
      prepVersion = function(v) {
        versionOps.eachOperation(func);
        versionOps = new ConcurrentReplacements();
        return curVersion = v;
      };
      for (i = 0, len = reps.length; i < len; i++) {
        repl = reps[i];
        if (repl.version !== curVersion || repl.connectionId !== curId) {
          prepConnection(repl.connectionId);
        }
        if (repl.version !== curVersion) {
          prepVersion(repl.version);
        }
        connectionOps.replace(repl);
      }
      if (!connectionOps.isEmpty()) {
        prepConnection();
      }
      if (!versionOps.isEmpty()) {
        return prepVersion();
      }
    };
    sequentialReplacements = function(reps) {
      var i, len, repl, s;
      s = new SequentialReplacements();
      for (i = 0, len = reps.length; i < len; i++) {
        repl = reps[i];
        s.replace(repl);
      }
      return s;
    };
    concurrentReplacements = function(reps) {
      var s;
      s = new SequentialReplacements();
      runReplacements(reps, function(start, end, text, repls) {
        return s.replace({
          start: start,
          end: end,
          text: text
        }, repls);
      });
      return s;
    };
    sortReplacements = function(reps) {
      return _.sortByAll(reps, ['version', 'connectionId']);
    };
    replacementsString = function(reps) {
      var strs;
      strs = [];
      runReplacements(reps, function(start, end, text) {
        return strs.push(start + ", " + end + ", " + (JSON.stringify(text)));
      });
      return strs.join('\n');
    };
    tests = function() {
      var r;
      r = new SequentialReplacements();
      r.replace({
        start: 100,
        end: 109,
        text: 'duh'
      });
      r.replace({
        start: 101,
        end: 102,
        text: 'HELLO'
      });
      assertEq((function(a, b) {
        return "Bad replacement, expected <" + b + "> but got <" + a + ">";
      }), r.toString(), "100, 109, \"dHELLOh\"");
      r.replace({
        start: 100,
        end: 109,
        text: 'poop'
      });
      assertEq((function(a, b) {
        return "Bad replacement, expected <" + b + "> but got <" + a + ">";
      }), r.toString(), "100, 111, \"poop\"");
      r.replace({
        start: 95,
        end: 100,
        text: ''
      });
      assertEq((function(a, b) {
        return "Bad replacement, expected <" + b + "> but got <" + a + ">";
      }), r.toString(), "95, 111, \"poop\"");
      r.replace({
        start: 30,
        end: 35,
        text: 'smeg'
      });
      assertEq((function(a, b) {
        return "Bad replacement, expected <" + b + "> but got <" + a + ">";
      }), r.toString(), "30, 35, \"smeg\"\n94, 110, \"poop\"");
      r.replace({
        start: 25,
        end: 33,
        text: 'blorfl'
      });
      assertEq((function(a, b) {
        return "Bad replacement, expected <" + b + "> but got <" + a + ">";
      }), r.toString(), "25, 35, \"blorflg\"\n92, 108, \"poop\"");
      return r;
    };
    return {
      ConcurrentReplacements: ConcurrentReplacements,
      SequentialReplacements: SequentialReplacements,
      runReplacements: runReplacements,
      replacementsString: replacementsString,
      sortReplacements: sortReplacements,
      sequentialReplacements: sequentialReplacements,
      concurrentReplacements: concurrentReplacements,
      tests: tests
    };
  });

}).call(this);

//# sourceMappingURL=ot.js.map
