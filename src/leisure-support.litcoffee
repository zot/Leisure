Support code for Leisure

    'use strict'
    define ['./base', './ast', './runtime', './gen', './eval', './org', './transaction'], (Base, Ast, Runtime, Gen, Eval, Org, Transaction)->
      {
        define
        getType
        cons
        unescapePresentationHtml
        isNil
        isPartial
        partialCall
        doPartial
        Nil
      } = root = Ast
      {
        Node
        resolve
        lazy
        defaultEnv
      } = Base
      rz = resolve
      lz = lazy
      lc = Leisure_call
      {
        runMonad2
        newConsFrom
        setValue
        getValue
        makeSyncMonad
        makeHamt
        _true
        _false
        _identity
        unit
        jsonConvert
        Monad2
        some
        none
        lacons: acons
        right
        left
        bind
      } = Runtime
      {
        evalLeisure
      } = Eval
      {
        parseCodeAttributes
      } = Org

      currentDataChange = null

      getSvgElement = (id)->
        if (el = document.getElementById id) then el
        else
          svg = createNode "<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000px; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>"
          document.body.appendChild(svg)
          document.getElementById id

      svgMeasureText = (text)->(style)->(f)->
        txt = getSvgElement('HIDDEN_TEXT')
        if rz style then txt.setAttribute 'style', rz style
        txt.lastChild.textContent = rz text
        bx = txt.getBBox()
        rz(f)(lz bx.width)(lz bx.height)

      # try to take strokeWidth into account
      svgMeasure = (content)-> primSvgMeasure content, baseStrokeWidth

      # (unused) try to take strokeWidth into account
      svgBetterMeasure = (content)-> primSvgMeasure content, transformStrokeWidth

      # try to take strokeWidth into account
      primSvgMeasure = (content, transformFunc)->(f)->
        svg = createNode "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>#{content}</g></svg>"
        document.body.appendChild(svg)
        g = svg.firstChild
        bbox = g.getBBox()
        pad = getMaxStrokeWidth g, g, svg, transformFunc
        document.body.removeChild(svg)
        rz(f)(lz bbox.x - Math.ceil(pad/2))(lz bbox.y - Math.ceil(pad/2))(lz bbox.width + pad)(lz bbox.height + pad)

      baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon']

      foldLeft = (func, val, thing)->
        if thing instanceof Leisure_cons then thing.foldl func, val
        else primFoldLeft func, val, thing, 0

      primFoldLeft = (func, val, array, index)->
        if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
        else val

      getMaxStrokeWidth = (el, base, svg, transformFunc)->
        if base.nodeName in baseElements
          #hack to parse strokeWidth string by setting the width of the svg to it
          svg.setAttribute 'width', (getComputedStyle(base).strokeWidth ? '0'), svg
          transformFunc el, svg.width.baseVal.value
        else if base.nodeName == 'use' then getMaxStrokeWidth base, base.instanceRoot.correspondingElement, svg, transformFunc
        else if base.nodeName == 'g'
          foldLeft ((v, n)-> Math.max v, (getMaxStrokeWidth n, n, svg, transformFunc)), 0, el.childNodes
        else 0

      baseStrokeWidth = (el, w)-> w

      transformStrokeWidth = (el, w)->
        if w == 0 then 0
        else
          ctm = el.getScreenCTM()
          tp1 = transformedPoint pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm
          tp2 = transformedPoint pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm
          x = tp2.x - tp1.x
          y = tp2.y - tp1.y
          Math.sqrt(x * x + y * y)

      createNode = (txt)->
        scratch = document.createElement 'DIV'
        scratch.innerHTML = txt
        scratch.firstChild

      define 'svgMeasure', ((content)->svgMeasure(rz content)), 1

      define 'svgMeasureText', ((text)->svgMeasureText(rz text)), 1

      define 'dataMod', setDataType ((op)->
        m = new Monad2 (env, cont)->
          data = {}
          runMods env, rz(op), data, cont, true
        m.op = op
        m.leisureType = 'dataMod'
        m), 'dataMod'

      define 'dataModOperation', (mod)-> rz (rz mod).op

      define 'setTheme', (theme)->
        new Monad2 (env, cont)->
          env.opts.setTheme theme
          cont unit()

      collabId = 0

      envData = (env)-> (env.data || env.opts.data || Lounge.data)

      dispatchCollaborative = (name, args)->
        new Monad2 "collaborative-#{name}", (env, cont)->
          envData(env).doCollaboratively(name, _.map(args, (el)-> L_toJson(el)))
            .then (result)-> cont right jsonConvert result
            .catch (err)-> cont left err.stack

      defaultEnvWithData = (data)->
        env = Object.create defaultEnv
        env.data = data
        env

      define 'makeCollaborative', (func)->
        new Monad2 'makeCollaborative', (env, cont)->
          data = envData env
          func = rz func
          name = func.L$info?.name
          if func.length > 1
            dispatchSrc = """
            (function(#{('a' + i for i in [1 .. func.length - 1]).join ', '}){
              return isPartial(arguments) ? partialCall(arguments) : dispatchCollaborative(name, arguments);
            })
            """
            dispatchFunc = eval dispatchSrc
            funcLen = dispatchFunc.length
          else
            dispatchFunc = dispatchCollaborative name, []
            funcLen = 0
          define name, dispatchFunc, funcLen, dispatchSrc
          data.openRegistration()
          data.registerCollaborativeCode name, (context, args...)->
            cvtArgs = _.map(args, (el)-> jsonConvert(el))
            cvtArgs.unshift acons 'options', context.options, acons('slaveId', context.slaveId, L_nil)
            runMonad2 func.apply(null, cvtArgs), defaultEnvWithData(data), ->
          data.closeRegistration()
          cont unit()

      define 'getData', (name)->
        new Monad2 'getData', (env, cont)->
          d = envData(env).getData rz(name)
          if d then cont jsonConvert d
          else cont unit()

      define 'getDataOpt', (name)->
        new Monad2 'getData', (env, cont)->
          d = envData(env).getData rz(name)
          if d then cont some jsonConvert d
          else cont none

      define 'getDataUnsafe', (name)->
        new Monad2 'getData', (env, cont)->
          d = envData(env).getData rz(name), true
          if d then cont jsonConvert d
          else cont unit()

      define 'getDataUnsafeOpt', (name)->
        new Monad2 'getData', (env, cont)->
          d = envData(env).getData rz(name), true
          if d then cont some jsonConvert d
          else cont none

      define 'getLocalData', (name)->
        new Monad2 'getLocalData', (env, cont)->
          d = envData(env).getLocalData rz(name), true
          if d then cont jsonConvert d
          else cont unit()

      define 'getLocalDataOpt', (name)->
        new Monad2 'getLocalData', (env, cont)->
          d = envData(env).getLocalData rz(name), true
          if d then cont some jsonConvert d
          else cont none

      define 'setData', (name, value)-> if r = doPartial arguments then r else
        new Monad2 'setData', (env, cont)->
          cont jsonConvert envData(env).setData rz(name), L_toJson rz value

      define 'setLocalData', (name, value)-> if r = doPartial arguments then r else
        new Monad2 'setLocalData', (env, cont)->
          cont jsonConvert envData(env).setLocalData rz(name), L_toJson rz value

      define 'appendData', (headline, name, value)-> if r = doPartial arguments then r else
        new Monad2 'appendData', (env, cont)->
          envData(env).appendDataToHeadline rz(headline), rz(name), L_toJson rz value
          cont jsonConvert rz value

      define 'appendDataWithAttrs', (headline, name, attrs, value)->
        if r = doPartial arguments then r else
          new Monad2 'appendDataWithAttrs', (env, cont)->
            envData(env).appendDataToHeadline rz(headline), (!isNil(rz name) && rz(name)), L_toJson(rz(value)), parseCodeAttributes(rz(attrs))
            cont rz value

      define 'removeData', (name)->
        new Monad2 'removeData', (env, cont)->
          envData(env).removeData rz(name)
          cont unit()

      define 'getImage', (name)-> if isPartial arguments then partialCall arguments else
        data = Lounge.opts.data
        new Monad2 (env, cont)->
          data.getImage rz(name), ((url)-> cont right url), (failure)-> cont left failure

      startMonitor = -> new Monad2 (env, cont)-> cont monitorChanges env.opt.data

      endMonitor = (mon)-> new Monad2 (env, cont)-> cont mon.stop()

      define '_monitorChanges', (val)->
        bind startMonitor(), lz (mon)->
          bind val, lz (result)->
            bind endMonitor(mon), (ignore)->
              cons mon, result

      evalLeisure """
      defMacro 'monitorChanges' \\list . ['_monitorChanges' ['do' | list]]
      """
