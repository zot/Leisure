var block = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  block = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var Nil = Leisure.Nil;
var cons = Leisure.cons;
var _LEFT_ARROW, _UP_ARROW, _RIGHT_ARROW, _DOWN_ARROW, _startBlocky, _runPhysics, _key, _down, _up, _jsPD;
//LEFT_ARROW = AST(37)
root.defs._LEFT_ARROW = _LEFT_ARROW = Leisure.define('LEFT_ARROW', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('LEFT_ARROW', 0), ctx)
   try {
     return 37;
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "37");
;
//UP_ARROW = AST(38)
root.defs._UP_ARROW = _UP_ARROW = Leisure.define('UP_ARROW', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('UP_ARROW', 0), ctx)
   try {
     return 38;
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "38");
;
//RIGHT_ARROW = AST(39)
root.defs._RIGHT_ARROW = _RIGHT_ARROW = Leisure.define('RIGHT_ARROW', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('RIGHT_ARROW', 0), ctx)
   try {
     return 39;
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "39");
;
//DOWN_ARROW = AST(40)
root.defs._DOWN_ARROW = _DOWN_ARROW = Leisure.define('DOWN_ARROW', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('DOWN_ARROW', 0), ctx)
   try {
     return 40;
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "40");
;
//startBlocky = AST(\e . bind startPhysics \_ . runPhysics)
root.defs._startBlocky = _startBlocky = Leisure.define('startBlocky', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('startBlocky', 6), ctx)
   try {
     return function(_e){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('startBlocky', 5), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('startBlocky', 2), oldCtx)
               try {
                 return _bind()(_startPhysics);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('startBlocky', 4), oldCtx)
                  try {
                    return $m || ($m = (function(__){return _runPhysics();}));
                  } catch (err) {
                    if (!err.leisureContext) {
                      err.leisureContext = Leisure.contextStack;
                    }
                    throw err;
                  } finally {
                    Leisure.contextStack = ctx
                  }};
            })()})());
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\e. do\n  startPhysics\n  runPhysics");
;
//runPhysics = AST(bind (js ([ Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3))) ])) \_ . bind stepPhysics \_ . bind (js ([ Notebook.update("app") ])) \_ . runPhysics)
root.defs._runPhysics = _runPhysics = Leisure.define('runPhysics', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('runPhysics', 27), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('runPhysics', 27), ctx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('runPhysics', 8), oldCtx)
               try {
                 return _bind()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('runPhysics', 7), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('runPhysics', 7), oldCtx)
                              try {
                                return _js()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('runPhysics', 6), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('runPhysics', 6), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('runPhysics', 4), oldCtx)
                                                   try {
                                                     return _$r()((function(){
                                                        var ctx = Leisure.contextStack
                                                        return function(){var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('runPhysics', 3), oldCtx)
                                                            try {
                                                              return "Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))";
                                                            } catch (err) {
                                                              if (!err.leisureContext) {
                                                                err.leisureContext = Leisure.contextStack;
                                                              }
                                                              throw err;
                                                            } finally {
                                                              Leisure.contextStack = ctx
                                                            }};
                                                      })());
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_$s);
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }
                                          })()));
                                       } catch (err) {
                                         if (!err.leisureContext) {
                                           err.leisureContext = Leisure.contextStack;
                                         }
                                         throw err;
                                       } finally {
                                         Leisure.contextStack = ctx
                                       }};
                                 })()})());
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()));
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }};
                  })()})());
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('runPhysics', 26), oldCtx)
                  try {
                    return $m || ($m = (function(__){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('runPhysics', 25), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('runPhysics', 11), oldCtx)
                              try {
                                return _bind()(_stepPhysics);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()((function(){var $m; return (function(){
                             var ctx = Leisure.contextStack
                             return function(){var oldCtx = ctx;
                                   
                                 var ctx = Leisure.contextStack;
                                 Leisure.contextStack = cons(funcContext('runPhysics', 24), oldCtx)
                                 try {
                                   return $m || ($m = (function(__){return (function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('runPhysics', 23), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('runPhysics', 20), oldCtx)
                                             try {
                                               return _bind()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('runPhysics', 19), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('runPhysics', 19), oldCtx)
                                                            try {
                                                              return _js()((function(){var $m; return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 return function(){var oldCtx = ctx;
                                                                       
                                                                     var ctx = Leisure.contextStack;
                                                                     Leisure.contextStack = cons(funcContext('runPhysics', 18), oldCtx)
                                                                     try {
                                                                       return $m || ($m = ((function(){
                                                                          var ctx = Leisure.contextStack
                                                                          var oldCtx = ctx;
                                                                             
                                                                           var ctx = Leisure.contextStack;
                                                                           Leisure.contextStack = cons(funcContext('runPhysics', 18), oldCtx)
                                                                           try {
                                                                             return (function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('runPhysics', 16), oldCtx)
                                                                                 try {
                                                                                   return _$r()((function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      return function(){var oldCtx = ctx;
                                                                                            
                                                                                          var ctx = Leisure.contextStack;
                                                                                          Leisure.contextStack = cons(funcContext('runPhysics', 15), oldCtx)
                                                                                          try {
                                                                                            return "Notebook.update(\"app\")";
                                                                                          } catch (err) {
                                                                                            if (!err.leisureContext) {
                                                                                              err.leisureContext = Leisure.contextStack;
                                                                                            }
                                                                                            throw err;
                                                                                          } finally {
                                                                                            Leisure.contextStack = ctx
                                                                                          }};
                                                                                    })());
                                                                                 } catch (err) {
                                                                                   if (!err.leisureContext) {
                                                                                     err.leisureContext = Leisure.contextStack;
                                                                                   }
                                                                                   throw err;
                                                                                 } finally {
                                                                                   Leisure.contextStack = ctx
                                                                                 }
                                                                              })()(_$s);
                                                                           } catch (err) {
                                                                             if (!err.leisureContext) {
                                                                               err.leisureContext = Leisure.contextStack;
                                                                             }
                                                                             throw err;
                                                                           } finally {
                                                                             Leisure.contextStack = ctx
                                                                           }
                                                                        })()));
                                                                     } catch (err) {
                                                                       if (!err.leisureContext) {
                                                                         err.leisureContext = Leisure.contextStack;
                                                                       }
                                                                       throw err;
                                                                     } finally {
                                                                       Leisure.contextStack = ctx
                                                                     }};
                                                               })()})());
                                                            } catch (err) {
                                                              if (!err.leisureContext) {
                                                                err.leisureContext = Leisure.contextStack;
                                                              }
                                                              throw err;
                                                            } finally {
                                                              Leisure.contextStack = ctx
                                                            }
                                                         })()));
                                                      } catch (err) {
                                                        if (!err.leisureContext) {
                                                          err.leisureContext = Leisure.contextStack;
                                                        }
                                                        throw err;
                                                      } finally {
                                                        Leisure.contextStack = ctx
                                                      }};
                                                })()})());
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }
                                          })()((function(){var $m; return (function(){
                                            var ctx = Leisure.contextStack
                                            return function(){var oldCtx = ctx;
                                                  
                                                var ctx = Leisure.contextStack;
                                                Leisure.contextStack = cons(funcContext('runPhysics', 22), oldCtx)
                                                try {
                                                  return $m || ($m = (function(__){return _runPhysics();}));
                                                } catch (err) {
                                                  if (!err.leisureContext) {
                                                    err.leisureContext = Leisure.contextStack;
                                                  }
                                                  throw err;
                                                } finally {
                                                  Leisure.contextStack = ctx
                                                }};
                                          })()})());
                                       } catch (err) {
                                         if (!err.leisureContext) {
                                           err.leisureContext = Leisure.contextStack;
                                         }
                                         throw err;
                                       } finally {
                                         Leisure.contextStack = ctx
                                       }
                                    })();}));
                                 } catch (err) {
                                   if (!err.leisureContext) {
                                     err.leisureContext = Leisure.contextStack;
                                   }
                                   throw err;
                                 } finally {
                                   Leisure.contextStack = ctx
                                 }};
                           })()})());
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })();}));
                  } catch (err) {
                    if (!err.leisureContext) {
                      err.leisureContext = Leisure.contextStack;
                    }
                    throw err;
                  } finally {
                    Leisure.contextStack = ctx
                  }};
            })()})());
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "do\n  js ['Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))']\n  stepPhysics\n  js ['Notebook.update(\"app\")']\n  runPhysics");
;
//key = AST(\e . eq (eventType e) keydown (down e) (up e))
root.defs._key = _key = Leisure.define('key', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('key', 15), ctx)
   try {
     return function(_e){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('key', 14), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('key', 10), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('key', 6), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('key', 4), oldCtx)
                           try {
                             return _eq()((function(){var $m; return (function(){
                                var ctx = Leisure.contextStack
                                return function(){var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('key', 3), oldCtx)
                                    try {
                                      return $m || ($m = ((function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('key', 3), oldCtx)
                                          try {
                                            return _eventType()(_e);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()));
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }};
                              })()})());
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()((function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('key', 5), oldCtx)
                              try {
                                return "keydown";
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }};
                        })());
                     } catch (err) {
                       if (!err.leisureContext) {
                         err.leisureContext = Leisure.contextStack;
                       }
                       throw err;
                     } finally {
                       Leisure.contextStack = ctx
                     }
                  })()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('key', 9), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('key', 9), oldCtx)
                              try {
                                return _down()(_e);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()));
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }};
                  })()})());
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('key', 13), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('key', 13), oldCtx)
                        try {
                          return _up()(_e);
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })()));
                  } catch (err) {
                    if (!err.leisureContext) {
                      err.leisureContext = Leisure.contextStack;
                    }
                    throw err;
                  } finally {
                    Leisure.contextStack = ctx
                  }};
            })()})());
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\e. eq (eventType e) 'keydown'\n  down e\n  up e");
;
//down = AST(\e . (\c . bind (js ([ Blocky.touchingGround(Blocky.block) ? _true() : _false() ])) \tg . tg (eq c LEFT_ARROW (jsPD e ([ Blocky.moveBlockBy(-50) ])) (eq c RIGHT_ARROW (jsPD e ([ Blocky.moveBlockBy(50) ])) (eq c UP_ARROW (jsPD e ([ Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100) ])) false))) false) (eventKeyCode e))
root.defs._down = _down = Leisure.define('down', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('down', 69), ctx)
   try {
     return function(_e){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('down', 68), oldCtx)
         try {
           return function(_c){return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('down', 63), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('down', 8), oldCtx)
                     try {
                       return _bind()((function(){var $m; return (function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('down', 7), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('down', 7), oldCtx)
                                    try {
                                      return _js()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('down', 6), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('down', 6), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('down', 4), oldCtx)
                                                         try {
                                                           return _$r()((function(){
                                                              var ctx = Leisure.contextStack
                                                              return function(){var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('down', 3), oldCtx)
                                                                  try {
                                                                    return "Blocky.touchingGround(Blocky.block) ? _true() : _false()";
                                                                  } catch (err) {
                                                                    if (!err.leisureContext) {
                                                                      err.leisureContext = Leisure.contextStack;
                                                                    }
                                                                    throw err;
                                                                  } finally {
                                                                    Leisure.contextStack = ctx
                                                                  }};
                                                            })());
                                                         } catch (err) {
                                                           if (!err.leisureContext) {
                                                             err.leisureContext = Leisure.contextStack;
                                                           }
                                                           throw err;
                                                         } finally {
                                                           Leisure.contextStack = ctx
                                                         }
                                                      })()(_$s);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()));
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }};
                                       })()})());
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }
                                 })()));
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }};
                        })()})());
                     } catch (err) {
                       if (!err.leisureContext) {
                         err.leisureContext = Leisure.contextStack;
                       }
                       throw err;
                     } finally {
                       Leisure.contextStack = ctx
                     }
                  })()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('down', 62), oldCtx)
                        try {
                          return $m || ($m = (function(_tg){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('down', 61), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('down', 59), oldCtx)
                                    try {
                                      return _tg()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('down', 58), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('down', 58), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('down', 24), oldCtx)
                                                         try {
                                                           return (function(){
                                                              var ctx = Leisure.contextStack
                                                              var oldCtx = ctx;
                                                                 
                                                               var ctx = Leisure.contextStack;
                                                               Leisure.contextStack = cons(funcContext('down', 14), oldCtx)
                                                               try {
                                                                 return (function(){
                                                                    var ctx = Leisure.contextStack
                                                                    var oldCtx = ctx;
                                                                       
                                                                     var ctx = Leisure.contextStack;
                                                                     Leisure.contextStack = cons(funcContext('down', 12), oldCtx)
                                                                     try {
                                                                       return _eq()(_c);
                                                                     } catch (err) {
                                                                       if (!err.leisureContext) {
                                                                         err.leisureContext = Leisure.contextStack;
                                                                       }
                                                                       throw err;
                                                                     } finally {
                                                                       Leisure.contextStack = ctx
                                                                     }
                                                                  })()(_LEFT_ARROW);
                                                               } catch (err) {
                                                                 if (!err.leisureContext) {
                                                                   err.leisureContext = Leisure.contextStack;
                                                                 }
                                                                 throw err;
                                                               } finally {
                                                                 Leisure.contextStack = ctx
                                                               }
                                                            })()((function(){var $m; return (function(){
                                                              var ctx = Leisure.contextStack
                                                              return function(){var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('down', 23), oldCtx)
                                                                  try {
                                                                    return $m || ($m = ((function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('down', 23), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('down', 17), oldCtx)
                                                                              try {
                                                                                return _jsPD()(_e);
                                                                              } catch (err) {
                                                                                if (!err.leisureContext) {
                                                                                  err.leisureContext = Leisure.contextStack;
                                                                                }
                                                                                throw err;
                                                                              } finally {
                                                                                Leisure.contextStack = ctx
                                                                              }
                                                                           })()((function(){var $m; return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             return function(){var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('down', 22), oldCtx)
                                                                                 try {
                                                                                   return $m || ($m = ((function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('down', 22), oldCtx)
                                                                                       try {
                                                                                         return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('down', 20), oldCtx)
                                                                                             try {
                                                                                               return _$r()((function(){
                                                                                                  var ctx = Leisure.contextStack
                                                                                                  return function(){var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('down', 19), oldCtx)
                                                                                                      try {
                                                                                                        return "Blocky.moveBlockBy(-50)";
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }};
                                                                                                })());
                                                                                             } catch (err) {
                                                                                               if (!err.leisureContext) {
                                                                                                 err.leisureContext = Leisure.contextStack;
                                                                                               }
                                                                                               throw err;
                                                                                             } finally {
                                                                                               Leisure.contextStack = ctx
                                                                                             }
                                                                                          })()(_$s);
                                                                                       } catch (err) {
                                                                                         if (!err.leisureContext) {
                                                                                           err.leisureContext = Leisure.contextStack;
                                                                                         }
                                                                                         throw err;
                                                                                       } finally {
                                                                                         Leisure.contextStack = ctx
                                                                                       }
                                                                                    })()));
                                                                                 } catch (err) {
                                                                                   if (!err.leisureContext) {
                                                                                     err.leisureContext = Leisure.contextStack;
                                                                                   }
                                                                                   throw err;
                                                                                 } finally {
                                                                                   Leisure.contextStack = ctx
                                                                                 }};
                                                                           })()})());
                                                                        } catch (err) {
                                                                          if (!err.leisureContext) {
                                                                            err.leisureContext = Leisure.contextStack;
                                                                          }
                                                                          throw err;
                                                                        } finally {
                                                                          Leisure.contextStack = ctx
                                                                        }
                                                                     })()));
                                                                  } catch (err) {
                                                                    if (!err.leisureContext) {
                                                                      err.leisureContext = Leisure.contextStack;
                                                                    }
                                                                    throw err;
                                                                  } finally {
                                                                    Leisure.contextStack = ctx
                                                                  }};
                                                            })()})());
                                                         } catch (err) {
                                                           if (!err.leisureContext) {
                                                             err.leisureContext = Leisure.contextStack;
                                                           }
                                                           throw err;
                                                         } finally {
                                                           Leisure.contextStack = ctx
                                                         }
                                                      })()((function(){var $m; return (function(){
                                                        var ctx = Leisure.contextStack
                                                        return function(){var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('down', 57), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('down', 57), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('down', 39), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('down', 29), oldCtx)
                                                                              try {
                                                                                return (function(){
                                                                                   var ctx = Leisure.contextStack
                                                                                   var oldCtx = ctx;
                                                                                      
                                                                                    var ctx = Leisure.contextStack;
                                                                                    Leisure.contextStack = cons(funcContext('down', 27), oldCtx)
                                                                                    try {
                                                                                      return _eq()(_c);
                                                                                    } catch (err) {
                                                                                      if (!err.leisureContext) {
                                                                                        err.leisureContext = Leisure.contextStack;
                                                                                      }
                                                                                      throw err;
                                                                                    } finally {
                                                                                      Leisure.contextStack = ctx
                                                                                    }
                                                                                 })()(_RIGHT_ARROW);
                                                                              } catch (err) {
                                                                                if (!err.leisureContext) {
                                                                                  err.leisureContext = Leisure.contextStack;
                                                                                }
                                                                                throw err;
                                                                              } finally {
                                                                                Leisure.contextStack = ctx
                                                                              }
                                                                           })()((function(){var $m; return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             return function(){var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('down', 38), oldCtx)
                                                                                 try {
                                                                                   return $m || ($m = ((function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('down', 38), oldCtx)
                                                                                       try {
                                                                                         return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('down', 32), oldCtx)
                                                                                             try {
                                                                                               return _jsPD()(_e);
                                                                                             } catch (err) {
                                                                                               if (!err.leisureContext) {
                                                                                                 err.leisureContext = Leisure.contextStack;
                                                                                               }
                                                                                               throw err;
                                                                                             } finally {
                                                                                               Leisure.contextStack = ctx
                                                                                             }
                                                                                          })()((function(){var $m; return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            return function(){var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('down', 37), oldCtx)
                                                                                                try {
                                                                                                  return $m || ($m = ((function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('down', 37), oldCtx)
                                                                                                      try {
                                                                                                        return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           var oldCtx = ctx;
                                                                                                              
                                                                                                            var ctx = Leisure.contextStack;
                                                                                                            Leisure.contextStack = cons(funcContext('down', 35), oldCtx)
                                                                                                            try {
                                                                                                              return _$r()((function(){
                                                                                                                 var ctx = Leisure.contextStack
                                                                                                                 return function(){var oldCtx = ctx;
                                                                                                                       
                                                                                                                     var ctx = Leisure.contextStack;
                                                                                                                     Leisure.contextStack = cons(funcContext('down', 34), oldCtx)
                                                                                                                     try {
                                                                                                                       return "Blocky.moveBlockBy(50)";
                                                                                                                     } catch (err) {
                                                                                                                       if (!err.leisureContext) {
                                                                                                                         err.leisureContext = Leisure.contextStack;
                                                                                                                       }
                                                                                                                       throw err;
                                                                                                                     } finally {
                                                                                                                       Leisure.contextStack = ctx
                                                                                                                     }};
                                                                                                               })());
                                                                                                            } catch (err) {
                                                                                                              if (!err.leisureContext) {
                                                                                                                err.leisureContext = Leisure.contextStack;
                                                                                                              }
                                                                                                              throw err;
                                                                                                            } finally {
                                                                                                              Leisure.contextStack = ctx
                                                                                                            }
                                                                                                         })()(_$s);
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }
                                                                                                   })()));
                                                                                                } catch (err) {
                                                                                                  if (!err.leisureContext) {
                                                                                                    err.leisureContext = Leisure.contextStack;
                                                                                                  }
                                                                                                  throw err;
                                                                                                } finally {
                                                                                                  Leisure.contextStack = ctx
                                                                                                }};
                                                                                          })()})());
                                                                                       } catch (err) {
                                                                                         if (!err.leisureContext) {
                                                                                           err.leisureContext = Leisure.contextStack;
                                                                                         }
                                                                                         throw err;
                                                                                       } finally {
                                                                                         Leisure.contextStack = ctx
                                                                                       }
                                                                                    })()));
                                                                                 } catch (err) {
                                                                                   if (!err.leisureContext) {
                                                                                     err.leisureContext = Leisure.contextStack;
                                                                                   }
                                                                                   throw err;
                                                                                 } finally {
                                                                                   Leisure.contextStack = ctx
                                                                                 }};
                                                                           })()})());
                                                                        } catch (err) {
                                                                          if (!err.leisureContext) {
                                                                            err.leisureContext = Leisure.contextStack;
                                                                          }
                                                                          throw err;
                                                                        } finally {
                                                                          Leisure.contextStack = ctx
                                                                        }
                                                                     })()((function(){var $m; return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       return function(){var oldCtx = ctx;
                                                                             
                                                                           var ctx = Leisure.contextStack;
                                                                           Leisure.contextStack = cons(funcContext('down', 56), oldCtx)
                                                                           try {
                                                                             return $m || ($m = ((function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('down', 56), oldCtx)
                                                                                 try {
                                                                                   return (function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('down', 54), oldCtx)
                                                                                       try {
                                                                                         return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('down', 44), oldCtx)
                                                                                             try {
                                                                                               return (function(){
                                                                                                  var ctx = Leisure.contextStack
                                                                                                  var oldCtx = ctx;
                                                                                                     
                                                                                                   var ctx = Leisure.contextStack;
                                                                                                   Leisure.contextStack = cons(funcContext('down', 42), oldCtx)
                                                                                                   try {
                                                                                                     return _eq()(_c);
                                                                                                   } catch (err) {
                                                                                                     if (!err.leisureContext) {
                                                                                                       err.leisureContext = Leisure.contextStack;
                                                                                                     }
                                                                                                     throw err;
                                                                                                   } finally {
                                                                                                     Leisure.contextStack = ctx
                                                                                                   }
                                                                                                })()(_UP_ARROW);
                                                                                             } catch (err) {
                                                                                               if (!err.leisureContext) {
                                                                                                 err.leisureContext = Leisure.contextStack;
                                                                                               }
                                                                                               throw err;
                                                                                             } finally {
                                                                                               Leisure.contextStack = ctx
                                                                                             }
                                                                                          })()((function(){var $m; return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            return function(){var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('down', 53), oldCtx)
                                                                                                try {
                                                                                                  return $m || ($m = ((function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('down', 53), oldCtx)
                                                                                                      try {
                                                                                                        return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           var oldCtx = ctx;
                                                                                                              
                                                                                                            var ctx = Leisure.contextStack;
                                                                                                            Leisure.contextStack = cons(funcContext('down', 47), oldCtx)
                                                                                                            try {
                                                                                                              return _jsPD()(_e);
                                                                                                            } catch (err) {
                                                                                                              if (!err.leisureContext) {
                                                                                                                err.leisureContext = Leisure.contextStack;
                                                                                                              }
                                                                                                              throw err;
                                                                                                            } finally {
                                                                                                              Leisure.contextStack = ctx
                                                                                                            }
                                                                                                         })()((function(){var $m; return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           return function(){var oldCtx = ctx;
                                                                                                                 
                                                                                                               var ctx = Leisure.contextStack;
                                                                                                               Leisure.contextStack = cons(funcContext('down', 52), oldCtx)
                                                                                                               try {
                                                                                                                 return $m || ($m = ((function(){
                                                                                                                    var ctx = Leisure.contextStack
                                                                                                                    var oldCtx = ctx;
                                                                                                                       
                                                                                                                     var ctx = Leisure.contextStack;
                                                                                                                     Leisure.contextStack = cons(funcContext('down', 52), oldCtx)
                                                                                                                     try {
                                                                                                                       return (function(){
                                                                                                                          var ctx = Leisure.contextStack
                                                                                                                          var oldCtx = ctx;
                                                                                                                             
                                                                                                                           var ctx = Leisure.contextStack;
                                                                                                                           Leisure.contextStack = cons(funcContext('down', 50), oldCtx)
                                                                                                                           try {
                                                                                                                             return _$r()((function(){
                                                                                                                                var ctx = Leisure.contextStack
                                                                                                                                return function(){var oldCtx = ctx;
                                                                                                                                      
                                                                                                                                    var ctx = Leisure.contextStack;
                                                                                                                                    Leisure.contextStack = cons(funcContext('down', 49), oldCtx)
                                                                                                                                    try {
                                                                                                                                      return "Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)";
                                                                                                                                    } catch (err) {
                                                                                                                                      if (!err.leisureContext) {
                                                                                                                                        err.leisureContext = Leisure.contextStack;
                                                                                                                                      }
                                                                                                                                      throw err;
                                                                                                                                    } finally {
                                                                                                                                      Leisure.contextStack = ctx
                                                                                                                                    }};
                                                                                                                              })());
                                                                                                                           } catch (err) {
                                                                                                                             if (!err.leisureContext) {
                                                                                                                               err.leisureContext = Leisure.contextStack;
                                                                                                                             }
                                                                                                                             throw err;
                                                                                                                           } finally {
                                                                                                                             Leisure.contextStack = ctx
                                                                                                                           }
                                                                                                                        })()(_$s);
                                                                                                                     } catch (err) {
                                                                                                                       if (!err.leisureContext) {
                                                                                                                         err.leisureContext = Leisure.contextStack;
                                                                                                                       }
                                                                                                                       throw err;
                                                                                                                     } finally {
                                                                                                                       Leisure.contextStack = ctx
                                                                                                                     }
                                                                                                                  })()));
                                                                                                               } catch (err) {
                                                                                                                 if (!err.leisureContext) {
                                                                                                                   err.leisureContext = Leisure.contextStack;
                                                                                                                 }
                                                                                                                 throw err;
                                                                                                               } finally {
                                                                                                                 Leisure.contextStack = ctx
                                                                                                               }};
                                                                                                         })()})());
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }
                                                                                                   })()));
                                                                                                } catch (err) {
                                                                                                  if (!err.leisureContext) {
                                                                                                    err.leisureContext = Leisure.contextStack;
                                                                                                  }
                                                                                                  throw err;
                                                                                                } finally {
                                                                                                  Leisure.contextStack = ctx
                                                                                                }};
                                                                                          })()})());
                                                                                       } catch (err) {
                                                                                         if (!err.leisureContext) {
                                                                                           err.leisureContext = Leisure.contextStack;
                                                                                         }
                                                                                         throw err;
                                                                                       } finally {
                                                                                         Leisure.contextStack = ctx
                                                                                       }
                                                                                    })()(_false);
                                                                                 } catch (err) {
                                                                                   if (!err.leisureContext) {
                                                                                     err.leisureContext = Leisure.contextStack;
                                                                                   }
                                                                                   throw err;
                                                                                 } finally {
                                                                                   Leisure.contextStack = ctx
                                                                                 }
                                                                              })()));
                                                                           } catch (err) {
                                                                             if (!err.leisureContext) {
                                                                               err.leisureContext = Leisure.contextStack;
                                                                             }
                                                                             throw err;
                                                                           } finally {
                                                                             Leisure.contextStack = ctx
                                                                           }};
                                                                     })()})());
                                                                  } catch (err) {
                                                                    if (!err.leisureContext) {
                                                                      err.leisureContext = Leisure.contextStack;
                                                                    }
                                                                    throw err;
                                                                  } finally {
                                                                    Leisure.contextStack = ctx
                                                                  }
                                                               })()));
                                                            } catch (err) {
                                                              if (!err.leisureContext) {
                                                                err.leisureContext = Leisure.contextStack;
                                                              }
                                                              throw err;
                                                            } finally {
                                                              Leisure.contextStack = ctx
                                                            }};
                                                      })()})());
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()));
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }};
                                       })()})());
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }
                                 })()(_false);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })();}));
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }};
                  })()})());
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })();}((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('down', 67), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('down', 67), oldCtx)
                        try {
                          return _eventKeyCode()(_e);
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })()));
                  } catch (err) {
                    if (!err.leisureContext) {
                      err.leisureContext = Leisure.contextStack;
                    }
                    throw err;
                  } finally {
                    Leisure.contextStack = ctx
                  }};
            })()})());
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\e. do\n  c = eventKeyCode e\n  tg <- js ['Blocky.touchingGround(Blocky.block) ? _true() : _false()']\n  tg\n    eq c LEFT_ARROW\n      jsPD e ['Blocky.moveBlockBy(-50)']\n      eq c RIGHT_ARROW\n        jsPD e ['Blocky.moveBlockBy(50)']\n        eq c UP_ARROW\n          jsPD e ['Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)']\n          false\n    false");
;
//up = AST(\e . false)
root.defs._up = _up = Leisure.define('up', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('up', 1), ctx)
   try {
     return function(_e){return _false();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\e. false");
;
//jsPD = AST(\e jsCode . bind (eventPreventDefault e) \_ . js jsCode)
root.defs._jsPD = _jsPD = Leisure.define('jsPD', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('jsPD', 11), ctx)
   try {
     return function(_e){return function(_jsCode){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('jsPD', 9), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('jsPD', 4), oldCtx)
               try {
                 return _bind()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('jsPD', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('jsPD', 3), oldCtx)
                              try {
                                return _eventPreventDefault()(_e);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()));
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }};
                  })()})());
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('jsPD', 8), oldCtx)
                  try {
                    return $m || ($m = (function(__){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('jsPD', 7), oldCtx)
                        try {
                          return _js()(_jsCode);
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })();}));
                  } catch (err) {
                    if (!err.leisureContext) {
                      err.leisureContext = Leisure.contextStack;
                    }
                    throw err;
                  } finally {
                    Leisure.contextStack = ctx
                  }};
            })()})());
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\e. \\jsCode. do\n  eventPreventDefault e\n  js jsCode");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)