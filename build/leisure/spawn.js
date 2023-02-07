// Generated by CoffeeScript 2.3.0
(function() {
  // Execute commands that can read lines from processes.

  // This is sort of a coroutine-based version of select.

  // Kind of.
  var ChildProcess, Fiber, FiberReader, dataLen, fiberReader, hasLine, highWater, realStream;

  Fiber = require('fibers');

  ({ChildProcess} = require('child_process'));

  // Must be used inside a fiber
  FiberReader = class FiberReader {
    constructor() {
      this.commands = [];
      this.waiting = false;
      this.running = true;
      this.fiber = new Fiber(() => {
        var err, results;
        results = [];
        while (this.running) {
          if (!this.commands.length) {
            results.push(this.pause());
          } else {
            try {
              results.push(this.commands.shift()(this));
            } catch (error) {
              err = error;
              results.push(console.log("ERROR IN Reader command", err));
            }
          }
        }
        return results;
      });
      this.fiber.run();
    }

    run(cmd) {
      this.commands.push(cmd);
      return this.resume();
    }

    stop() {
      this.running = false;
      return this.fiber = null;
    }

    addProc(proc, options) {
      proc._spawnData = Object.assign({
        pendingData: '',
        highWater: 4096
      }, options);
      proc.stdout.on('data', (value) => {
        return this.addInput(proc, value.toString());
      });
      proc.stdout.on('close', () => {
        return this.endInput(proc);
      });
      proc.stdout.on('end', () => {
        return this.endInput(proc);
      });
      return proc.on('exit', () => {
        return this.endInput(proc);
      });
    }

    addStream(stream, options) {
      stream._spawnData = Object.assign({
        pendingData: '',
        highWater: 4096
      }, options);
      stream.on('data', (value) => {
        return this.addInput(stream, value.toString());
      });
      stream.on('close', () => {
        return this.endInput(stream);
      });
      return stream.on('end', () => {
        return this.endInput(stream);
      });
    }

    addInput(stream, str) {
      stream._spawnData.pendingData += str;
      if (dataLen(stream) > highWater(stream) && hasLine(stream)) {
        realStream(stream).pause();
      }
      return this.resume();
    }

    endInput(stream) {
      stream.done = true;
      return this.resume();
    }

    pause() {
      this.waiting = true;
      Fiber.yield();
      return this.waiting = false;
    }

    resume() {
      if (this.waiting) {
        return this.fiber.run();
      }
    }

    waitFor(contFunc) {
      var pendingFiberDone, result;
      result = null;
      pendingFiberDone = false;
      process.nextTick(() => {
        return contFunc((res) => {
          pendingFiberDone = true;
          result = res;
          this.resume();
          return res;
        });
      });
      while (!pendingFiberDone) {
        this.pause();
      }
      return result;
    }

    readLine(stream) {
      var index, line;
      index = stream._spawnData.pendingData.indexOf('\n');
      while (!stream.done && index === -1) {
        this.pause();
        index = stream._spawnData.pendingData.indexOf('\n');
      }
      if (index === -1) {
        index = stream._spawnData.pendingData.length;
      } else {
        index++;
      }
      line = stream._spawnData.pendingData.substring(0, index);
      stream._spawnData.pendingData = stream._spawnData.pendingData.substring(index);
      if (!stream.done && realStream(stream).isPaused() && dataLen(stream) < highWater) {
        realStream(stream).resume();
      }
      if (stream.done && !line) {
        return null;
      } else {
        return line;
      }
    }

  };

  hasLine = function(stream) {
    return stream._spawnData.pendingData.indexOf('\n') > -1;
  };

  dataLen = function(stream) {
    return stream._spawnData.pendingData.length;
  };

  highWater = function(stream) {
    return stream._spawnData.highWater;
  };

  realStream = function(stream) {
    if (stream instanceof ChildProcess) {
      return stream.stdout;
    } else {
      return stream;
    }
  };

  fiberReader = function() {
    return new FiberReader();
  };

  module.exports = {fiberReader};

}).call(this);

//# sourceMappingURL=spawn.js.map