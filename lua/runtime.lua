local M = require('base')
local _ = require('underscore')

M.lockGlobals(
   function()
      local weakTable = M.weakTable
      local setType = M.setType
      local handleErr = M.handleErr
      local Nil = M.Nil
      local define = M.define
      local lazy = M.lazy

      local monads = weakTable()

      local function makeMonad(command)
         local monad = function() end
         monads[monad] = command
         return setType(monad, 'monad')
      end

      local function isMonad(func) return monads[func] end

      local nextMonad = function(cont) return cont end

      local function runMonad(monad, env, cont)
         if monads[monad] then
            local err, result = handleErr(
               function()
                  monads[monad](env, nextMonad(cont))
               end)

            if err then return result
            else
               env.error("Error running monad: " .. result)
            end
         else
            cont(monad)
         end
      end

      define(
         'bind',
         lazy(
            function(m)
               return function(binding)
                  return makeMonad(
                     function(env, cont)
                        runMonad(
                           m(),
                           env,
                           function(value)
                              runMonad(binding()(lazy(value)), env, cont)
                           end)
                     end)
               end
            end))

      define(
         'print',
         lazy(
            function(msg)
               return makeMonad(
                  function(env, cont)
                     local m = msg()

                     env.write(tostring(m) .. '\n')
                     cont(Nil)
                  end)
            end))

      define('true', lazy(function(a) return function(b) return a() end end))

      define('false', lazy(function(a) return function(b) return b() end end))

      local trueFunc = L_true()

      local falseFunct = L_false()

      local function bool(value) return (value and trueFunc) or falseFunc end

      local values = {}

      define(
         'hasValue',
         lazy(
            function(name)
               return makeMonad(
                  function(env, cont)
                     cont(bool(values[name()]))
                  end)
            end))

      define(
         'getValueOr',
         lazy(
            function(name)
               return function(defaultValue)
                  return makeMonad(
                     function(env, cont)
                        cont(values[name()] or defaultValue())
                     end)
               end
            end))

      define(
         'getValue',
         lazy(
            function(name)
               return makeMonad(
                  function(env, cont)
                     cont(values[name()])
                  end)
            end))

      define(
         'setValue',
         lazy(
            function(name)
               return function(value)
                  return makeMonad(
                     function(env, cont)
                        values[name()] = value()
                        cont(falseFunc)
                     end)
               end
            end))

      define(
         'createS',
         lazy(
            makeMonad(
               function(env, cont)
                  cont({value = nil})
               end)))

      define(
         'getS',
         lazy(
            function(state)
               return makeMonad(
                  function(env, cont)
                     cont(state().value)
                  end)
            end))

      define(
         'setS',
         lazy(
            function(state)
               return function(value)
                  return makeMonad(
                     function(env, cont)
                        state().value = value()
                        cont(falseFunc)
                     end)
               end
            end))

      M.makeMonad = makeMonad
      M.runMonad = runMonad
      M.stateValues = values
      M.defaultEnv = {
         write = io.write
      }
   end)

return M
