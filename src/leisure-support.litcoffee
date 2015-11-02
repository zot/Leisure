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

      define 'getData', (name)->
        m = new Monad2 (env, cont)->
          data = env.opts.data.getBlockNamed(rz name)?.yaml
          cont if data then some jsonConvert data else none
        m.properties = acons 'getName', rz(name), Nil
        m.name = name
        m.leisureType = 'dataMod'
        m

      define 'setTheme', (theme)->
        new Monad2 (env, cont)->
          env.opts.setTheme theme
          cont()

      define 'changeData', (changes)->
        new Monad2 (env, cont)->
          ch = rz changes
          ch = if ch instanceof Monad2 then ch else ch(_identity)
          data = {}
          env.opts.changeData -> runMods env, ch, data, ->
            cont jsonConvert data

      getMod = (dataMod)-> if dataMod instanceof Monad2 then dataMod else dataMod _identity

      runMods = (env, mod, data, cont)->
        type = if mod instanceof Monad2 then 'dataModGet' else getType mod
        switch type
          when 'dataModBind'
            sync = true
            first = second = firstRes = secondRes = false
            result = runMods env, (mod _true), data, (res)->
              if sync
                first = true
                firstRes = res
              else runMods env, getMod((mod _false)(lz res)), data, cont
            if first
              runMods env, getMod(mod(_false)(lz firstRes)), data, (res2)->
                if sync
                  second = true
                  secondRes = res2
                else cont(res2)
            sync = false
            return if second then cont secondRes
            else result
          when 'dataModGet'
            name = if mod instanceof Monad2 then rz mod.name
            else mod _identity
            cont jsonConvert data[name] = env.opts.getData name
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
      dataMod item = \\f . f item
      getDataModCmd mod = (getProperty mod 'getName') (\\x . mod) (mod id)
      defCase showBase.dataMod func mod | hasType mod dataMod ->
        (getProperty mod 'getName')
          \\name . concat["(getData " (showBase func name) ")"]
          mod \\cmd . showBase func cmd

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
        dataMod (dataModBind (getDataModCmd mod) cont)
      defCase showBase.dataModBind func cmd | hasType cmd dataModBind ->
        concatFlat["(do " (intersperse (map (showBase func) (extractDataModBind cmd)) ' ') ")"]
      extractDataModBind b = hasType b dataModBind
        b \\mod cont . [mod | (extractDataModBind (cont nil))]
        [b]
      """
