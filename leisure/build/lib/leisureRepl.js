// Generated by CoffeeScript 1.10.0

/*
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

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
 */

(function() {
  var Nil, Promise, SourceNode, _, action, ast2Json, asyncMonad, baseDir, baseLeisureDir, compile, createAstFile, createJsFile, defaultEnv, diag, doRequirements, errorString, evalInput, fs, gen, genJsFromAst, genMap, genSource, gennedAst, gennedJs, getMonadSyncMode, getParseErr, getType, getValue, help, identity, interactive, interrupted, intersperse, isMonad, jsCodeFor, json2Ast, lazy, lc, leisureCompleter, leisureFunctions, loadedParser, lz, newCall, newOptions, oldFunctionCount, outDir, pargs, path, primCompile, processArg, processedFiles, prog, prompt, promptText, readFile, readline, recompiled, ref, ref1, ref2, ref3, ref4, ref5, repl, replEnv, replaceErr, requireFiles, requireList, requireUtils, requirejs, resolve, rl, root, run, runFile, runMonad2, rz, setDataType, setMegaArity, setType, setWarnAsync, shouldNsLog, show, sourceNode, stage, stages, std, tangle, tangleOrgFile, tokenString, updateCompleter, usage, verbose, withFile, writeFile;

  require('source-map-support').install();

  path = require('path');

  baseDir = path.resolve(path.dirname(module.filename) + '/../../../build');

  console.log("BASE DIR: " + baseDir);

  baseLeisureDir = baseDir + '/leisure/';

  requirejs = require('requirejs').config({
    baseUrl: baseDir,
    paths: {
      lib: baseDir + '/lib',
      immutable: baseDir + '/lib/immutable-3.8.1.min',
      acorn: 'lib/acorn-3.2.0',
      acorn_loose: 'lib/acorn_loose-3.2.0',
      acorn_walk: 'lib/acorn_walk-3.2.0',
      handlebars: 'lib/handlebars-v4.0.5',
      lispyscript: 'lib/lispyscript/leisureReplPatch'
    }
  });

  ((typeof window !== 'undefined' && window) || global).Lazy = requirejs('lib/lazy');

  Error.stackTraceLimit = Infinity;

  ref = root = module.exports = requirejs('./base'), newCall = ref.newCall, resolve = ref.resolve, lazy = ref.lazy, defaultEnv = ref.defaultEnv;

  rz = resolve;

  lz = lazy;

  lc = Leisure_call;

  _ = require('lodash.min');

  fs = require('fs');

  if (_.includes(process.argv, '-x')) {
    global.L_DEBUG = true;
  }

  ref1 = requirejs('./ast'), getType = ref1.getType, setType = ref1.setType, setDataType = ref1.setDataType, ast2Json = ref1.ast2Json, json2Ast = ref1.json2Ast, Nil = ref1.Nil;

  global.btoa = require('btoa');

  ref2 = requirejs('./gen'), gen = ref2.gen, genMap = ref2.genMap, genSource = ref2.genSource, withFile = ref2.withFile, sourceNode = ref2.sourceNode, SourceNode = ref2.SourceNode, setMegaArity = ref2.setMegaArity;

  ref3 = require('./node'), readFile = ref3.readFile, writeFile = ref3.writeFile;

  ref4 = requirejs('./runtime'), identity = ref4.identity, runMonad2 = ref4.runMonad2, isMonad = ref4.isMonad, asyncMonad = ref4.asyncMonad, replaceErr = ref4.replaceErr, getMonadSyncMode = ref4.getMonadSyncMode, setWarnAsync = ref4.setWarnAsync, requireFiles = ref4.requireFiles, getValue = ref4.getValue;

  Promise = requirejs('lib/bluebird.min').Promise;

  ref5 = requirejs('./tangle'), tangle = ref5.tangle, jsCodeFor = ref5.jsCodeFor;

  global.setType = setType;

  global.setDataType = setDataType;

  global.defaultEnv = defaultEnv;

  global.identity = identity;

  stage = 2;

  std = true;

  stages = ['simpleParseJS', 'simpleParse', 'generatedPrelude'];

  shouldNsLog = false;

  pargs = null;

  diag = false;

  readline = require('readline');

  replEnv = {
    prompt: function(msg, cont) {
      return rl.question(msg, function(x) {
        var err, error;
        try {
          return cont(x);
        } catch (error) {
          err = error;
          return console.log("ERROR HANDLING PROMPT: " + err.stack);
        }
      });
    },
    presentValue: function(x) {
      return show(x) + '\n';
    }
  };

  replEnv.__proto__ = defaultEnv;

  getParseErr = function(x) {
    return x(lz(function(value) {
      return rz(value);
    }));
  };

  errorString = function(err) {
    var ref6, s;
    if (L$thunkStack) {
      s = L$thunkStack.join('\n   at ');
      (typeof global !== "undefined" && global !== null ? global : window).L$thunkStack = [];
      return err.toString() + ":\n   at " + s;
    } else {
      return (ref6 = err.stack) != null ? ref6 : err.toString();
    }
  };

  process.on('uncaughtException', function(err) {
    return console.log("Uncaught Exception: " + (errorString(err)));
  });

  evalInput = function(text, cont) {
    var err, error, result;
    if (text) {
      try {
        if (newCall) {
          result = lc(L_newParseLine, 0, Nil, text);
        } else {
          result = rz(L_newParseLine)(0)(lz(Nil))(lz(text));
        }
        return runMonad2(result, replEnv, function(ast) {
          var err, error, source;
          try {
            if (getType(ast) === 'err') {
              return cont("PARSE ERORR: " + (getParseErr(ast)));
            } else {
              if (diag) {
                if (typeof L_simplify !== "undefined" && L_simplify !== null) {
                  runMonad2(rz(L_simplify)(lz(text)), replEnv, function(result) {
                    return console.log("\nSIMPLIFIED: " + result);
                  });
                }
                console.log("\nAST: " + ast);
              }
              source = genSource(text, ast);
              if (diag) {
                console.log("\nCODE: (" + source + ")");
              }
              result = eval(source);
              if (isMonad(result)) {
                console.log("(processing IO monad)");
              }
              return runMonad2(result, replEnv, cont);
            }
          } catch (error) {
            err = error;
            console.log('caught error');
            return cont(rz(L_err)(lz(errorString(err))));
          }
        });
      } catch (error) {
        err = error;
        return cont(rz(L_err)(lz(errorString(err))));
      }
    } else {
      return cont('');
    }
  };

  help = function() {
    return console.log("Welcome to the Leisure REPL!\n\nHere are the commands:\n:d -- toggle diagnostics\n:s expr -- simplify an expression\n:{ -- start multiline input\n:} -- end multiline input\n:h -- print this message\n! -- evaluate JavaScript expression (after the !)\nfuncs -- list all known functions (this is really just a monad)\n(anything else) -- evaluate Leisure code\n");
  };

  oldFunctionCount = 0;

  leisureFunctions = null;

  updateCompleter = function(rl) {
    var ref6, ref7;
    if (root.functionCount !== oldFunctionCount) {
      oldFunctionCount = root.functionCount;
      return leisureFunctions = global.leisureFuncNames.toArray().concat((ref6 = (ref7 = getValue('macroDefs')) != null ? ref7.map(function(x) {
        return x.head();
      }).toArray() : void 0) != null ? ref6 : []);
    }
  };

  tokenString = function(t) {
    return t(lz(function(txt) {
      return function(pos) {
        return rz(txt);
      };
    }));
  };

  rl = null;

  leisureCompleter = function(line) {
    var completions, last, newLast, origLast, tokens;
    if (newCall) {
      tokens = lc(L_tokens, line, getValue('tokenPat')).toArray();
    } else {
      tokens = rz(L_tokens)(lz(line))(lz(getValue('tokenPat'))).toArray();
    }
    if (tokens.length > 0) {
      origLast = tokenString(tokens[tokens.length - 1]);
      last = origLast.toLowerCase();
      completions = _.filter(leisureFunctions, function(el) {
        return el.toLowerCase().indexOf(last) === 0;
      });
      if (completions.length === 1) {
        newLast = completions[0].substring(0, last.length);
        rl.line = line.substring(0, line.length - last.length) + newLast;
        return [completions, newLast];
      } else {
        return [
          _.filter(leisureFunctions, function(el) {
            return el.toLowerCase().indexOf(last) === 0;
          }), origLast
        ];
      }
    } else {
      return [[], line];
    }
  };

  interrupted = false;

  promptText = 'Leisure> ';

  prompt = function() {
    updateCompleter();
    rl.setPrompt(promptText);
    return rl.prompt();
  };

  show = function(obj) {
    if (typeof L_show !== "undefined" && L_show !== null) {
      return rz(L_show)(lz(obj));
    } else {
      return String(obj);
    }
  };

  repl = function(config) {
    var historyFile, leisureDir, lines;
    evalInput('resetStdTokenPacks', (function() {}));
    lines = null;
    leisureDir = path.join(config.home, '.leisure');
    historyFile = path.join(leisureDir, 'history');
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      completer: leisureCompleter
    });
    return fs.exists(historyFile, function(exists) {
      return (function(cont) {
        if (exists) {
          return readFile(historyFile, function(err, contents) {
            if (!err) {
              rl.history = contents.trim().split('\n').reverse();
            }
            return cont();
          });
        } else {
          return fs.exists(leisureDir, function(exists) {
            if (exists) {
              return cont();
            } else {
              return fs.mkdir(leisureDir, function(err) {
                if (err) {
                  console.log('Could not create leisure dir!');
                  process.exit(1);
                }
                return cont();
              });
            }
          });
        }
      })(function() {
        var finishMultiline, multiline, startMultiline;
        help();
        multiline = false;
        prompt();
        root.defaultEnv.err = function(err) {
          var ref6;
          console.log("REPL Error: " + ((ref6 = err.stack) != null ? ref6 : err));
          multiline = false;
          return prompt();
        };
        startMultiline = function() {
          if (multiline) {
            return console.log('Already reading multiline input');
          } else {
            multiline = true;
            lines = [];
            return rl.setPrompt('... ');
          }
        };
        finishMultiline = function(dumpInput) {
          var err, error, l, line;
          multiline = false;
          line = lines.join('\n');
          l = lines;
          lines = [];
          if (dumpInput) {
            return prompt();
          } else {
            try {
              if (line.substring(0, 2) === ':s') {
                if (typeof L_simplify !== "undefined" && L_simplify !== null) {
                  runMonad2(rz(L_simplify)(lz(text)), replEnv, function(result) {
                    return console.log("\n" + result);
                  });
                } else {
                  console.log('No simplify function.  Load std.lsr');
                }
              } else if (line.match(/^!/)) {
                console.log(eval(line.substring(1)));
              } else {
                evalInput(line, function(result) {
                  console.log('RESULT: ' + show(result));
                  return prompt();
                });
                return;
              }
            } catch (error) {
              err = error;
              console.log("ERROR: " + err.stack);
            }
            return prompt();
          }
        };
        rl.on('line', function(line) {
          var m;
          interrupted = false;
          if (rl.history[0] === rl.history[1]) {
            rl.history.shift();
          } else if (line.trim()) {
            fs.appendFile(historyFile, line + "\n", (function() {}));
          }
          switch (line.trim()) {
            case ':d':
              diag = !diag;
              return console.log("Diag: " + (diag ? 'on' : 'off'));
            case ':{':
              return startMultiline();
            case ':}':
              if (!multiline) {
                return console.log("Not reading multiline input.");
              } else {
                return finishMultiline();
              }
              break;
            case ':h':
              return help();
            default:
              if (m = line.match(/^:{(.*)$/)) {
                startMultiline();
                if (m[1]) {
                  return lines.push(m[1]);
                }
              } else if (multiline) {
                if (!line) {
                  return finishMultiline();
                } else {
                  return lines.push(line);
                }
              } else {
                lines = [line];
                return finishMultiline();
              }
          }
        });
        rl.on('close', function() {
          return process.exit(0);
        });
        return rl.on('SIGINT', function() {
          if (interrupted) {
            return process.exit();
          } else if (multiline) {
            return finishMultiline(true);
          } else {
            console.log("\n(^C again to quit)");
            return interrupted = true;
          }
        });
      });
    });
  };

  verbose = false;

  gennedAst = false;

  gennedJs = false;

  newOptions = true;

  action = null;

  outDir = null;

  recompiled = false;

  loadedParser = false;

  processedFiles = false;

  createAstFile = false;

  createJsFile = false;

  runFile = function(file, cont) {
    var err, error;
    try {
      return runMonad2(rz(L_protect)(lz(rz(L_require)(lz(file)))), defaultEnv, function(result) {
        return cont([]);
      });
    } catch (error) {
      err = error;
      console.log("ERROR LOADING FILE: " + file + "...\n" + err.stack);
      return cont([]);
    }
  };

  tangleOrgFile = function(file, cont) {
    return fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err.stack);
      } else {
        return tangle(data).then(function(result) {
          console.log("TANGLE " + file + "...");
          console.log(jsCodeFor(result));
          console.log("SOURCE MAP\n" + (JSON.stringify(result.map.toJSON())));
          return cont([]);
        })["catch"](function(err) {
          throw err;
        });
      }
    });
  };

  compile = function(file, cont) {
    var ext, ref6;
    if ((ref6 = defaultEnv.errorHandlers) != null) {
      ref6.push(function(e) {
        return process.exit(1);
      });
    }
    ext = path.extname(file);
    return runMonad2(rz(L_baseLoad)(lz(file)), defaultEnv, function(result) {
      var asts, bareFile, bareJs, bareLsr, bareOutputMap, err, error, errors, inspect, j, lastArgs, len, outputFile, outputFileBase, outputMap, ref7;
      if (verbose) {
        console.log("Preparing to write code for " + file);
      }
      errors = [];
      asts = _.map(result.toArray(), function(lineData) {
        if (newCall) {
          result = lc(lineData.tail(), lz(function(x) {
            return rz(x);
          }), lz(function(x) {
            return rz(x);
          }));
        } else {
          result = lineData.tail()(lz(function(x) {
            return rz(x);
          }))(lz(function(x) {
            return rz(x);
          }));
        }
        if (result instanceof Error) {
          result = replaceErr(result, "Error compiling line: " + (lines.head()) + "...\n" + ast.message);
          errors.push[result];
        }
        return lineData.head();
      });
      if (errors.length) {
        for (j = 0, len = errors.length; j < len; j++) {
          err = errors[j];
          console.log(err.stack);
        }
        return;
      }
      if (createAstFile) {
        outputFile = (ext === file ? file : file.substring(0, file.length - ext.length)) + ".ast";
        if (outDir) {
          outputFile = path.join(outDir, path.basename(outputFile));
        }
        if (verbose) {
          console.log("AST FILE: " + outputFile);
        }
        writeFile(outputFile, "[\n  " + (_(asts).map(function(item) {
          return JSON.stringify(ast2Json(item));
        }).join(',\n  ')) + "\n]", function(err) {
          if (err) {
            console.log("Error writing AST file: " + outputFile);
            return cont(replaceErr(err, "Error writing AST file: " + outputFile + "...\n" + err.message));
          } else if (!createJsFile) {
            return cont(asts);
          }
        });
      }
      if (createJsFile) {
        outputFileBase = (ext === file ? file : file.substring(0, file.length - ext.length));
        outputFile = outputFileBase + ".js";
        outputMap = outputFileBase + ".map";
        bareFile = outputFileBase.replace(/^.*\/([^\/]*$)/, '$1');
        bareJs = bareFile + ".js";
        bareLsr = bareFile + ".lsr";
        bareOutputMap = bareFile + ".map";
        if (outDir) {
          outputFile = path.join(outDir, path.basename(outputFile));
          outputMap = path.join(outDir, path.basename(outputMap));
        }
        if (verbose) {
          console.log("JS FILE: " + outputFile);
        }
        try {
          lastArgs = null;
          result = withFile(path.basename(bareLsr), null, function() {
            return (new SourceNode(1, 0, bareLsr, [
              'define([], function(){\n  return L_runMonads([\n    ', intersperse(lastArgs = _.map(asts, function(item) {
                return sourceNode(item, 'function(){return ', genMap(item), '}');
              }), ',\n    '), '\n  ]);\n});'
            ])).toStringWithSourceMap({
              file: path.basename(bareJs)
            });
          });
        } catch (error) {
          err = error;
          inspect = (ref7 = typeof require === "function" ? require('util').inspect : void 0) != null ? ref7 : function(x) {
            return x;
          };
          console.log("Error in source node,\nargs: " + (inspect(lastArgs, {
            depth: 128
          })) + "\nError: " + err.stack);
          throw err;
        }
        if (verbose) {
          console.log("FILE: " + outputFile + ", MAP: " + outputMap);
        }
        return writeFile(outputFile, result.code + ("\n//# sourceMappingURL=" + (path.basename(bareOutputMap)) + "\n"), function(err) {
          if (!err) {
            return writeFile(outputMap, JSON.stringify(result.map, null, "  "), function(err) {
              if (!err) {
                return cont(asts);
              } else {
                console.log("Error writing map file: " + outputMap);
                return cont(replaceErr(err, "Error writing map file: " + outputMap + "...\n" + err.message));
              }
            });
          } else {
            console.log("Error writing JS file: " + outputFile);
            return cont(replaceErr(err, "Error writing JS file: " + outputFile + "...\n" + err.message));
          }
        });
      } else {
        return cont([]);
      }
    });
  };

  intersperse = function(array, element) {
    var i, j, ref6, result;
    if (array.length < 2) {
      return array;
    } else {
      result = [array[0]];
      for (i = j = 1, ref6 = array.length; 1 <= ref6 ? j < ref6 : j > ref6; i = 1 <= ref6 ? ++j : --j) {
        result.push(element, array[i]);
      }
      return result;
    }
  };

  primCompile = function(file, cont) {
    var compileFile, ext, parseLine, ref6;
    root.shouldNsLog = shouldNsLog;
    ref6 = require(stages[stage]), parseLine = ref6.parseLine, compileFile = ref6.compileFile;
    ext = path.extname(file);
    return readFile(file, function(err, contents) {
      var compiled, outputFile;
      if (!err) {
        compiled = compileFile(contents, file);
        outputFile = (ext === file ? file : file.substring(0, file.length - ext.length)) + ".js";
        if (outDir) {
          outputFile = path.join(outDir, path.basename(outputFile));
        }
        if (verbose) {
          console.log("JS FILE: " + outputFile);
        }
        return writeFile(outputFile, compiled, function(err) {
          if (!err) {
            return cont(compiled);
          }
        });
      } else {
        return console.log("ERROR COMPILING: " + err);
      }
    });
  };

  genJsFromAst = function(file, cont) {
    return readFile(file, function(err, contents) {
      if (!err) {
        return genJs(_(JSON.parse(contents)).map(function(json) {
          return json2Ast(json);
        }), cont);
      }
    });
  };

  usage = function() {
    console.log("Usage repl [-v | -t | -a | -0 | -1 | -c | -coffee | -j | -d DIR] [FILE ...]\n\n-v            verbose\n-t            tangle, FILE is interpreted as an org file\n-a            only parse to AST\n-0            use CoffeeScript parser\n-1            use simple Leisure parser\n-2            use normal Leisure parser but don't load std\n-c            for -0, compile to JS using CoffeeScript compiler\n              for -1, or normal case, create AST and JS file\n-r FILE       require JS FILE\n-d DIR        specify output directory for .ast and .js files\n-j            run JavaScript interactively after requiring Leisure files\n-coffee       run CoffeeScript interactively after requiring Leisure files\n\nWith no FILE arguments, runs interactive REPL");
    return process.exit(0);
  };

  interactive = false;

  requireList = [];

  doRequirements = function(cont) {
    if (verbose) {
      console.log("DO REQUIREMENTS.  loaded: " + loadedParser);
    }
    if (std) {
      requireList.unshift('leisure/std');
    }
    if (!loadedParser) {
      root.shouldNsLog = shouldNsLog;
      return requirejs(['./leisure/' + stages[stage]], function(promise) {
        loadedParser = true;
        if (stage === 1) {
          root.lockGen = false;
        }
        if (promise instanceof Promise) {
          return promise.then(function() {
            return requireFiles(requireList, cont, verbose);
          });
        } else {
          return requireFiles(requireList, cont, verbose);
        }
      });
    } else {
      return requireFiles(requireList, cont, verbose);
    }
  };

  processArg = function(config, pos) {
    var actions;
    if (pos >= pargs.length) {
      if (processedFiles && !interactive) {
        process.exit(0);
      } else {
        if (verbose) {
          console.log("STARTING REPL");
        }
        doRequirements(function() {
          return repl(config);
        });
        return;
      }
    }
    if (pargs[pos][0] === '-' && !newOptions) {
      actions = [];
      newOptions = true;
      gennedAst = gennedJs = false;
    }
    switch (pargs[pos]) {
      case '-p':
        promptText = pargs[pos + 1];
        pos++;
        break;
      case '-x':
        break;
      case '-v':
        verbose = true;
        global.verbose.gen = true;
        setWarnAsync(true);
        break;
      case '-t':
        action = tangleOrgFile;
        break;
      case '-a':
        action = compile;
        createAstFile = true;
        break;
      case '-c':
        if (stage === 0) {
          action = primCompile;
          loadedParser = true;
        } else {
          action = compile;
          createAstFile = createJsFile = true;
        }
        break;
      case '-d':
        outDir = pargs[pos + 1];
        pos++;
        break;
      case '-0':
        stage = 0;
        std = false;
        root.lockGen = true;
        break;
      case '-1':
        stage = 1;
        std = false;
        root.lockGen = true;
        break;
      case '-2':
        std = false;
        break;
      case '-i':
        interactive = true;
        break;
      case '--nslog':
        shouldNsLog = true;
        break;
      case '-r':
        if (verbose) {
          console.log("PUSHING REQUIREMENT: " + pargs[pos + 1]);
        }
        requireList.push(pargs[pos + 1]);
        pos++;
        break;
      default:
        newOptions = true;
        if (pargs[pos] === '-coffee') {
          processedFiles = true;
          requireUtils();
          require('coffee-script/lib/coffee-script/repl').start({
            useGlobal: true
          });
          return;
        }
        if (pargs[pos] === '-j') {
          processedFiles = true;
          requireUtils();
          doRequirements(function() {
            return require('repl').start({
              useGlobal: true
            });
          });
          return;
        }
        if (pargs[pos][0] === '-') {
          usage();
        } else {
          processedFiles = true;
          doRequirements(function() {
            return action(pargs[pos], function() {
              return processArg(config, pos + 1);
            });
          });
        }
        return;
    }
    return processArg(config, pos + 1);
  };

  requireUtils = function() {
    global.Leisure = root;
    global.Lazy = require('10-lazy');
    return global.Org = require('11-org');
  };

  run = function(args, config) {
    pargs = args;
    action = runFile;
    console.log("Run: " + (args.join(', ')));
    if (args.length === 2) {
      root.shouldNsLog = shouldNsLog;
      return doRequirements(function() {
        return repl(config);
      });
    } else {
      return processArg(config, 2);
    }
  };

  root.runFile = runFile;

  root.run = run;

  root.nwrun = function(line) {
    return run(line.split(' '), {
      home: process.env.HOME
    });
  };

  if (verbose) {
    console.log("ARGS: " + (JSON.stringify(pargs)));
  }

  if (process.versions['node-webkit'] != null) {
    console.log("HELLO");
  } else {
    prog = path.basename(process.argv[1]);
    switch (prog.toLowerCase()) {
      case 'repl':
      case 'runrepl':
      case 'leisure':
        if (verbose) {
          console.log("RUNNING REPL");
        }
        run(process.argv, {
          home: process.env.HOME
        });
        break;
      default:
        root.shouldNsLog = shouldNsLog;
        requirejs(['./leisure/' + stages[stage]]);
    }
  }

}).call(this);

//# sourceMappingURL=leisureRepl.js.map