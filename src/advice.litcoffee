Advice
======
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

Licensed with ZLIB license (see "[License](#license)", below).

Advice is part of Leisure project.  You can find it on
[Github](https://github.com/zot/Leisure).

Licensed with ZLIB license.
=============================

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.

Code
====

<a id='Method_Advice'></a>
Method Advice

    define [], ->


changeAdvice(object, flag, advice) is the main API method.  Using
advice will add an "ADVICE" property to object.

- object is the object that has methods you want to override (numbers won't work)
- flag turns on and off the advice
- advice is an object with a property for each method you want to override
  - each property contains another object with a property, which labels the advice
  - the property's value should be the advice (if you're adding advice)

Calling changeAdvice with true will preserve the original methods and
wrap them with your advice

Calling changeAdvice with false will restore the original methods.

When you specify advice, you can use beforeMethod and afterMethod to
create the advice or you can just provide a function that takes the
parent function and returns the function to run in its place.

      ->
        changeAdvice object, true,
          setName: monitorName: afterMethod (newName)->
            console.log "Set name #{newName}"
          setOwner: diag: (parent)-> (newOwner)->
            try
              parent newOwner
            catch err
              dispayError err
              throw err

Here's that same example in JavaScript with the functions declared
separately for clarity.  Keep in mind that these functions will be
used as methods on object, so you can use "this" in them.

      -> `
        function monitorName(newName) {
          console.log("Set name " + newName);
        }
        function diagSetOwner(parent) {
          return function (newOwner) {
            try {
              return parent(newOwner);
            } catch (err) {
              dispayError(err);
              throw err;
            }
          };
        }

        changeAdvice(object, true, {
          setName: {monitorName: afterMethod(monitorName)},
          setOwner: {diag: diagSetOwner}
        });
      `

      changeAdvice = (object, flag, advice)->
        if flag then advise object, advice
        else unadvise object, advice

beforeMethod(def) takes a function to run before the method you are
advising.  It will run as a method on the object and take the same
arguments as the original method.  After it runs, the original method
will run and its result will be returned (so you can return whatever
you want from your definition).

      beforeMethod = (def)->
        (parent)-> (args...)->
          def.apply this, args
          parent.apply this, args

afterMethod(def) takes a function to run after the method you are
advising.  It will run as a method on the object and take the same
arguments as the original method.  The original method will run, then
your supplied function will run, then the return value from the
original method will be returned (so you can return whatever you want
from your definition).

      afterMethod = (def)->
        (parent)-> (args...)->
          r = parent.apply this, args
          def.apply this, args
          r

Low Level Code
==============

      class Advice
        constructor: (@target, disabled)->
          @originals = {}
          @adviceOrder = {}
          @advice = {}
          if !disabled then @enable()
        enable: (method)-> if !@enabled
          if method then @installAdviceHandler method
          else
             if !@target.ADVICE then @target.ADVICE = this
             else if @target.ADVICE != this
               throw new Error "Attempt to install advice on advised object"
             for method in @advice
               @installAdviceHandler method
          @enabled = true
          this
        disable: (method)-> if @enabled
          if method
            @target[method] = @originals[method]
            delete @originals[method]
            if _.isEmpty @originals then @disable()
          else
            for method in @advice
              @target[method] = @originals[method]
            @originals = {}
            delete @target.ADVICE
            @enabled = false
          this
        advise: (method, name, def)->
          key = "#{method}-#{name}"
          @advice[key] = def
          if !@adviceOrder[method] then @adviceOrder[method] = []
          @adviceOrder[method].push key
          if @enabled then @installAdviceHandler method
          this
        unadvise: (method, name)->
          if !name then for name in @adviceOrder[method] ? []
            @removeAdvice method, name
          else
            key = "#{method}-#{name}"
            if @adviceOrder[method]?.length == 1
              @disable method
              delete @adviceOrder[method]
            else _.remove @adviceOrder, (x)-> x == key
            delete @advice[key]
          this
        installAdviceHandler: (method)->
          if !@originals[method]
            @originals[method] = @target[method]
            @target[method] = (args...)=>
              @callAdvice @adviceOrder[method].length - 1, @adviceOrder[method], method, args
        callAdvice: (index, order, method, args)->
          func = if index < 0 then @originals[method]
          else @advice[order[index]]((args...)=>
            @callAdvice index - 1, order, method, args)
          func.apply @target, args

      advise = (object, method, name, def)->
        if typeof method == 'object'
          for meth, advice of method
            for name, def of advice
              advise object, meth, name, def
        else (object.ADVICE ? new Advice object).advise method, name, def

      unadvise = (object, method, name)->
        if typeof method == 'object'
          for meth, advice of method
            for name, def of advice
              unadvise object, meth, name
        else object.ADVICE?.unadvise method, name

      callOriginal = (object, method, args...)->
        (object.ADVICE?.originals?[method] ? object[method]).apply object, args

      {
        changeAdvice
        beforeMethod
        afterMethod
        advise
        unadvise
        callOriginal
      }
