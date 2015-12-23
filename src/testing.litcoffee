Simple testing support

    define [], ->
      strFunc = (str)->
        if typeof str == 'function' then str
        else -> str
      assert = (errStr, bool)-> if !bool then throw new Error strFunc(errStr)()
      assertEq = (errStr, a, b)-> assert (-> strFunc(errStr)(a, b)), _.isEqual a, b

      {
        assert
        assertEq
      }

