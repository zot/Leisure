Support code for Leisure

    define ['./base', './ast', './runtime', './gen', './eval'], (Base, Ast, Runtime, Gen, Eval)->
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
        _unit
        jsonConvert
        Monad2
        some
        none
        lacons: acons
      } = Runtime
      {
        evalLeisure
      } = Eval

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
          cont _unit

      define '_changeData', (changes)->
        new Monad2 'changeData', (env, cont)->
          if env.opts.dataChanges
            throw new Error "Attempt to change data while already changing data!"
          env.opts.changeData(->
            currentDataChange = {}
            runMonad2 rz(changes), env, (x)-> x)
            .then (x)-> cont x

      define 'getData', (name)->
        new Monad2 'getData', (env, cont)->
          d = env.opts.getData rz(name), true
          if d
            currentDataChange[rz name] = d
            cont some jsonConvert d
          else cont none

      define '_setData', (name, value)-> if r = doPartial arguments then r else
        new Monad2 'setData', (env, cont)->
          cont jsonConvert env.opts.setData rz(name), rz(value)

      define '_appendData', (headline, name, value)-> if r = doPartial arguments then r else
        new Monad2 'appendData', (env, cont)->
          env.opts.appendDataToHeadline rz(headline), rz(name), rz(value)
          cont jsonConvert rz value

      define '_appendDataWithAttrs', (headline, name, attrs, value)->
        if r = doPartial arguments then r else
          new Monad2 'appendDataWithAttrs', (env, cont)->
            env.opts.appendDataToHeadline rz(headline), (!isNil(rz name) && rz(name)), rz(value), rz(attrs)
            cont jsonConvert rz value

      define 'removeData', (name)->
        new Monad2 'removeData', (env, cont)->
          env.opts.removeData rz(name)
          cont _unit

      evalLeisure """
      defMacro 'changeData' \\list . ['_changeData' ['do' | list]]
      setData name value = _setData name (toJson value)
      appendData headline name data = _appendData headline name (toJson data)
      appendDataWithAttrs headline name attrs data =
        _appendDataWithAttrs headline name attrs (toJson data)
      """
