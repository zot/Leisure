Support code for Leisure

    define ['./base', './ast', './runtime', './gen', './eval'], (Base, Ast, Runtime, Gen, Eval)->
      {
        define
        getType
        cons
        unescapePresentationHtml
        isNil
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
        Nil
      } = requirejs './ast'
      {
        runMonad
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

      define 'changeData', (changes)->
        new Monad2 (env, cont)->
          ch = rz changes
          if getType(ch) != 'dataMod' then throw new Error "Attempt data change with value that is not a dataMod"
          data = {}
          env.opts.changeData -> runMods env, rz(ch.op), data, ->
            cont jsonConvert data

      runMods = (env, mod, data, cont, noChanges)->
        if noChanges && !(getType(mod) in ['dataModBind', 'dataModGet'])
          throw new Error("Attempt to alter data outside a changeData command")
        switch getType mod
          when 'dataModBind'
            while getType(mod) == 'dataModBind'
              first = second = firstRes = secondRes = false
              result = runMods env, (mod _true), data, ((res)->
                mod = (mod _false)(lz res)), noChanges
            if getType(mod) == 'dataMod'
              runMods env, rz(mod.op), data, cont, noChanges
            else cont mod
          when 'dataModGet'
            name = mod _identity
            d = env.opts.getData name, noChanges
            if d then cont some jsonConvert data[name] = d else cont none
          when 'dataModSet'
            name = mod _true
            value = mod _false
            data[name] = value
            cont jsonConvert env.opts.setData name, value
          when 'dataModAppend'
            mod (headline)->(name)->(value)->
              env.opts.appendDataToHeadline rz(headline), rz(name), rz(value)
              cont jsonConvert data[rz name] = rz value
          when 'dataModAppendWithAttrs'
            mod (headline)->(name)->(attrs)->(value)->
              env.opts.appendDataToHeadline rz(headline), (!isNil(name) && name), rz(value), rz(attrs)
              cont jsonConvert data[rz name] = rz value
          when 'dataModRemove'
            name = mod _identity
            delete data[name]
            env.opts.removeData name
            cont name

      evalLeisure """
      dataModGet name = \\f . f name
      getData name = dataMod (dataModGet name)
      defCase showBase.dataModGet func cmd | hasType cmd dataModGet ->
        cmd \\name . concatFlat["(getData " (showBase func name) ")"]

      dataModSet name value = \\f . f name value
      _setData name value = dataMod (dataModSet name value)
      setData name value = _setData name (toJson value)
      defCase showBase.dataModSet func cmd | hasType cmd dataModSet -> cmd \\name value . concatFlat["(setData " (map (showBase func) [name (fromJson value)]) ")"]

      dataModRemove name = \\f . f name
      removeData name = dataMod (dataModRemove name)
      defCase showBase.dataModRemove func cmd | hasType cmd dataModRemove -> cmd \\name . concatFlat["(removeData " (map (showBase func) name) ")"]

      dataModAppend headline name value = \\f . f headline name value
      defCase showBase.dataModAppend func cmd | hasType cmd dataModAppend -> cmd \\headline name value . concatFlat["(append " (map (showBase func) [headline name value]) ")"]
      _appendData headline name data = dataMod (dataModAppend headline name data)
      appendData headline name data = _appendData headline name (toJson data)

      dataModAppendWithAttrs headline name attrs data = \\f . f headline name attrs data
      defCase showBase.dataModAppendWithAttrs func cmd | hasType cmd dataModAppendWithAttrs -> cmd \\headline name attrs data . concatFlat["(appendWithAttrs " (map (showBase func) [headline name attrs data]) ")"]
      _appendWithAttrs headline name attrs data = dataMod (dataModAppendWithAttrs headline name attrs data)
      appendWithAttrs headline name attrs data =
        _appendWithAttrs headline name attrs (toJson data)

      dataModBind item cont = \\f . f item cont
      defCase bind.dataMod mod cont | hasType mod dataMod ->
        dataMod (dataModBind (dataModOperation mod) cont)
      isDataModBind m = getProperty m 'dataModType' (\\x . x == 'dataModBind') false
      extractDataModBind b = isDataModBind b
        (dataModBindInfo b) \\mod cont . [mod | (extractDataModBind (cont nil))]
        [b]
      defCase showBase.dataModBind func mod | hasType mod dataModBind ->
        concatFlat["(do " (intersperse (map (showBase func) (extractDataModBind mod)) ' ') ")"]

      defCase showBase.dataMod func mod | hasType mod dataMod ->
        showBase func (dataModOperation mod)
      """
