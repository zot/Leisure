    define ['./org', './docOrg', 'lodash', './editorSupport', './diag', './testing'], (Org, DocOrg, _, EditorSupport, Diag, Testing)->
      {
        parseOrgMode
      } = Org
      {
        orgDoc
      } = DocOrg
      {
        OrgData
      } = EditorSupport
      {
        structureInfo
      } = Diag
      {
        assert
        assertEq
      } = Testing

      set1 =
        text: """
          * Test properties
          #+BEGIN_SRC lisp :results dynamic
          (+ 3 4)
          #+END_SRC
          #+RESULTS:
          : 7
          ** sub 1
          duh
          :properties:
          :a: 1
          :end:
          #+BEGIN_SRC js :results dynamic
          3 + 4
          #+END_SRC
          #+RESULTS:
          : 7
          peep
          :properties:
          :b: 2
          :end:
          ** sub 2
          asdf
          """
        levels:
          block0: 0
          block1: 1
          block2: 1
          block3: 2
          block4: 2
          block5: 2
          block6: 1
          block7: 2

      runTests = ->
        #test1()

      test1 = ->
        data = new OrgData()
        blocks = data.parseBlocks set1.text
        count = 0
        for block, i in blocks
          block._id = 'block' + count++
          if i > 0
            block.prev = blocks[i - 1]._id
            blocks[i - 1].next = block._id
        blk = _.keyBy blocks, '_id'
        data.linkAllSiblings first: blocks[0]._id, sets: blk, oldBlocks: blk
        data.load '', blocks[0]._id, blk
        info = structureInfo data
        assertEq "Bad levels computed for set1", info.levels, set1.levels

      {
        runTests
        assert
        assertEq
      }
