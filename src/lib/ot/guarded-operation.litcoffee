GuardedOperation
================
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

An operation with a set of "guarded" regions that can fail or cause
other operations to fail if the guarded regions would be
"concurrently" modified.

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

    define ['./text-operation', './wrapped-operation'], (OT)->
      {
        TextOperation
        WrappedOperation
      } = OT
      {
        isRetain
        isInsert
        isDelete
        transform
      } = TextOperation

      class GuardedOperation extends WrappedOperation
        constructor: (@original, @guards)->
        conflictsWith: (operation)->
          if operation instanceof WrappedOperation then operation = operation.wrapped
          nextGuardStart = @guards[0]
          nextGuardStop = @guards[1]
          guardPos = 2
          cursor = 0
          for op in operation.ops
            if isRetain op
              cursor += op
              while cursor >= nextGuardStop
                if guardPos >= @guards.length then return false
                nextGuardStart = @guards[guardPos++]
                nextGuardStop = @guards[guardPos++]
            else if isDelete op
              cursor -= op
              if nextGuardStart < cursor then return true
            else if nextGuardStart <= cursor < nextGuardStop then return true
          false
        toGuardOp: ->
          op = new TextOperation()
          cursor = 0
          pos = 0
          while pos < @guards.length
            start = @guards[pos++]
            end = @guards[pos++]
            if cursor < start then op.retain start - cursor
            op.insert 'x'
            if cursor < end then op.retain end - cursor
            op.insert 'x'
          if cursor < @baseLength then op.retain @baseLength - cursor
          op
        transform: (refOp)->
          t = WrappedOperation.transform(@original, refOp)[0]
          guardOp = @toGuardOp()
          for conOp in concurrentOperations
            if conOp instanceof WrappedOperation then conOp = conOp.wrapped
            guardOp = transform guardOp, conOp
          new GuardedOperation t, guardsFromOp(guardOp)

      guardsFromOp = (op)->
        newGuards = []
        cursor = 0
        pos = 0
        while pos < op.ops.length
          if isRetain op then cursor += op
          else if isInsert op then newGuards.push cursor
        newGuards

      OT.GuardedOperation = GuardedOperation
      OT.RejectGuardedOperation = {}
      OT
