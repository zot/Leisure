GuardedServer
=============
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

A server which can process guarded operations.

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

    define ['./server', './guarded-operation'], (OT)->
      {
        Server
        GuardedOperation
        conflictsWith
        guardedTransform
        RejectGuardedOperation
      } = OT

      class GuardedServer extends Server
        constructor: (document, operations)-> super document, operations
        receiveGuardedOperation: (revision, operation, guards)->
          operation = new GuardedOperation operation, guards
          concurrentOperations = this.operations.slice(revision);
          # ... and transform the operation against all these operations ...
          for conOp in concurrentOperations
            if operation.conflictsWith conOp then return RejectGuardedOperation
            operation = opertion.transform conOp
          operation = operation.original
          # ... and apply that on the document.
          @document = operation.apply(this.document)
          # Store operation in history.
          @operations.push(operation)

          # It's the caller's responsibility to send the operation to all connected
          # clients and an acknowledgement to the creator.
          operation

      OT.GuardedServer = GuardedServer
      OT
