// Generated by CoffeeScript 1.9.3
(function() {
  define(['cs!./org', 'cs!./docOrg.litcoffee', 'lib/lodash.min', 'cs!./editorSupport.litcoffee', 'cs!./diag.litcoffee'], function(Org, DocOrg, _, EditorSupport, Diag) {
    var OrgData, assert, assertEq, orgDoc, parseOrgMode, runTests, set1, structureInfo, test1;
    parseOrgMode = Org.parseOrgMode;
    orgDoc = DocOrg.orgDoc;
    OrgData = EditorSupport.OrgData;
    structureInfo = Diag.structureInfo;
    set1 = {
      text: "* Test properties\n#+BEGIN_SRC lisp :results dynamic\n(+ 3 4)\n#+END_SRC\n#+RESULTS:\n: 7\n** sub 1\nduh\n:properties:\n:a: 1\n:end:\n#+BEGIN_SRC js :results dynamic\n3 + 4\n#+END_SRC\n#+RESULTS:\n: 7\npeep\n:properties:\n:b: 2\n:end:\n** sub 2\nasdf",
      levels: {
        block0: 0,
        block1: 1,
        block2: 1,
        block3: 2,
        block4: 2,
        block5: 2,
        block6: 1,
        block7: 2
      }
    };
    assert = function(errStr, bool) {
      if (!bool) {
        throw new Error(errStr);
      }
    };
    assertEq = function(errStr, a, b) {
      return assert(errStr, _.isEqual(a, b));
    };
    runTests = function() {
      return test1();
    };
    test1 = function() {
      var blk, block, blocks, count, data, i, info, j, len;
      data = new OrgData();
      blocks = data.parseBlocks(set1.text);
      count = 0;
      for (i = j = 0, len = blocks.length; j < len; i = ++j) {
        block = blocks[i];
        block._id = 'block' + count++;
        if (i > 0) {
          block.prev = blocks[i - 1]._id;
          blocks[i - 1].next = block._id;
        }
      }
      blk = _.indexBy(blocks, '_id');
      data.linkAllSiblings({
        first: blocks[0]._id,
        sets: blk,
        oldBlocks: blk
      });
      data.load(blocks[0]._id, blk);
      info = structureInfo(data);
      return assertEq("Bad levels computed for set1", info.levels, set1.levels);
    };
    return {
      runTests: runTests
    };
  });

}).call(this);

//# sourceMappingURL=tests.js.map