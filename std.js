var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
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
var _id, _flip, _true, _false, _and, _or, _not, _neq, _left, _right, _some, _some2, _none, _cons, _nil, _null$e, _append, _compose, _iszero, _positive, _length, _$_$_, _$o$o, _even$e, _odd$e, _max, _min, _head, _tail, _reverse, _subreverse, _addstr, _if, _at, _take, _takeWhile, _drop, _dropWhile, _series, _from, _fromBy, _fromTo, _fromToBy, _any, _all, _index_combine, _indexof, _position, _find, _find$_if, _find$_if$_opt, _count, _count$_if, _count$_if$_not, _remove, _remove$_if, _remove$_if$_not, _map, _reduce, _foldr, _foldr1, _foldl, _foldl1, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _do, _m_subdo, _let, _m_sublet, _m_extractVar, _m_varFromTuple, _html;
//id = AST(\x . x)
root.defs._id = _id = Leisure.define('id', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('id', 1), ctx)
   try {
     return function(_x){return _x();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\x. x");
;
//flip = AST(\f a b . f b a)
root.defs._flip = _flip = Leisure.define('flip', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('flip', 7), ctx)
   try {
     return Leisure.setDataType(function(_f){return Leisure.setType(function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('flip', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('flip', 2), oldCtx)
               try {
                 return _f()(_b);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_a);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};}, 'flip');}, 'flip');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\f. \\a b . f b a");
;
//true = AST(\a b . a)
root.defs._true = _true = Leisure.define('true', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('true', 2), ctx)
   try {
     return Leisure.setType(function(_a){return function(_b){return _a();};}, 'true');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\a b . a");
;
//false = AST(\a b . b)
root.defs._false = _false = Leisure.define('false', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('false', 2), ctx)
   try {
     return Leisure.setType(function(_a){return function(_b){return _b();};}, 'false');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\a b . b");
;
//and = AST(\a b . a b false)
root.defs._and = _and = Leisure.define('and', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('and', 6), ctx)
   try {
     return function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('and', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('and', 2), oldCtx)
               try {
                 return _a()(_b);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\b. a b false");
;
//or = AST(\a . a true)
root.defs._or = _or = Leisure.define('or', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('or', 3), ctx)
   try {
     return function(_a){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('or', 2), oldCtx)
         try {
           return _a()(_true);
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
})(), 1, "\\a. a true");
;
//not = AST(\a . a false true)
root.defs._not = _not = Leisure.define('not', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('not', 5), ctx)
   try {
     return function(_a){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('not', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('not', 2), oldCtx)
               try {
                 return _a()(_false);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_true);
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
})(), 1, "\\a. a false true");
;
//neq = AST(\a b . not (eq a b))
root.defs._neq = _neq = Leisure.define('neq', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('neq', 8), ctx)
   try {
     return function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('neq', 6), oldCtx)
         try {
           return _not()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('neq', 5), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('neq', 5), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('neq', 3), oldCtx)
                              try {
                                return _eq()(_a);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_b);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\b. not (eq a b)");
;
//left = AST(\v l r . l v)
root.defs._left = _left = Leisure.define('left', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('left', 5), ctx)
   try {
     return Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('left', 2), oldCtx)
         try {
           return _l()(_v);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};}, 'left');}, 'left');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\v. \\l r . l v");
;
//right = AST(\v l r . r v)
root.defs._right = _right = Leisure.define('right', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('right', 5), ctx)
   try {
     return Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('right', 2), oldCtx)
         try {
           return _r()(_v);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};}, 'right');}, 'right');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\v. \\l r . r v");
;
//some = AST(\x yes no . yes x)
root.defs._some = _some = Leisure.define('some', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('some', 5), ctx)
   try {
     return Leisure.setDataType(function(_x){return Leisure.setType(function(_yes){return function(_no){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('some', 2), oldCtx)
         try {
           return _yes()(_x);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};}, 'some');}, 'some');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\x. \\yes no . yes x");
;
//some2 = AST(\a b yes no . yes a b)
root.defs._some2 = _some2 = Leisure.define('some2', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('some2', 8), ctx)
   try {
     return Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_yes){return function(_no){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('some2', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('some2', 2), oldCtx)
               try {
                 return _yes()(_a);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_b);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};}, 'some2');};}, 'some2');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\b. \\yes no . yes a b");
;
//none = AST(\yes no . no)
root.defs._none = _none = Leisure.define('none', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('none', 2), ctx)
   try {
     return Leisure.setType(function(_yes){return function(_no){return _no();};}, 'none');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\yes no . no");
;
//cons = AST(\a b f . f a b)
root.defs._cons = _cons = Leisure.define('cons', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('cons', 7), ctx)
   try {
     return Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_f){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('cons', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('cons', 2), oldCtx)
               try {
                 return _f()(_a);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_b);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();}, 'cons');};}, 'cons');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\b.\n  \\f . f\n    a\n    b");
;
//nil = AST(\a b . b)
root.defs._nil = _nil = Leisure.define('nil', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('nil', 2), ctx)
   try {
     return Leisure.setType(function(_a){return function(_b){return _b();};}, 'nil');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\a b . b");
;
//null? = AST(eq nil)
root.defs._null$e = _null$e = Leisure.define('null?', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('null?', 2), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('null?', 2), ctx)
         try {
           return _eq()(_nil);
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
})(), 0, "eq nil");
;
//append = AST(\l1 l2 . l1 \h t D . cons h (append t l2) l2)
root.defs._append = _append = Leisure.define('append', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('append', 17), ctx)
   try {
     return function(_l1){return function(_l2){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('append', 15), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('append', 13), oldCtx)
               try {
                 return _l1()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('append', 12), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('append', 9), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('append', 3), oldCtx)
                                    try {
                                      return _cons()(_h);
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
                                       Leisure.contextStack = cons(funcContext('append', 8), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('append', 8), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('append', 6), oldCtx)
                                                   try {
                                                     return _append()(_t);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_l2);
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
                           })();};};}));
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
            })()(_l2);
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
})(), 2, "\\l1. \\l2. l1 (\\h t D . cons h (append t l2)) l2");
;
//compose = AST(\f g x . f (g x))
root.defs._compose = _compose = Leisure.define('compose', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('compose', 7), ctx)
   try {
     return Leisure.setDataType(function(_f){return function(_g){return Leisure.setType(function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('compose', 4), oldCtx)
         try {
           return _f()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('compose', 3), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('compose', 3), oldCtx)
                        try {
                          return _g()(_x);
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
      })();}, 'compose');};}, 'compose');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\f. \\g. \\x . f ( g x)");
;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = Leisure.define('iszero', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('iszero', 2), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('iszero', 2), ctx)
         try {
           return _eq()((function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('iszero', 1), oldCtx)
                  try {
                    return 0;
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
      })();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "eq 0");
;
//positive = AST(< 0)
root.defs._positive = _positive = Leisure.define('positive', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('positive', 2), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('positive', 2), ctx)
         try {
           return _$y()((function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('positive', 1), oldCtx)
                  try {
                    return 0;
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
      })();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "< 0");
;
//length = AST(\l . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = Leisure.define('length', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('length', 15), ctx)
   try {
     return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('length', 14), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('length', 6), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('length', 4), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('length', 2), oldCtx)
                           try {
                             return _eq()(_l);
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()(_nil);
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
                        Leisure.contextStack = cons(funcContext('length', 5), oldCtx)
                        try {
                          return 0;
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
                  Leisure.contextStack = cons(funcContext('length', 13), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('length', 13), oldCtx)
                        try {
                          return _$o$o()((function(){var $m; return (function(){
                             var ctx = Leisure.contextStack
                             return function(){var oldCtx = ctx;
                                   
                                 var ctx = Leisure.contextStack;
                                 Leisure.contextStack = cons(funcContext('length', 12), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('length', 12), oldCtx)
                                       try {
                                         return _length()((function(){var $m; return (function(){
                                            var ctx = Leisure.contextStack
                                            return function(){var oldCtx = ctx;
                                                  
                                                var ctx = Leisure.contextStack;
                                                Leisure.contextStack = cons(funcContext('length', 11), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('length', 11), oldCtx)
                                                      try {
                                                        return _tail()(_l);
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
      })();};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\l. (eq l nil) 0 (++ (length (tail l) ) )");
;
//-- = AST(flip - 1)
root.defs._$_$_ = _$_$_ = Leisure.define('--', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('--', 4), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('--', 4), ctx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('--', 2), oldCtx)
               try {
                 return _flip()(_$_);
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
                  Leisure.contextStack = cons(funcContext('--', 3), oldCtx)
                  try {
                    return 1;
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
      })();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "(flip -) 1");
;
//++ = AST(+ 1)
root.defs._$o$o = _$o$o = Leisure.define('++', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('++', 2), ctx)
   try {
     return (function(){
        var ctx = Leisure.contextStack
        
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('++', 2), ctx)
         try {
           return _$o()((function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('++', 1), oldCtx)
                  try {
                    return 1;
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
      })();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "+ 1");
;
//even? = AST(\x . iszero (% x 2))
root.defs._even$e = _even$e = Leisure.define('even?', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('even?', 7), ctx)
   try {
     return function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('even?', 6), oldCtx)
         try {
           return _iszero()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('even?', 5), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('even?', 5), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('even?', 3), oldCtx)
                              try {
                                return _$A()(_x);
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
                                 Leisure.contextStack = cons(funcContext('even?', 4), oldCtx)
                                 try {
                                   return 2;
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
})(), 1, "\\x. iszero (% x 2)");
;
//odd? = AST(\x . eq 1 (% x 2))
root.defs._odd$e = _odd$e = Leisure.define('odd?', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('odd?', 9), ctx)
   try {
     return function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('odd?', 8), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('odd?', 2), oldCtx)
               try {
                 return _eq()((function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('odd?', 1), oldCtx)
                        try {
                          return 1;
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
                  Leisure.contextStack = cons(funcContext('odd?', 7), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('odd?', 7), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('odd?', 5), oldCtx)
                              try {
                                return _$A()(_x);
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
                                 Leisure.contextStack = cons(funcContext('odd?', 6), oldCtx)
                                 try {
                                   return 2;
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
})(), 1, "\\x. eq 1 (% x 2)");
;
//max = AST(\a b . gt a b a b)
root.defs._max = _max = Leisure.define('max', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('max', 10), ctx)
   try {
     return function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('max', 8), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('max', 6), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('max', 4), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('max', 2), oldCtx)
                           try {
                             return _gt()(_a);
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()(_b);
                     } catch (err) {
                       if (!err.leisureContext) {
                         err.leisureContext = Leisure.contextStack;
                       }
                       throw err;
                     } finally {
                       Leisure.contextStack = ctx
                     }
                  })()(_a);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_b);
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
})(), 2, "\\a. \\b. (gt a b) a b");
;
//min = AST(\a b . lt a b a b)
root.defs._min = _min = Leisure.define('min', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('min', 10), ctx)
   try {
     return function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('min', 8), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('min', 6), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('min', 4), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('min', 2), oldCtx)
                           try {
                             return _lt()(_a);
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()(_b);
                     } catch (err) {
                       if (!err.leisureContext) {
                         err.leisureContext = Leisure.contextStack;
                       }
                       throw err;
                     } finally {
                       Leisure.contextStack = ctx
                     }
                  })()(_a);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_b);
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
})(), 2, "\\a. \\b. (lt a b) a b");
;
//head = AST(\l . l \h t . h)
root.defs._head = _head = Leisure.define('head', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('head', 5), ctx)
   try {
     return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('head', 4), oldCtx)
         try {
           return _l()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('head', 3), oldCtx)
                  try {
                    return $m || ($m = (function(_h){return function(_t){return _h();};}));
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
})(), 1, "\\l. l \\h t . h");
;
//tail = AST(\l . l \h t . t)
root.defs._tail = _tail = Leisure.define('tail', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('tail', 5), ctx)
   try {
     return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('tail', 4), oldCtx)
         try {
           return _l()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('tail', 3), oldCtx)
                  try {
                    return $m || ($m = (function(_h){return function(_t){return _t();};}));
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
})(), 1, "\\l. l \\h t . t");
;
//reverse = AST(\l . subreverse l nil)
root.defs._reverse = _reverse = Leisure.define('reverse', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('reverse', 5), ctx)
   try {
     return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('reverse', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('reverse', 2), oldCtx)
               try {
                 return _subreverse()(_l);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_nil);
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
})(), 1, "\\l. subreverse l nil");
;
//subreverse = AST(\l result . l \h t D . subreverse t (cons h result) result)
root.defs._subreverse = _subreverse = Leisure.define('subreverse', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('subreverse', 17), ctx)
   try {
     return function(_l){return function(_result){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('subreverse', 15), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('subreverse', 13), oldCtx)
               try {
                 return _l()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('subreverse', 12), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('subreverse', 9), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('subreverse', 3), oldCtx)
                                    try {
                                      return _subreverse()(_t);
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
                                       Leisure.contextStack = cons(funcContext('subreverse', 8), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('subreverse', 8), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('subreverse', 6), oldCtx)
                                                   try {
                                                     return _cons()(_h);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_result);
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
                           })();};};}));
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
            })()(_result);
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
})(), 2, "\\l. \\result. l (\\h t D . subreverse t (cons h result)) result");
;
//addstr = AST(\a b . concat ([ a , b ]))
root.defs._addstr = _addstr = Leisure.define('addstr', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('addstr', 12), ctx)
   try {
     return function(_a){return function(_b){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('addstr', 10), oldCtx)
         try {
           return _concat()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('addstr', 9), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('addstr', 9), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('addstr', 7), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('addstr', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('addstr', 3), oldCtx)
                                          try {
                                            return _$r()(_a);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_$b);
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }
                                 })()(_b);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\b. concat [a, b]");
;
//if = AST(id)
root.defs._if = _if = Leisure.define('if', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('if', 0), ctx)
   try {
     return _id();
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "id");
;
//at = AST(\l x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = Leisure.define('at', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('at', 18), ctx)
   try {
     return function(_l){return function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('at', 16), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('at', 6), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('at', 2), oldCtx)
                     try {
                       return _iszero()(_x);
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
                        Leisure.contextStack = cons(funcContext('at', 5), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('at', 5), oldCtx)
                              try {
                                return _head()(_l);
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
                  Leisure.contextStack = cons(funcContext('at', 15), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('at', 15), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('at', 11), oldCtx)
                              try {
                                return _at()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('at', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('at', 10), oldCtx)
                                             try {
                                               return _tail()(_l);
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
                                 Leisure.contextStack = cons(funcContext('at', 14), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('at', 14), oldCtx)
                                       try {
                                         return _$_$_()(_x);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\l. \\x. (iszero (x)) (head l) (at (tail l) (-- (x) ) )");
;
//take = AST(\n list . positive n (list \h t D . cons h (take (-- n) t) nil) nil)
root.defs._take = _take = Leisure.define('take', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('take', 25), ctx)
   try {
     return function(_n){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('take', 23), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('take', 21), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('take', 2), oldCtx)
                     try {
                       return _positive()(_n);
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
                        Leisure.contextStack = cons(funcContext('take', 20), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('take', 20), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('take', 18), oldCtx)
                                    try {
                                      return _list()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('take', 17), oldCtx)
                                             try {
                                               return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('take', 14), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('take', 6), oldCtx)
                                                         try {
                                                           return _cons()(_h);
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
                                                            Leisure.contextStack = cons(funcContext('take', 13), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('take', 13), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('take', 11), oldCtx)
                                                                        try {
                                                                          return _take()((function(){var $m; return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             return function(){var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('take', 10), oldCtx)
                                                                                 try {
                                                                                   return $m || ($m = ((function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('take', 10), oldCtx)
                                                                                       try {
                                                                                         return _$_$_()(_n);
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
                                                                     })()(_t);
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
                                                })();};};}));
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
                                 })()(_nil);
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
            })()(_nil);
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
})(), 2, "\\n. \\list. positive n\n  list\n    \\h t D . cons h (take (-- n) t)\n    nil\n  nil");
;
//takeWhile = AST(\predicate list . list \h t D . predicate h (cons h (takeWhile predicate t)) nil nil)
root.defs._takeWhile = _takeWhile = Leisure.define('takeWhile', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('takeWhile', 23), ctx)
   try {
     return function(_predicate){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('takeWhile', 21), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('takeWhile', 19), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('takeWhile', 18), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('takeWhile', 15), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('takeWhile', 13), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('takeWhile', 3), oldCtx)
                                          try {
                                            return _predicate()(_h);
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
                                             Leisure.contextStack = cons(funcContext('takeWhile', 12), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('takeWhile', 12), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('takeWhile', 6), oldCtx)
                                                         try {
                                                           return _cons()(_h);
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
                                                            Leisure.contextStack = cons(funcContext('takeWhile', 11), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('takeWhile', 11), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('takeWhile', 9), oldCtx)
                                                                        try {
                                                                          return _takeWhile()(_predicate);
                                                                        } catch (err) {
                                                                          if (!err.leisureContext) {
                                                                            err.leisureContext = Leisure.contextStack;
                                                                          }
                                                                          throw err;
                                                                        } finally {
                                                                          Leisure.contextStack = ctx
                                                                        }
                                                                     })()(_t);
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
                                 })()(_nil);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    cons h (takeWhile predicate t)\n    nil\n  nil");
;
//drop = AST(\x list . positive x (list \h t D . drop (-- x) t nil) list)
root.defs._drop = _drop = Leisure.define('drop', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('drop', 21), ctx)
   try {
     return function(_x){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('drop', 19), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('drop', 17), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('drop', 2), oldCtx)
                     try {
                       return _positive()(_x);
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
                        Leisure.contextStack = cons(funcContext('drop', 16), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('drop', 16), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('drop', 14), oldCtx)
                                    try {
                                      return _list()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('drop', 13), oldCtx)
                                             try {
                                               return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('drop', 10), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('drop', 8), oldCtx)
                                                         try {
                                                           return _drop()((function(){var $m; return (function(){
                                                              var ctx = Leisure.contextStack
                                                              return function(){var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('drop', 7), oldCtx)
                                                                  try {
                                                                    return $m || ($m = ((function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('drop', 7), oldCtx)
                                                                        try {
                                                                          return _$_$_()(_x);
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
                                                      })()(_t);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })();};};}));
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
                                 })()(_nil);
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
            })()(_list);
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
})(), 2, "\\x. \\list. positive x\n  list\n    \\h t D . drop (-- x) t\n    nil\n  list");
;
//dropWhile = AST(\predicate list . list \h t D . predicate h (dropWhile predicate t) list nil)
root.defs._dropWhile = _dropWhile = Leisure.define('dropWhile', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('dropWhile', 19), ctx)
   try {
     return function(_predicate){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('dropWhile', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('dropWhile', 15), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('dropWhile', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('dropWhile', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('dropWhile', 9), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('dropWhile', 3), oldCtx)
                                          try {
                                            return _predicate()(_h);
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
                                             Leisure.contextStack = cons(funcContext('dropWhile', 8), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('dropWhile', 8), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('dropWhile', 6), oldCtx)
                                                         try {
                                                           return _dropWhile()(_predicate);
                                                         } catch (err) {
                                                           if (!err.leisureContext) {
                                                             err.leisureContext = Leisure.contextStack;
                                                           }
                                                           throw err;
                                                         } finally {
                                                           Leisure.contextStack = ctx
                                                         }
                                                      })()(_t);
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
                                 })()(_list);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    dropWhile predicate t\n    list\n  nil");
;
//series = AST(\func n . cons n (series func (func n)))
root.defs._series = _series = Leisure.define('series', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('series', 12), ctx)
   try {
     return function(_func){return function(_n){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('series', 10), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('series', 2), oldCtx)
               try {
                 return _cons()(_n);
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
                  Leisure.contextStack = cons(funcContext('series', 9), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('series', 9), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('series', 5), oldCtx)
                              try {
                                return _series()(_func);
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
                                 Leisure.contextStack = cons(funcContext('series', 8), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('series', 8), oldCtx)
                                       try {
                                         return _func()(_n);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\func. \\n. cons n (series func (func n))");
;
//from = AST(\n . series ++ n)
root.defs._from = _from = Leisure.define('from', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('from', 5), ctx)
   try {
     return function(_n){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('from', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('from', 2), oldCtx)
               try {
                 return _series()(_$o$o);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_n);
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
})(), 1, "\\n. series ++ n");
;
//fromBy = AST(\n inc . series (+ inc) n)
root.defs._fromBy = _fromBy = Leisure.define('fromBy', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('fromBy', 8), ctx)
   try {
     return function(_n){return function(_inc){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('fromBy', 6), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('fromBy', 4), oldCtx)
               try {
                 return _series()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('fromBy', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('fromBy', 3), oldCtx)
                              try {
                                return _$o()(_inc);
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
            })()(_n);
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
})(), 2, "\\n. \\inc. series (+ inc) n");
;
//fromTo = AST(\n m . takeWhile (> m) (from n))
root.defs._fromTo = _fromTo = Leisure.define('fromTo', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('fromTo', 10), ctx)
   try {
     return function(_n){return function(_m){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('fromTo', 8), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('fromTo', 4), oldCtx)
               try {
                 return _takeWhile()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('fromTo', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('fromTo', 3), oldCtx)
                              try {
                                return _$z()(_m);
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
                  Leisure.contextStack = cons(funcContext('fromTo', 7), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('fromTo', 7), oldCtx)
                        try {
                          return _from()(_n);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\n. \\m. takeWhile (> m) (from n)");
;
//fromToBy = AST(\n m inc . takeWhile (> m) (fromBy n inc))
root.defs._fromToBy = _fromToBy = Leisure.define('fromToBy', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('fromToBy', 13), ctx)
   try {
     return function(_n){return function(_m){return function(_inc){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('fromToBy', 10), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('fromToBy', 4), oldCtx)
               try {
                 return _takeWhile()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('fromToBy', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('fromToBy', 3), oldCtx)
                              try {
                                return _$z()(_m);
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
                  Leisure.contextStack = cons(funcContext('fromToBy', 9), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('fromToBy', 9), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('fromToBy', 7), oldCtx)
                              try {
                                return _fromBy()(_n);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_inc);
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
      })();};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\n. \\m. \\inc. takeWhile (> m) (fromBy n inc)");
;
//any = AST(\f l . l \h t D . or (f h) (any f t) false)
root.defs._any = _any = Leisure.define('any', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('any', 19), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('any', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('any', 15), oldCtx)
               try {
                 return _l()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('any', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('any', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('any', 5), oldCtx)
                                    try {
                                      return _or()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('any', 4), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('any', 4), oldCtx)
                                                   try {
                                                     return _f()(_h);
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
                                       Leisure.contextStack = cons(funcContext('any', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('any', 10), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('any', 8), oldCtx)
                                                   try {
                                                     return _any()(_f);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\f. \\l. l\n  \\h t D . or\n    f h\n    any f t\n  false");
;
//all = AST(\f l . l \h t D . and (f h) (all f t) true)
root.defs._all = _all = Leisure.define('all', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('all', 19), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('all', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('all', 15), oldCtx)
               try {
                 return _l()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('all', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('all', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('all', 5), oldCtx)
                                    try {
                                      return _and()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('all', 4), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('all', 4), oldCtx)
                                                   try {
                                                     return _f()(_h);
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
                                       Leisure.contextStack = cons(funcContext('all', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('all', 10), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('all', 8), oldCtx)
                                                   try {
                                                     return _all()(_f);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
            })()(_true);
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
})(), 2, "\\f. \\l. l\n  \\h t D . and\n    f h\n    all f t\n  true");
;
//index_combine = AST(\x y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = Leisure.define('index_combine', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('index_combine', 22), ctx)
   try {
     return function(_x){return function(_y){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('index_combine', 20), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('index_combine', 14), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('index_combine', 12), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('index_combine', 6), oldCtx)
                           try {
                             return _or()((function(){var $m; return (function(){
                                var ctx = Leisure.contextStack
                                return function(){var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('index_combine', 5), oldCtx)
                                    try {
                                      return $m || ($m = ((function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('index_combine', 5), oldCtx)
                                          try {
                                            return (function(){
                                               var ctx = Leisure.contextStack
                                               var oldCtx = ctx;
                                                  
                                                var ctx = Leisure.contextStack;
                                                Leisure.contextStack = cons(funcContext('index_combine', 3), oldCtx)
                                                try {
                                                  return _eq()(_x);
                                                } catch (err) {
                                                  if (!err.leisureContext) {
                                                    err.leisureContext = Leisure.contextStack;
                                                  }
                                                  throw err;
                                                } finally {
                                                  Leisure.contextStack = ctx
                                                }
                                             })()(_nil);
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
                              Leisure.contextStack = cons(funcContext('index_combine', 11), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('index_combine', 11), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('index_combine', 9), oldCtx)
                                          try {
                                            return _eq()(_y);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_nil);
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
                  })()(_nil);
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
                  Leisure.contextStack = cons(funcContext('index_combine', 19), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('index_combine', 19), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('index_combine', 17), oldCtx)
                              try {
                                return _$o()(_x);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_y);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\x. \\y. (or (eq x nil) (eq y nil)) (nil) (+ x y)");
;
//indexof = AST(\l x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = Leisure.define('indexof', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('indexof', 34), ctx)
   try {
     return function(_l){return function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('indexof', 32), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('indexof', 8), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('indexof', 6), oldCtx)
                     try {
                       return _if()((function(){var $m; return (function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('indexof', 5), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('indexof', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('indexof', 3), oldCtx)
                                          try {
                                            return _eq()(_l);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_nil);
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
                  })()(_nil);
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
                  Leisure.contextStack = cons(funcContext('indexof', 31), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('indexof', 31), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('indexof', 19), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('indexof', 17), oldCtx)
                                    try {
                                      return _if()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('indexof', 16), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('indexof', 16), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('indexof', 12), oldCtx)
                                                         try {
                                                           return _eq()(_x);
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
                                                            Leisure.contextStack = cons(funcContext('indexof', 15), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('indexof', 15), oldCtx)
                                                                  try {
                                                                    return _head()(_l);
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
                                 })()((function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('indexof', 18), oldCtx)
                                       try {
                                         return 0;
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
                                 Leisure.contextStack = cons(funcContext('indexof', 30), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('indexof', 30), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('indexof', 22), oldCtx)
                                             try {
                                               return _index_combine()((function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('indexof', 21), oldCtx)
                                                      try {
                                                        return 1;
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
                                                Leisure.contextStack = cons(funcContext('indexof', 29), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('indexof', 29), oldCtx)
                                                      try {
                                                        return (function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('indexof', 27), oldCtx)
                                                            try {
                                                              return _indexof()((function(){var $m; return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 return function(){var oldCtx = ctx;
                                                                       
                                                                     var ctx = Leisure.contextStack;
                                                                     Leisure.contextStack = cons(funcContext('indexof', 26), oldCtx)
                                                                     try {
                                                                       return $m || ($m = ((function(){
                                                                          var ctx = Leisure.contextStack
                                                                          var oldCtx = ctx;
                                                                             
                                                                           var ctx = Leisure.contextStack;
                                                                           Leisure.contextStack = cons(funcContext('indexof', 26), oldCtx)
                                                                           try {
                                                                             return _tail()(_l);
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
                                                         })()(_x);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\l. \\x. if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");
;
//position = AST(\l x . indexof x l)
root.defs._position = _position = Leisure.define('position', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('position', 6), ctx)
   try {
     return function(_l){return function(_x){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('position', 4), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('position', 2), oldCtx)
               try {
                 return _indexof()(_x);
               } catch (err) {
                 if (!err.leisureContext) {
                   err.leisureContext = Leisure.contextStack;
                 }
                 throw err;
               } finally {
                 Leisure.contextStack = ctx
               }
            })()(_l);
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
})(), 2, "\\l. \\x. indexof x l");
;
//find = AST(\x l . find-if (eq x) l)
root.defs._find = _find = Leisure.define('find', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('find', 8), ctx)
   try {
     return function(_x){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('find', 6), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('find', 4), oldCtx)
               try {
                 return _find$_if()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('find', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('find', 3), oldCtx)
                              try {
                                return _eq()(_x);
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
            })()(_l);
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
})(), 2, "\\x. \\l. find-if (eq x) l");
;
//find-if = AST(\f l . l \h t D . f h h (find-if f t) nil)
root.defs._find$_if = _find$_if = Leisure.define('find-if', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('find-if', 19), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('find-if', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('find-if', 15), oldCtx)
               try {
                 return _l()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('find-if', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('find-if', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('find-if', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('find-if', 3), oldCtx)
                                          try {
                                            return _f()(_h);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_h);
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
                                       Leisure.contextStack = cons(funcContext('find-if', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('find-if', 10), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('find-if', 8), oldCtx)
                                                   try {
                                                     return _find$_if()(_f);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\f. \\l. l (\\h t D . (f h) h (find-if f t)) nil");
;
//find-if-opt = AST(\f l . l \h t D . f h (some h) (find-if-opt f t) none)
root.defs._find$_if$_opt = _find$_if$_opt = Leisure.define('find-if-opt', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('find-if-opt', 21), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('find-if-opt', 19), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('find-if-opt', 17), oldCtx)
               try {
                 return _l()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('find-if-opt', 16), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('find-if-opt', 13), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('find-if-opt', 7), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('find-if-opt', 3), oldCtx)
                                          try {
                                            return _f()(_h);
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
                                             Leisure.contextStack = cons(funcContext('find-if-opt', 6), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('find-if-opt', 6), oldCtx)
                                                   try {
                                                     return _some()(_h);
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
                                       Leisure.contextStack = cons(funcContext('find-if-opt', 12), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('find-if-opt', 12), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('find-if-opt', 10), oldCtx)
                                                   try {
                                                     return _find$_if$_opt()(_f);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
            })()(_none);
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
})(), 2, "\\f. \\l. l (\\h t D . (f h) (some h) (find-if-opt f t)) none");
;
//count = AST(\x l . count-if (eq x) l)
root.defs._count = _count = Leisure.define('count', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('count', 8), ctx)
   try {
     return function(_x){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('count', 6), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('count', 4), oldCtx)
               try {
                 return _count$_if()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('count', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('count', 3), oldCtx)
                              try {
                                return _eq()(_x);
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
            })()(_l);
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
})(), 2, "\\x. \\l. count-if (eq x) l");
;
//count-if = AST(\f l . if (eq l nil) 0 (+ (f (head l) 1 0) (count-if f (tail l))))
root.defs._count$_if = _count$_if = Leisure.define('count-if', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('count-if', 30), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('count-if', 28), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('count-if', 8), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('count-if', 6), oldCtx)
                     try {
                       return _if()((function(){var $m; return (function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('count-if', 5), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('count-if', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('count-if', 3), oldCtx)
                                          try {
                                            return _eq()(_l);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_nil);
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
                        Leisure.contextStack = cons(funcContext('count-if', 7), oldCtx)
                        try {
                          return 0;
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
                  Leisure.contextStack = cons(funcContext('count-if', 27), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('count-if', 27), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('count-if', 19), oldCtx)
                              try {
                                return _$o()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('count-if', 18), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('count-if', 18), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('count-if', 16), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('count-if', 14), oldCtx)
                                                         try {
                                                           return _f()((function(){var $m; return (function(){
                                                              var ctx = Leisure.contextStack
                                                              return function(){var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('count-if', 13), oldCtx)
                                                                  try {
                                                                    return $m || ($m = ((function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('count-if', 13), oldCtx)
                                                                        try {
                                                                          return _head()(_l);
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
                                                            Leisure.contextStack = cons(funcContext('count-if', 15), oldCtx)
                                                            try {
                                                              return 1;
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
                                                })()((function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('count-if', 17), oldCtx)
                                                      try {
                                                        return 0;
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
                                 Leisure.contextStack = cons(funcContext('count-if', 26), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('count-if', 26), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('count-if', 22), oldCtx)
                                             try {
                                               return _count$_if()(_f);
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
                                                Leisure.contextStack = cons(funcContext('count-if', 25), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('count-if', 25), oldCtx)
                                                      try {
                                                        return _tail()(_l);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\f. \\l. if (eq l nil) 0\n  + (f (head l) 1 0) (count-if f (tail l))");
;
//count-if-not = AST(\f l . count-if \x . not (f x) l)
root.defs._count$_if$_not = _count$_if$_not = Leisure.define('count-if-not', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('count-if-not', 11), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('count-if-not', 9), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('count-if-not', 7), oldCtx)
               try {
                 return _count$_if()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('count-if-not', 6), oldCtx)
                        try {
                          return $m || ($m = (function(_x){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('count-if-not', 5), oldCtx)
                              try {
                                return _not()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('count-if-not', 4), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('count-if-not', 4), oldCtx)
                                             try {
                                               return _f()(_x);
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
            })()(_l);
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
})(), 2, "\\f. \\l. count-if (\\x. not (f x)) l");
;
//remove = AST(\x l . remove-if (eq x) l)
root.defs._remove = _remove = Leisure.define('remove', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('remove', 8), ctx)
   try {
     return function(_x){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('remove', 6), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('remove', 4), oldCtx)
               try {
                 return _remove$_if()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('remove', 3), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('remove', 3), oldCtx)
                              try {
                                return _eq()(_x);
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
            })()(_l);
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
})(), 2, "\\x. \\l. remove-if (eq x) l");
;
//remove-if = AST(\f l . if (eq l nil) nil (if (f (head l)) (remove-if f (tail l)) (cons (head l) (remove-if f (tail l)))))
root.defs._remove$_if = _remove$_if = Leisure.define('remove-if', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('remove-if', 40), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('remove-if', 38), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('remove-if', 8), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('remove-if', 6), oldCtx)
                     try {
                       return _if()((function(){var $m; return (function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('remove-if', 5), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('remove-if', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('remove-if', 3), oldCtx)
                                          try {
                                            return _eq()(_l);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_nil);
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
                  })()(_nil);
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
                  Leisure.contextStack = cons(funcContext('remove-if', 37), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('remove-if', 37), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('remove-if', 23), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('remove-if', 15), oldCtx)
                                    try {
                                      return _if()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('remove-if', 14), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('remove-if', 14), oldCtx)
                                                   try {
                                                     return _f()((function(){var $m; return (function(){
                                                        var ctx = Leisure.contextStack
                                                        return function(){var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('remove-if', 13), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('remove-if', 13), oldCtx)
                                                                  try {
                                                                    return _head()(_l);
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
                                       Leisure.contextStack = cons(funcContext('remove-if', 22), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('remove-if', 22), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('remove-if', 18), oldCtx)
                                                   try {
                                                     return _remove$_if()(_f);
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
                                                      Leisure.contextStack = cons(funcContext('remove-if', 21), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('remove-if', 21), oldCtx)
                                                            try {
                                                              return _tail()(_l);
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
                                 Leisure.contextStack = cons(funcContext('remove-if', 36), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('remove-if', 36), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('remove-if', 28), oldCtx)
                                             try {
                                               return _cons()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('remove-if', 27), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('remove-if', 27), oldCtx)
                                                            try {
                                                              return _head()(_l);
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
                                                Leisure.contextStack = cons(funcContext('remove-if', 35), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('remove-if', 35), oldCtx)
                                                      try {
                                                        return (function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('remove-if', 31), oldCtx)
                                                            try {
                                                              return _remove$_if()(_f);
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
                                                               Leisure.contextStack = cons(funcContext('remove-if', 34), oldCtx)
                                                               try {
                                                                 return $m || ($m = ((function(){
                                                                    var ctx = Leisure.contextStack
                                                                    var oldCtx = ctx;
                                                                       
                                                                     var ctx = Leisure.contextStack;
                                                                     Leisure.contextStack = cons(funcContext('remove-if', 34), oldCtx)
                                                                     try {
                                                                       return _tail()(_l);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\f. \\l. if (eq l nil) nil\n  if (f (head l)) (remove-if f (tail l))\n    cons (head l) (remove-if f (tail l))");
;
//remove-if-not = AST(\f l . remove-if \x . not (f x) l)
root.defs._remove$_if$_not = _remove$_if$_not = Leisure.define('remove-if-not', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('remove-if-not', 11), ctx)
   try {
     return function(_f){return function(_l){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('remove-if-not', 9), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('remove-if-not', 7), oldCtx)
               try {
                 return _remove$_if()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('remove-if-not', 6), oldCtx)
                        try {
                          return $m || ($m = (function(_x){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('remove-if-not', 5), oldCtx)
                              try {
                                return _not()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('remove-if-not', 4), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('remove-if-not', 4), oldCtx)
                                             try {
                                               return _f()(_x);
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
            })()(_l);
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
})(), 2, "\\f. \\l. remove-if (\\x. not (f x)) l");
;
//map = AST(\func list . list \h t D . cons (func h) (map func t) nil)
root.defs._map = _map = Leisure.define('map', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('map', 19), ctx)
   try {
     return function(_func){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('map', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('map', 15), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('map', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('map', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('map', 5), oldCtx)
                                    try {
                                      return _cons()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('map', 4), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('map', 4), oldCtx)
                                                   try {
                                                     return _func()(_h);
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
                                       Leisure.contextStack = cons(funcContext('map', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('map', 10), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('map', 8), oldCtx)
                                                   try {
                                                     return _map()(_func);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\func. \\list. list (\\h t D . cons (func h) (map func t)) nil");
;
//reduce = AST(\func list . if (eq list nil) nil (if (eq 1 (length list)) (head list) (func (head list) (reduce func (tail list)))))
root.defs._reduce = _reduce = Leisure.define('reduce', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('reduce', 38), ctx)
   try {
     return function(_func){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('reduce', 36), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('reduce', 8), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('reduce', 6), oldCtx)
                     try {
                       return _if()((function(){var $m; return (function(){
                          var ctx = Leisure.contextStack
                          return function(){var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('reduce', 5), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('reduce', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('reduce', 3), oldCtx)
                                          try {
                                            return _eq()(_list);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_nil);
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
                  })()(_nil);
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
                  Leisure.contextStack = cons(funcContext('reduce', 35), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('reduce', 35), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('reduce', 21), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('reduce', 17), oldCtx)
                                    try {
                                      return _if()((function(){var $m; return (function(){
                                         var ctx = Leisure.contextStack
                                         return function(){var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('reduce', 16), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('reduce', 16), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('reduce', 12), oldCtx)
                                                         try {
                                                           return _eq()((function(){
                                                              var ctx = Leisure.contextStack
                                                              return function(){var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('reduce', 11), oldCtx)
                                                                  try {
                                                                    return 1;
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
                                                            Leisure.contextStack = cons(funcContext('reduce', 15), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('reduce', 15), oldCtx)
                                                                  try {
                                                                    return _length()(_list);
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
                                       Leisure.contextStack = cons(funcContext('reduce', 20), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('reduce', 20), oldCtx)
                                             try {
                                               return _head()(_list);
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
                                 Leisure.contextStack = cons(funcContext('reduce', 34), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('reduce', 34), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('reduce', 26), oldCtx)
                                             try {
                                               return _func()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('reduce', 25), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('reduce', 25), oldCtx)
                                                            try {
                                                              return _head()(_list);
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
                                                Leisure.contextStack = cons(funcContext('reduce', 33), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('reduce', 33), oldCtx)
                                                      try {
                                                        return (function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('reduce', 29), oldCtx)
                                                            try {
                                                              return _reduce()(_func);
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
                                                               Leisure.contextStack = cons(funcContext('reduce', 32), oldCtx)
                                                               try {
                                                                 return $m || ($m = ((function(){
                                                                    var ctx = Leisure.contextStack
                                                                    var oldCtx = ctx;
                                                                       
                                                                     var ctx = Leisure.contextStack;
                                                                     Leisure.contextStack = cons(funcContext('reduce', 32), oldCtx)
                                                                     try {
                                                                       return _tail()(_list);
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\func. \\list. if (eq list nil) nil\n  if (eq 1 (length list)) (head list)\n    func (head list) (reduce func (tail list))");
;
//foldr = AST(\func value list . list \h t D . func h (foldr func value t) value)
root.defs._foldr = _foldr = Leisure.define('foldr', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('foldr', 20), ctx)
   try {
     return function(_func){return function(_value){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('foldr', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('foldr', 15), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('foldr', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('foldr', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('foldr', 3), oldCtx)
                                    try {
                                      return _func()(_h);
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
                                       Leisure.contextStack = cons(funcContext('foldr', 10), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('foldr', 10), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('foldr', 8), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('foldr', 6), oldCtx)
                                                         try {
                                                           return _foldr()(_func);
                                                         } catch (err) {
                                                           if (!err.leisureContext) {
                                                             err.leisureContext = Leisure.contextStack;
                                                           }
                                                           throw err;
                                                         } finally {
                                                           Leisure.contextStack = ctx
                                                         }
                                                      })()(_value);
                                                   } catch (err) {
                                                     if (!err.leisureContext) {
                                                       err.leisureContext = Leisure.contextStack;
                                                     }
                                                     throw err;
                                                   } finally {
                                                     Leisure.contextStack = ctx
                                                   }
                                                })()(_t);
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
                           })();};};}));
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
            })()(_value);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\func. \\value. \\list. list (\\h t D . func h (foldr func value t)) value");
;
//foldr1 = AST(\func list . list \h t D . null? t h (func h (foldr1 func t)) nil)
root.defs._foldr1 = _foldr1 = Leisure.define('foldr1', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('foldr1', 23), ctx)
   try {
     return function(_func){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('foldr1', 21), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('foldr1', 19), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('foldr1', 18), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('foldr1', 15), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('foldr1', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('foldr1', 3), oldCtx)
                                          try {
                                            return _null$e()(_t);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_h);
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
                                       Leisure.contextStack = cons(funcContext('foldr1', 14), oldCtx)
                                       try {
                                         return $m || ($m = ((function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('foldr1', 14), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('foldr1', 8), oldCtx)
                                                   try {
                                                     return _func()(_h);
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
                                                      Leisure.contextStack = cons(funcContext('foldr1', 13), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('foldr1', 13), oldCtx)
                                                            try {
                                                              return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('foldr1', 11), oldCtx)
                                                                  try {
                                                                    return _foldr1()(_func);
                                                                  } catch (err) {
                                                                    if (!err.leisureContext) {
                                                                      err.leisureContext = Leisure.contextStack;
                                                                    }
                                                                    throw err;
                                                                  } finally {
                                                                    Leisure.contextStack = ctx
                                                                  }
                                                               })()(_t);
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
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\func. \\list. list\n  \\h t D . null? t\n     h\n     func h (foldr1 func t)\n  nil");
;
//foldl = AST(\func value list . list \h t D . foldl func (func value h) t value)
root.defs._foldl = _foldl = Leisure.define('foldl', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('foldl', 20), ctx)
   try {
     return function(_func){return function(_value){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('foldl', 17), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('foldl', 15), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('foldl', 14), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('foldl', 11), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('foldl', 9), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('foldl', 3), oldCtx)
                                          try {
                                            return _foldl()(_func);
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
                                             Leisure.contextStack = cons(funcContext('foldl', 8), oldCtx)
                                             try {
                                               return $m || ($m = ((function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('foldl', 8), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('foldl', 6), oldCtx)
                                                         try {
                                                           return _func()(_value);
                                                         } catch (err) {
                                                           if (!err.leisureContext) {
                                                             err.leisureContext = Leisure.contextStack;
                                                           }
                                                           throw err;
                                                         } finally {
                                                           Leisure.contextStack = ctx
                                                         }
                                                      })()(_h);
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
                                 })()(_t);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })();};};}));
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
            })()(_value);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\func. \\value. \\list. list (\\h t D . foldl func (func value h) t) value");
;
//foldl1 = AST(\func list . list \h t D . foldl func h t nil)
root.defs._foldl1 = _foldl1 = Leisure.define('foldl1', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('foldl1', 15), ctx)
   try {
     return function(_func){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('foldl1', 13), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('foldl1', 11), oldCtx)
               try {
                 return _list()((function(){var $m; return (function(){
                    var ctx = Leisure.contextStack
                    return function(){var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('foldl1', 10), oldCtx)
                        try {
                          return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('foldl1', 7), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('foldl1', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('foldl1', 3), oldCtx)
                                          try {
                                            return _foldl()(_func);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_h);
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }
                                 })()(_t);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })();};};}));
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
            })()(_nil);
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
})(), 2, "\\func. \\list. list (\\h t D. foldl func h t) nil");
;
//[ = AST(\item c . c \rest . cons item rest)
root.defs._$r = _$r = Leisure.define('[', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('[', 9), ctx)
   try {
     return Leisure.setType(function(_item){return function(_c){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('[', 7), oldCtx)
         try {
           return _c()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('[', 6), oldCtx)
                  try {
                    return $m || ($m = (function(_rest){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('[', 5), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('[', 3), oldCtx)
                              try {
                                return _cons()(_item);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_rest);
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
      })();};}, '[');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\item c . c \\rest . cons item rest");
root.tokenDefs.push('[', '=(]=');
;
//, = AST(\f item c . c \rest . f (cons item rest))
root.defs._$b = _$b = Leisure.define(',', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext(',', 12), ctx)
   try {
     return Leisure.setType(function(_f){return function(_item){return function(_c){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext(',', 9), oldCtx)
         try {
           return _c()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext(',', 8), oldCtx)
                  try {
                    return $m || ($m = (function(_rest){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext(',', 7), oldCtx)
                        try {
                          return _f()((function(){var $m; return (function(){
                             var ctx = Leisure.contextStack
                             return function(){var oldCtx = ctx;
                                   
                                 var ctx = Leisure.contextStack;
                                 Leisure.contextStack = cons(funcContext(',', 6), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext(',', 6), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext(',', 4), oldCtx)
                                             try {
                                               return _cons()(_item);
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }
                                          })()(_rest);
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
      })();};};}, ',');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\f item c . c \\rest . f (cons item rest)");
root.tokenDefs.push(',', '=.=');
;
//] = AST(\f . f nil)
root.defs._$s = _$s = Leisure.define(']', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext(']', 3), ctx)
   try {
     return Leisure.setType(function(_f){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext(']', 2), oldCtx)
         try {
           return _f()(_nil);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();}, ']');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\f . f nil");
root.tokenDefs.push(']', '=)=');
;
//| = AST(\f rest g . f rest)
root.defs._$q = _$q = Leisure.define('|', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('|', 5), ctx)
   try {
     return Leisure.setType(function(_f){return function(_rest){return function(_g){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('|', 2), oldCtx)
         try {
           return _f()(_rest);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();};};}, '|');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "\\f rest g . f rest");
root.tokenDefs.push('|', '=.=');
;
//dl = AST(\list . append list)
root.defs._dl = _dl = Leisure.define('dl', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('dl', 3), ctx)
   try {
     return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('dl', 2), oldCtx)
         try {
           return _append()(_list);
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
})(), 1, "\\list. append list");
;
//dlAppend = AST(\da db list . da (db list))
root.defs._dlAppend = _dlAppend = Leisure.define('dlAppend', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('dlAppend', 7), ctx)
   try {
     return function(_da){return function(_db){return function(_list){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('dlAppend', 4), oldCtx)
         try {
           return _da()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('dlAppend', 3), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('dlAppend', 3), oldCtx)
                        try {
                          return _db()(_list);
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
      })();};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\da. \\db. \\list. da (db list)");
;
//dlList = AST(\dl . dl nil)
root.defs._dlList = _dlList = Leisure.define('dlList', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('dlList', 3), ctx)
   try {
     return function(_dl){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('dlList', 2), oldCtx)
         try {
           return _dl()(_nil);
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
})(), 1, "\\dl. dl nil");
;
//identMacro = AST(\apl . apl \f a . is f ref a (apply (identMacro f) a))
root.defs._identMacro = _identMacro = Leisure.defineMacro('identMacro', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('identMacro', 19), ctx)
   try {
     return function(_apl){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('identMacro', 18), oldCtx)
         try {
           return _apl()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('identMacro', 17), oldCtx)
                  try {
                    return $m || ($m = (function(_f){return function(_a){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('identMacro', 15), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('identMacro', 7), oldCtx)
                              try {
                                return (function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('identMacro', 5), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('identMacro', 3), oldCtx)
                                          try {
                                            return _is()(_f);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_ref);
                                    } catch (err) {
                                      if (!err.leisureContext) {
                                        err.leisureContext = Leisure.contextStack;
                                      }
                                      throw err;
                                    } finally {
                                      Leisure.contextStack = ctx
                                    }
                                 })()(_a);
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
                                 Leisure.contextStack = cons(funcContext('identMacro', 14), oldCtx)
                                 try {
                                   return $m || ($m = ((function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('identMacro', 14), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('identMacro', 12), oldCtx)
                                             try {
                                               return _apply()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('identMacro', 11), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('identMacro', 11), oldCtx)
                                                            try {
                                                              return _identMacro()(_f);
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
                                          })()(_a);
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
                     })();};}));
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
})(), 1, "\\apl. apl \\f a . (is f ref) a (apply (identMacro f) a)");
root.tokenDefs.push('identMacro', '=M=');
;
//do = AST(\apl . apl \f a . m_subdo a f)
root.defs._do = _do = Leisure.defineMacro('do', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('do', 9), ctx)
   try {
     return function(_apl){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('do', 8), oldCtx)
         try {
           return _apl()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('do', 7), oldCtx)
                  try {
                    return $m || ($m = (function(_f){return function(_a){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('do', 5), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('do', 3), oldCtx)
                              try {
                                return _m_subdo()(_a);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_f);
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })();};}));
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
})(), 1, "\\apl. apl \\f a . m_subdo a f");
root.tokenDefs.push('do', '=M=');
;
//m_subdo = AST(\a f . or (is f ref) (is f lit) a (f \f2 a2 . m_subdo (m_extractVar a2 <- \v ast . apply (apply (ref bind) ast) (lambda v a) (m_extractVar a2 = \v ast . apply (lambda v a) ast (apply (apply (ref bind) a2) (lambda _ a)))) f2))
root.defs._m_subdo = _m_subdo = Leisure.define('m_subdo', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('m_subdo', 82), ctx)
   try {
     return function(_a){return function(_f){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('m_subdo', 80), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('m_subdo', 14), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('m_subdo', 12), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('m_subdo', 6), oldCtx)
                           try {
                             return _or()((function(){var $m; return (function(){
                                var ctx = Leisure.contextStack
                                return function(){var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('m_subdo', 5), oldCtx)
                                    try {
                                      return $m || ($m = ((function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('m_subdo', 5), oldCtx)
                                          try {
                                            return (function(){
                                               var ctx = Leisure.contextStack
                                               var oldCtx = ctx;
                                                  
                                                var ctx = Leisure.contextStack;
                                                Leisure.contextStack = cons(funcContext('m_subdo', 3), oldCtx)
                                                try {
                                                  return _is()(_f);
                                                } catch (err) {
                                                  if (!err.leisureContext) {
                                                    err.leisureContext = Leisure.contextStack;
                                                  }
                                                  throw err;
                                                } finally {
                                                  Leisure.contextStack = ctx
                                                }
                                             })()(_ref);
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
                              Leisure.contextStack = cons(funcContext('m_subdo', 11), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('m_subdo', 11), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('m_subdo', 9), oldCtx)
                                          try {
                                            return _is()(_f);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_lit);
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
                  })()(_a);
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
                  Leisure.contextStack = cons(funcContext('m_subdo', 79), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('m_subdo', 79), oldCtx)
                        try {
                          return _f()((function(){var $m; return (function(){
                             var ctx = Leisure.contextStack
                             return function(){var oldCtx = ctx;
                                   
                                 var ctx = Leisure.contextStack;
                                 Leisure.contextStack = cons(funcContext('m_subdo', 78), oldCtx)
                                 try {
                                   return $m || ($m = (function(_f2){return function(_a2){return (function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('m_subdo', 76), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('m_subdo', 74), oldCtx)
                                             try {
                                               return _m_subdo()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('m_subdo', 73), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('m_subdo', 73), oldCtx)
                                                            try {
                                                              return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('m_subdo', 39), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_subdo', 21), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('m_subdo', 19), oldCtx)
                                                                              try {
                                                                                return _m_extractVar()(_a2);
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
                                                                                 Leisure.contextStack = cons(funcContext('m_subdo', 20), oldCtx)
                                                                                 try {
                                                                                   return "<-";
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
                                                                           Leisure.contextStack = cons(funcContext('m_subdo', 38), oldCtx)
                                                                           try {
                                                                             return $m || ($m = (function(_v){return function(_ast){return (function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('m_subdo', 36), oldCtx)
                                                                                 try {
                                                                                   return (function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('m_subdo', 30), oldCtx)
                                                                                       try {
                                                                                         return _apply()((function(){var $m; return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            return function(){var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_subdo', 29), oldCtx)
                                                                                                try {
                                                                                                  return $m || ($m = ((function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_subdo', 29), oldCtx)
                                                                                                      try {
                                                                                                        return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           var oldCtx = ctx;
                                                                                                              
                                                                                                            var ctx = Leisure.contextStack;
                                                                                                            Leisure.contextStack = cons(funcContext('m_subdo', 27), oldCtx)
                                                                                                            try {
                                                                                                              return _apply()((function(){var $m; return (function(){
                                                                                                                 var ctx = Leisure.contextStack
                                                                                                                 return function(){var oldCtx = ctx;
                                                                                                                       
                                                                                                                     var ctx = Leisure.contextStack;
                                                                                                                     Leisure.contextStack = cons(funcContext('m_subdo', 26), oldCtx)
                                                                                                                     try {
                                                                                                                       return $m || ($m = ((function(){
                                                                                                                          var ctx = Leisure.contextStack
                                                                                                                          var oldCtx = ctx;
                                                                                                                             
                                                                                                                           var ctx = Leisure.contextStack;
                                                                                                                           Leisure.contextStack = cons(funcContext('m_subdo', 26), oldCtx)
                                                                                                                           try {
                                                                                                                             return _ref()((function(){
                                                                                                                                var ctx = Leisure.contextStack
                                                                                                                                return function(){var oldCtx = ctx;
                                                                                                                                      
                                                                                                                                    var ctx = Leisure.contextStack;
                                                                                                                                    Leisure.contextStack = cons(funcContext('m_subdo', 25), oldCtx)
                                                                                                                                    try {
                                                                                                                                      return "bind";
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
                                                                                                         })()(_ast);
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
                                                                                          Leisure.contextStack = cons(funcContext('m_subdo', 35), oldCtx)
                                                                                          try {
                                                                                            return $m || ($m = ((function(){
                                                                                               var ctx = Leisure.contextStack
                                                                                               var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_subdo', 35), oldCtx)
                                                                                                try {
                                                                                                  return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_subdo', 33), oldCtx)
                                                                                                      try {
                                                                                                        return _lambda()(_v);
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }
                                                                                                   })()(_a);
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
                                                                              })();};}));
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
                                                                     Leisure.contextStack = cons(funcContext('m_subdo', 72), oldCtx)
                                                                     try {
                                                                       return $m || ($m = ((function(){
                                                                          var ctx = Leisure.contextStack
                                                                          var oldCtx = ctx;
                                                                             
                                                                           var ctx = Leisure.contextStack;
                                                                           Leisure.contextStack = cons(funcContext('m_subdo', 72), oldCtx)
                                                                           try {
                                                                             return (function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('m_subdo', 56), oldCtx)
                                                                                 try {
                                                                                   return (function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('m_subdo', 44), oldCtx)
                                                                                       try {
                                                                                         return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('m_subdo', 42), oldCtx)
                                                                                             try {
                                                                                               return _m_extractVar()(_a2);
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
                                                                                                Leisure.contextStack = cons(funcContext('m_subdo', 43), oldCtx)
                                                                                                try {
                                                                                                  return "=";
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
                                                                                          Leisure.contextStack = cons(funcContext('m_subdo', 55), oldCtx)
                                                                                          try {
                                                                                            return $m || ($m = (function(_v){return function(_ast){return (function(){
                                                                                               var ctx = Leisure.contextStack
                                                                                               var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_subdo', 53), oldCtx)
                                                                                                try {
                                                                                                  return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_subdo', 51), oldCtx)
                                                                                                      try {
                                                                                                        return _apply()((function(){var $m; return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           return function(){var oldCtx = ctx;
                                                                                                                 
                                                                                                               var ctx = Leisure.contextStack;
                                                                                                               Leisure.contextStack = cons(funcContext('m_subdo', 50), oldCtx)
                                                                                                               try {
                                                                                                                 return $m || ($m = ((function(){
                                                                                                                    var ctx = Leisure.contextStack
                                                                                                                    var oldCtx = ctx;
                                                                                                                       
                                                                                                                     var ctx = Leisure.contextStack;
                                                                                                                     Leisure.contextStack = cons(funcContext('m_subdo', 50), oldCtx)
                                                                                                                     try {
                                                                                                                       return (function(){
                                                                                                                          var ctx = Leisure.contextStack
                                                                                                                          var oldCtx = ctx;
                                                                                                                             
                                                                                                                           var ctx = Leisure.contextStack;
                                                                                                                           Leisure.contextStack = cons(funcContext('m_subdo', 48), oldCtx)
                                                                                                                           try {
                                                                                                                             return _lambda()(_v);
                                                                                                                           } catch (err) {
                                                                                                                             if (!err.leisureContext) {
                                                                                                                               err.leisureContext = Leisure.contextStack;
                                                                                                                             }
                                                                                                                             throw err;
                                                                                                                           } finally {
                                                                                                                             Leisure.contextStack = ctx
                                                                                                                           }
                                                                                                                        })()(_a);
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
                                                                                                   })()(_ast);
                                                                                                } catch (err) {
                                                                                                  if (!err.leisureContext) {
                                                                                                    err.leisureContext = Leisure.contextStack;
                                                                                                  }
                                                                                                  throw err;
                                                                                                } finally {
                                                                                                  Leisure.contextStack = ctx
                                                                                                }
                                                                                             })();};}));
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
                                                                                    Leisure.contextStack = cons(funcContext('m_subdo', 71), oldCtx)
                                                                                    try {
                                                                                      return $m || ($m = ((function(){
                                                                                         var ctx = Leisure.contextStack
                                                                                         var oldCtx = ctx;
                                                                                            
                                                                                          var ctx = Leisure.contextStack;
                                                                                          Leisure.contextStack = cons(funcContext('m_subdo', 71), oldCtx)
                                                                                          try {
                                                                                            return (function(){
                                                                                               var ctx = Leisure.contextStack
                                                                                               var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_subdo', 65), oldCtx)
                                                                                                try {
                                                                                                  return _apply()((function(){var $m; return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     return function(){var oldCtx = ctx;
                                                                                                           
                                                                                                         var ctx = Leisure.contextStack;
                                                                                                         Leisure.contextStack = cons(funcContext('m_subdo', 64), oldCtx)
                                                                                                         try {
                                                                                                           return $m || ($m = ((function(){
                                                                                                              var ctx = Leisure.contextStack
                                                                                                              var oldCtx = ctx;
                                                                                                                 
                                                                                                               var ctx = Leisure.contextStack;
                                                                                                               Leisure.contextStack = cons(funcContext('m_subdo', 64), oldCtx)
                                                                                                               try {
                                                                                                                 return (function(){
                                                                                                                    var ctx = Leisure.contextStack
                                                                                                                    var oldCtx = ctx;
                                                                                                                       
                                                                                                                     var ctx = Leisure.contextStack;
                                                                                                                     Leisure.contextStack = cons(funcContext('m_subdo', 62), oldCtx)
                                                                                                                     try {
                                                                                                                       return _apply()((function(){var $m; return (function(){
                                                                                                                          var ctx = Leisure.contextStack
                                                                                                                          return function(){var oldCtx = ctx;
                                                                                                                                
                                                                                                                              var ctx = Leisure.contextStack;
                                                                                                                              Leisure.contextStack = cons(funcContext('m_subdo', 61), oldCtx)
                                                                                                                              try {
                                                                                                                                return $m || ($m = ((function(){
                                                                                                                                   var ctx = Leisure.contextStack
                                                                                                                                   var oldCtx = ctx;
                                                                                                                                      
                                                                                                                                    var ctx = Leisure.contextStack;
                                                                                                                                    Leisure.contextStack = cons(funcContext('m_subdo', 61), oldCtx)
                                                                                                                                    try {
                                                                                                                                      return _ref()((function(){
                                                                                                                                         var ctx = Leisure.contextStack
                                                                                                                                         return function(){var oldCtx = ctx;
                                                                                                                                               
                                                                                                                                             var ctx = Leisure.contextStack;
                                                                                                                                             Leisure.contextStack = cons(funcContext('m_subdo', 60), oldCtx)
                                                                                                                                             try {
                                                                                                                                               return "bind";
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
                                                                                                                  })()(_a2);
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
                                                                                                   Leisure.contextStack = cons(funcContext('m_subdo', 70), oldCtx)
                                                                                                   try {
                                                                                                     return $m || ($m = ((function(){
                                                                                                        var ctx = Leisure.contextStack
                                                                                                        var oldCtx = ctx;
                                                                                                           
                                                                                                         var ctx = Leisure.contextStack;
                                                                                                         Leisure.contextStack = cons(funcContext('m_subdo', 70), oldCtx)
                                                                                                         try {
                                                                                                           return (function(){
                                                                                                              var ctx = Leisure.contextStack
                                                                                                              var oldCtx = ctx;
                                                                                                                 
                                                                                                               var ctx = Leisure.contextStack;
                                                                                                               Leisure.contextStack = cons(funcContext('m_subdo', 68), oldCtx)
                                                                                                               try {
                                                                                                                 return _lambda()((function(){
                                                                                                                    var ctx = Leisure.contextStack
                                                                                                                    return function(){var oldCtx = ctx;
                                                                                                                          
                                                                                                                        var ctx = Leisure.contextStack;
                                                                                                                        Leisure.contextStack = cons(funcContext('m_subdo', 67), oldCtx)
                                                                                                                        try {
                                                                                                                          return "_";
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
                                                                                                            })()(_a);
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
                                          })()(_f2);
                                       } catch (err) {
                                         if (!err.leisureContext) {
                                           err.leisureContext = Leisure.contextStack;
                                         }
                                         throw err;
                                       } finally {
                                         Leisure.contextStack = ctx
                                       }
                                    })();};}));
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\a. \\f. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_subdo\n    m_extractVar a2 '<-'\n      \\v ast . apply (apply (ref 'bind') ast) (lambda v a)\n      m_extractVar a2 '='\n        \\v ast . apply (lambda v a) ast\n        apply (apply (ref 'bind') a2) (lambda '_' a)\n    f2");
;
//let = AST(\apl . apl \f a . m_sublet f a)
root.defs._let = _let = Leisure.defineMacro('let', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('let', 9), ctx)
   try {
     return function(_apl){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('let', 8), oldCtx)
         try {
           return _apl()((function(){var $m; return (function(){
              var ctx = Leisure.contextStack
              return function(){var oldCtx = ctx;
                    
                  var ctx = Leisure.contextStack;
                  Leisure.contextStack = cons(funcContext('let', 7), oldCtx)
                  try {
                    return $m || ($m = (function(_f){return function(_a){return (function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('let', 5), oldCtx)
                        try {
                          return (function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('let', 3), oldCtx)
                              try {
                                return _m_sublet()(_f);
                              } catch (err) {
                                if (!err.leisureContext) {
                                  err.leisureContext = Leisure.contextStack;
                                }
                                throw err;
                              } finally {
                                Leisure.contextStack = ctx
                              }
                           })()(_a);
                        } catch (err) {
                          if (!err.leisureContext) {
                            err.leisureContext = Leisure.contextStack;
                          }
                          throw err;
                        } finally {
                          Leisure.contextStack = ctx
                        }
                     })();};}));
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
})(), 1, "\\apl. apl \\f a . m_sublet f a");
root.tokenDefs.push('let', '=M=');
;
//m_sublet = AST(\f a . or (is f ref) (is f lit) a (f \f2 a2 . m_extractVar a2 = \v ast . m_sublet f2 (apply (lambda v a) ast) (apply a a2)))
root.defs._m_sublet = _m_sublet = Leisure.define('m_sublet', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('m_sublet', 48), ctx)
   try {
     return function(_f){return function(_a){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('m_sublet', 46), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('m_sublet', 14), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('m_sublet', 12), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('m_sublet', 6), oldCtx)
                           try {
                             return _or()((function(){var $m; return (function(){
                                var ctx = Leisure.contextStack
                                return function(){var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('m_sublet', 5), oldCtx)
                                    try {
                                      return $m || ($m = ((function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('m_sublet', 5), oldCtx)
                                          try {
                                            return (function(){
                                               var ctx = Leisure.contextStack
                                               var oldCtx = ctx;
                                                  
                                                var ctx = Leisure.contextStack;
                                                Leisure.contextStack = cons(funcContext('m_sublet', 3), oldCtx)
                                                try {
                                                  return _is()(_f);
                                                } catch (err) {
                                                  if (!err.leisureContext) {
                                                    err.leisureContext = Leisure.contextStack;
                                                  }
                                                  throw err;
                                                } finally {
                                                  Leisure.contextStack = ctx
                                                }
                                             })()(_ref);
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
                              Leisure.contextStack = cons(funcContext('m_sublet', 11), oldCtx)
                              try {
                                return $m || ($m = ((function(){
                                   var ctx = Leisure.contextStack
                                   var oldCtx = ctx;
                                      
                                    var ctx = Leisure.contextStack;
                                    Leisure.contextStack = cons(funcContext('m_sublet', 11), oldCtx)
                                    try {
                                      return (function(){
                                         var ctx = Leisure.contextStack
                                         var oldCtx = ctx;
                                            
                                          var ctx = Leisure.contextStack;
                                          Leisure.contextStack = cons(funcContext('m_sublet', 9), oldCtx)
                                          try {
                                            return _is()(_f);
                                          } catch (err) {
                                            if (!err.leisureContext) {
                                              err.leisureContext = Leisure.contextStack;
                                            }
                                            throw err;
                                          } finally {
                                            Leisure.contextStack = ctx
                                          }
                                       })()(_lit);
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
                  })()(_a);
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
                  Leisure.contextStack = cons(funcContext('m_sublet', 45), oldCtx)
                  try {
                    return $m || ($m = ((function(){
                       var ctx = Leisure.contextStack
                       var oldCtx = ctx;
                          
                        var ctx = Leisure.contextStack;
                        Leisure.contextStack = cons(funcContext('m_sublet', 45), oldCtx)
                        try {
                          return _f()((function(){var $m; return (function(){
                             var ctx = Leisure.contextStack
                             return function(){var oldCtx = ctx;
                                   
                                 var ctx = Leisure.contextStack;
                                 Leisure.contextStack = cons(funcContext('m_sublet', 44), oldCtx)
                                 try {
                                   return $m || ($m = (function(_f2){return function(_a2){return (function(){
                                      var ctx = Leisure.contextStack
                                      var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('m_sublet', 42), oldCtx)
                                       try {
                                         return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('m_sublet', 36), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('m_sublet', 20), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('m_sublet', 18), oldCtx)
                                                         try {
                                                           return _m_extractVar()(_a2);
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
                                                            Leisure.contextStack = cons(funcContext('m_sublet', 19), oldCtx)
                                                            try {
                                                              return "=";
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
                                                      Leisure.contextStack = cons(funcContext('m_sublet', 35), oldCtx)
                                                      try {
                                                        return $m || ($m = (function(_v){return function(_ast){return (function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('m_sublet', 33), oldCtx)
                                                            try {
                                                              return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('m_sublet', 23), oldCtx)
                                                                  try {
                                                                    return _m_sublet()(_f2);
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
                                                                     Leisure.contextStack = cons(funcContext('m_sublet', 32), oldCtx)
                                                                     try {
                                                                       return $m || ($m = ((function(){
                                                                          var ctx = Leisure.contextStack
                                                                          var oldCtx = ctx;
                                                                             
                                                                           var ctx = Leisure.contextStack;
                                                                           Leisure.contextStack = cons(funcContext('m_sublet', 32), oldCtx)
                                                                           try {
                                                                             return (function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('m_sublet', 30), oldCtx)
                                                                                 try {
                                                                                   return _apply()((function(){var $m; return (function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      return function(){var oldCtx = ctx;
                                                                                            
                                                                                          var ctx = Leisure.contextStack;
                                                                                          Leisure.contextStack = cons(funcContext('m_sublet', 29), oldCtx)
                                                                                          try {
                                                                                            return $m || ($m = ((function(){
                                                                                               var ctx = Leisure.contextStack
                                                                                               var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_sublet', 29), oldCtx)
                                                                                                try {
                                                                                                  return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_sublet', 27), oldCtx)
                                                                                                      try {
                                                                                                        return _lambda()(_v);
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }
                                                                                                   })()(_a);
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
                                                                              })()(_ast);
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
                                                         })();};}));
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
                                                Leisure.contextStack = cons(funcContext('m_sublet', 41), oldCtx)
                                                try {
                                                  return $m || ($m = ((function(){
                                                     var ctx = Leisure.contextStack
                                                     var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('m_sublet', 41), oldCtx)
                                                      try {
                                                        return (function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('m_sublet', 39), oldCtx)
                                                            try {
                                                              return _apply()(_a);
                                                            } catch (err) {
                                                              if (!err.leisureContext) {
                                                                err.leisureContext = Leisure.contextStack;
                                                              }
                                                              throw err;
                                                            } finally {
                                                              Leisure.contextStack = ctx
                                                            }
                                                         })()(_a2);
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
                                    })();};}));
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
      })();};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\f. \\a. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_extractVar a2 '='\n    \\v ast . m_sublet f2 (apply (lambda v a) ast)\n    apply a a2");
;
//m_extractVar = AST(\ast token . is ast apply (ast \f a . m_varFromTuple f token \v . some2 v a (m_extractVar f token \var ast . some2 var (apply ast a) none)) none)
root.defs._m_extractVar = _m_extractVar = Leisure.define('m_extractVar', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('m_extractVar', 45), ctx)
   try {
     return function(_ast){return function(_token){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('m_extractVar', 43), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('m_extractVar', 41), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('m_extractVar', 4), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('m_extractVar', 2), oldCtx)
                           try {
                             return _is()(_ast);
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()(_apply);
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
                        Leisure.contextStack = cons(funcContext('m_extractVar', 40), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('m_extractVar', 40), oldCtx)
                              try {
                                return _ast()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('m_extractVar', 39), oldCtx)
                                       try {
                                         return $m || ($m = (function(_f){return function(_a){return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('m_extractVar', 37), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('m_extractVar', 17), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('m_extractVar', 10), oldCtx)
                                                         try {
                                                           return (function(){
                                                              var ctx = Leisure.contextStack
                                                              var oldCtx = ctx;
                                                                 
                                                               var ctx = Leisure.contextStack;
                                                               Leisure.contextStack = cons(funcContext('m_extractVar', 8), oldCtx)
                                                               try {
                                                                 return _m_varFromTuple()(_f);
                                                               } catch (err) {
                                                                 if (!err.leisureContext) {
                                                                   err.leisureContext = Leisure.contextStack;
                                                                 }
                                                                 throw err;
                                                               } finally {
                                                                 Leisure.contextStack = ctx
                                                               }
                                                            })()(_token);
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
                                                            Leisure.contextStack = cons(funcContext('m_extractVar', 16), oldCtx)
                                                            try {
                                                              return $m || ($m = (function(_v){return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('m_extractVar', 15), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_extractVar', 13), oldCtx)
                                                                        try {
                                                                          return _some2()(_v);
                                                                        } catch (err) {
                                                                          if (!err.leisureContext) {
                                                                            err.leisureContext = Leisure.contextStack;
                                                                          }
                                                                          throw err;
                                                                        } finally {
                                                                          Leisure.contextStack = ctx
                                                                        }
                                                                     })()(_a);
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
                                                })()((function(){var $m; return (function(){
                                                  var ctx = Leisure.contextStack
                                                  return function(){var oldCtx = ctx;
                                                        
                                                      var ctx = Leisure.contextStack;
                                                      Leisure.contextStack = cons(funcContext('m_extractVar', 36), oldCtx)
                                                      try {
                                                        return $m || ($m = ((function(){
                                                           var ctx = Leisure.contextStack
                                                           var oldCtx = ctx;
                                                              
                                                            var ctx = Leisure.contextStack;
                                                            Leisure.contextStack = cons(funcContext('m_extractVar', 36), oldCtx)
                                                            try {
                                                              return (function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('m_extractVar', 34), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_extractVar', 22), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('m_extractVar', 20), oldCtx)
                                                                              try {
                                                                                return _m_extractVar()(_f);
                                                                              } catch (err) {
                                                                                if (!err.leisureContext) {
                                                                                  err.leisureContext = Leisure.contextStack;
                                                                                }
                                                                                throw err;
                                                                              } finally {
                                                                                Leisure.contextStack = ctx
                                                                              }
                                                                           })()(_token);
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
                                                                           Leisure.contextStack = cons(funcContext('m_extractVar', 33), oldCtx)
                                                                           try {
                                                                             return $m || ($m = (function(_var){return function(_ast){return (function(){
                                                                                var ctx = Leisure.contextStack
                                                                                var oldCtx = ctx;
                                                                                   
                                                                                 var ctx = Leisure.contextStack;
                                                                                 Leisure.contextStack = cons(funcContext('m_extractVar', 31), oldCtx)
                                                                                 try {
                                                                                   return (function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('m_extractVar', 25), oldCtx)
                                                                                       try {
                                                                                         return _some2()(_var);
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
                                                                                          Leisure.contextStack = cons(funcContext('m_extractVar', 30), oldCtx)
                                                                                          try {
                                                                                            return $m || ($m = ((function(){
                                                                                               var ctx = Leisure.contextStack
                                                                                               var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_extractVar', 30), oldCtx)
                                                                                                try {
                                                                                                  return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_extractVar', 28), oldCtx)
                                                                                                      try {
                                                                                                        return _apply()(_ast);
                                                                                                      } catch (err) {
                                                                                                        if (!err.leisureContext) {
                                                                                                          err.leisureContext = Leisure.contextStack;
                                                                                                        }
                                                                                                        throw err;
                                                                                                      } finally {
                                                                                                        Leisure.contextStack = ctx
                                                                                                      }
                                                                                                   })()(_a);
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
                                                                              })();};}));
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
                                                               })()(_none);
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
                                          })();};}));
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
            })()(_none);
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
})(), 2, "\\ast. \\token. is ast apply\n  ast \\f a .m_varFromTuple f token\n    \\v . some2 v a\n    m_extractVar f token\n      \\var ast . some2 var (apply ast a)\n      none\n  none");
;
//m_varFromTuple = AST(\ast token . is ast apply (ast \f arg . or (is f ref) (is f lit) (or (is arg ref) (is arg lit) (arg \arrow . eq arrow token (f \v . some v) none) none) none) none)
root.defs._m_varFromTuple = _m_varFromTuple = Leisure.define('m_varFromTuple', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('m_varFromTuple', 62), ctx)
   try {
     return function(_ast){return function(_token){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('m_varFromTuple', 60), oldCtx)
         try {
           return (function(){
              var ctx = Leisure.contextStack
              var oldCtx = ctx;
                 
               var ctx = Leisure.contextStack;
               Leisure.contextStack = cons(funcContext('m_varFromTuple', 58), oldCtx)
               try {
                 return (function(){
                    var ctx = Leisure.contextStack
                    var oldCtx = ctx;
                       
                     var ctx = Leisure.contextStack;
                     Leisure.contextStack = cons(funcContext('m_varFromTuple', 4), oldCtx)
                     try {
                       return (function(){
                          var ctx = Leisure.contextStack
                          var oldCtx = ctx;
                             
                           var ctx = Leisure.contextStack;
                           Leisure.contextStack = cons(funcContext('m_varFromTuple', 2), oldCtx)
                           try {
                             return _is()(_ast);
                           } catch (err) {
                             if (!err.leisureContext) {
                               err.leisureContext = Leisure.contextStack;
                             }
                             throw err;
                           } finally {
                             Leisure.contextStack = ctx
                           }
                        })()(_apply);
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
                        Leisure.contextStack = cons(funcContext('m_varFromTuple', 57), oldCtx)
                        try {
                          return $m || ($m = ((function(){
                             var ctx = Leisure.contextStack
                             var oldCtx = ctx;
                                
                              var ctx = Leisure.contextStack;
                              Leisure.contextStack = cons(funcContext('m_varFromTuple', 57), oldCtx)
                              try {
                                return _ast()((function(){var $m; return (function(){
                                   var ctx = Leisure.contextStack
                                   return function(){var oldCtx = ctx;
                                         
                                       var ctx = Leisure.contextStack;
                                       Leisure.contextStack = cons(funcContext('m_varFromTuple', 56), oldCtx)
                                       try {
                                         return $m || ($m = (function(_f){return function(_arg){return (function(){
                                            var ctx = Leisure.contextStack
                                            var oldCtx = ctx;
                                               
                                             var ctx = Leisure.contextStack;
                                             Leisure.contextStack = cons(funcContext('m_varFromTuple', 54), oldCtx)
                                             try {
                                               return (function(){
                                                  var ctx = Leisure.contextStack
                                                  var oldCtx = ctx;
                                                     
                                                   var ctx = Leisure.contextStack;
                                                   Leisure.contextStack = cons(funcContext('m_varFromTuple', 52), oldCtx)
                                                   try {
                                                     return (function(){
                                                        var ctx = Leisure.contextStack
                                                        var oldCtx = ctx;
                                                           
                                                         var ctx = Leisure.contextStack;
                                                         Leisure.contextStack = cons(funcContext('m_varFromTuple', 18), oldCtx)
                                                         try {
                                                           return (function(){
                                                              var ctx = Leisure.contextStack
                                                              var oldCtx = ctx;
                                                                 
                                                               var ctx = Leisure.contextStack;
                                                               Leisure.contextStack = cons(funcContext('m_varFromTuple', 12), oldCtx)
                                                               try {
                                                                 return _or()((function(){var $m; return (function(){
                                                                    var ctx = Leisure.contextStack
                                                                    return function(){var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_varFromTuple', 11), oldCtx)
                                                                        try {
                                                                          return $m || ($m = ((function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('m_varFromTuple', 11), oldCtx)
                                                                              try {
                                                                                return (function(){
                                                                                   var ctx = Leisure.contextStack
                                                                                   var oldCtx = ctx;
                                                                                      
                                                                                    var ctx = Leisure.contextStack;
                                                                                    Leisure.contextStack = cons(funcContext('m_varFromTuple', 9), oldCtx)
                                                                                    try {
                                                                                      return _is()(_f);
                                                                                    } catch (err) {
                                                                                      if (!err.leisureContext) {
                                                                                        err.leisureContext = Leisure.contextStack;
                                                                                      }
                                                                                      throw err;
                                                                                    } finally {
                                                                                      Leisure.contextStack = ctx
                                                                                    }
                                                                                 })()(_ref);
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
                                                                  Leisure.contextStack = cons(funcContext('m_varFromTuple', 17), oldCtx)
                                                                  try {
                                                                    return $m || ($m = ((function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_varFromTuple', 17), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('m_varFromTuple', 15), oldCtx)
                                                                              try {
                                                                                return _is()(_f);
                                                                              } catch (err) {
                                                                                if (!err.leisureContext) {
                                                                                  err.leisureContext = Leisure.contextStack;
                                                                                }
                                                                                throw err;
                                                                              } finally {
                                                                                Leisure.contextStack = ctx
                                                                              }
                                                                           })()(_lit);
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
                                                            Leisure.contextStack = cons(funcContext('m_varFromTuple', 51), oldCtx)
                                                            try {
                                                              return $m || ($m = ((function(){
                                                                 var ctx = Leisure.contextStack
                                                                 var oldCtx = ctx;
                                                                    
                                                                  var ctx = Leisure.contextStack;
                                                                  Leisure.contextStack = cons(funcContext('m_varFromTuple', 51), oldCtx)
                                                                  try {
                                                                    return (function(){
                                                                       var ctx = Leisure.contextStack
                                                                       var oldCtx = ctx;
                                                                          
                                                                        var ctx = Leisure.contextStack;
                                                                        Leisure.contextStack = cons(funcContext('m_varFromTuple', 49), oldCtx)
                                                                        try {
                                                                          return (function(){
                                                                             var ctx = Leisure.contextStack
                                                                             var oldCtx = ctx;
                                                                                
                                                                              var ctx = Leisure.contextStack;
                                                                              Leisure.contextStack = cons(funcContext('m_varFromTuple', 31), oldCtx)
                                                                              try {
                                                                                return (function(){
                                                                                   var ctx = Leisure.contextStack
                                                                                   var oldCtx = ctx;
                                                                                      
                                                                                    var ctx = Leisure.contextStack;
                                                                                    Leisure.contextStack = cons(funcContext('m_varFromTuple', 25), oldCtx)
                                                                                    try {
                                                                                      return _or()((function(){var $m; return (function(){
                                                                                         var ctx = Leisure.contextStack
                                                                                         return function(){var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('m_varFromTuple', 24), oldCtx)
                                                                                             try {
                                                                                               return $m || ($m = ((function(){
                                                                                                  var ctx = Leisure.contextStack
                                                                                                  var oldCtx = ctx;
                                                                                                     
                                                                                                   var ctx = Leisure.contextStack;
                                                                                                   Leisure.contextStack = cons(funcContext('m_varFromTuple', 24), oldCtx)
                                                                                                   try {
                                                                                                     return (function(){
                                                                                                        var ctx = Leisure.contextStack
                                                                                                        var oldCtx = ctx;
                                                                                                           
                                                                                                         var ctx = Leisure.contextStack;
                                                                                                         Leisure.contextStack = cons(funcContext('m_varFromTuple', 22), oldCtx)
                                                                                                         try {
                                                                                                           return _is()(_arg);
                                                                                                         } catch (err) {
                                                                                                           if (!err.leisureContext) {
                                                                                                             err.leisureContext = Leisure.contextStack;
                                                                                                           }
                                                                                                           throw err;
                                                                                                         } finally {
                                                                                                           Leisure.contextStack = ctx
                                                                                                         }
                                                                                                      })()(_ref);
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
                                                                                       Leisure.contextStack = cons(funcContext('m_varFromTuple', 30), oldCtx)
                                                                                       try {
                                                                                         return $m || ($m = ((function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            var oldCtx = ctx;
                                                                                               
                                                                                             var ctx = Leisure.contextStack;
                                                                                             Leisure.contextStack = cons(funcContext('m_varFromTuple', 30), oldCtx)
                                                                                             try {
                                                                                               return (function(){
                                                                                                  var ctx = Leisure.contextStack
                                                                                                  var oldCtx = ctx;
                                                                                                     
                                                                                                   var ctx = Leisure.contextStack;
                                                                                                   Leisure.contextStack = cons(funcContext('m_varFromTuple', 28), oldCtx)
                                                                                                   try {
                                                                                                     return _is()(_arg);
                                                                                                   } catch (err) {
                                                                                                     if (!err.leisureContext) {
                                                                                                       err.leisureContext = Leisure.contextStack;
                                                                                                     }
                                                                                                     throw err;
                                                                                                   } finally {
                                                                                                     Leisure.contextStack = ctx
                                                                                                   }
                                                                                                })()(_lit);
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
                                                                                 Leisure.contextStack = cons(funcContext('m_varFromTuple', 48), oldCtx)
                                                                                 try {
                                                                                   return $m || ($m = ((function(){
                                                                                      var ctx = Leisure.contextStack
                                                                                      var oldCtx = ctx;
                                                                                         
                                                                                       var ctx = Leisure.contextStack;
                                                                                       Leisure.contextStack = cons(funcContext('m_varFromTuple', 48), oldCtx)
                                                                                       try {
                                                                                         return _arg()((function(){var $m; return (function(){
                                                                                            var ctx = Leisure.contextStack
                                                                                            return function(){var oldCtx = ctx;
                                                                                                  
                                                                                                var ctx = Leisure.contextStack;
                                                                                                Leisure.contextStack = cons(funcContext('m_varFromTuple', 47), oldCtx)
                                                                                                try {
                                                                                                  return $m || ($m = (function(_arrow){return (function(){
                                                                                                     var ctx = Leisure.contextStack
                                                                                                     var oldCtx = ctx;
                                                                                                        
                                                                                                      var ctx = Leisure.contextStack;
                                                                                                      Leisure.contextStack = cons(funcContext('m_varFromTuple', 46), oldCtx)
                                                                                                      try {
                                                                                                        return (function(){
                                                                                                           var ctx = Leisure.contextStack
                                                                                                           var oldCtx = ctx;
                                                                                                              
                                                                                                            var ctx = Leisure.contextStack;
                                                                                                            Leisure.contextStack = cons(funcContext('m_varFromTuple', 44), oldCtx)
                                                                                                            try {
                                                                                                              return (function(){
                                                                                                                 var ctx = Leisure.contextStack
                                                                                                                 var oldCtx = ctx;
                                                                                                                    
                                                                                                                  var ctx = Leisure.contextStack;
                                                                                                                  Leisure.contextStack = cons(funcContext('m_varFromTuple', 37), oldCtx)
                                                                                                                  try {
                                                                                                                    return (function(){
                                                                                                                       var ctx = Leisure.contextStack
                                                                                                                       var oldCtx = ctx;
                                                                                                                          
                                                                                                                        var ctx = Leisure.contextStack;
                                                                                                                        Leisure.contextStack = cons(funcContext('m_varFromTuple', 35), oldCtx)
                                                                                                                        try {
                                                                                                                          return _eq()(_arrow);
                                                                                                                        } catch (err) {
                                                                                                                          if (!err.leisureContext) {
                                                                                                                            err.leisureContext = Leisure.contextStack;
                                                                                                                          }
                                                                                                                          throw err;
                                                                                                                        } finally {
                                                                                                                          Leisure.contextStack = ctx
                                                                                                                        }
                                                                                                                     })()(_token);
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
                                                                                                                     Leisure.contextStack = cons(funcContext('m_varFromTuple', 43), oldCtx)
                                                                                                                     try {
                                                                                                                       return $m || ($m = ((function(){
                                                                                                                          var ctx = Leisure.contextStack
                                                                                                                          var oldCtx = ctx;
                                                                                                                             
                                                                                                                           var ctx = Leisure.contextStack;
                                                                                                                           Leisure.contextStack = cons(funcContext('m_varFromTuple', 43), oldCtx)
                                                                                                                           try {
                                                                                                                             return _f()((function(){var $m; return (function(){
                                                                                                                                var ctx = Leisure.contextStack
                                                                                                                                return function(){var oldCtx = ctx;
                                                                                                                                      
                                                                                                                                    var ctx = Leisure.contextStack;
                                                                                                                                    Leisure.contextStack = cons(funcContext('m_varFromTuple', 42), oldCtx)
                                                                                                                                    try {
                                                                                                                                      return $m || ($m = (function(_v){return (function(){
                                                                                                                                         var ctx = Leisure.contextStack
                                                                                                                                         var oldCtx = ctx;
                                                                                                                                            
                                                                                                                                          var ctx = Leisure.contextStack;
                                                                                                                                          Leisure.contextStack = cons(funcContext('m_varFromTuple', 41), oldCtx)
                                                                                                                                          try {
                                                                                                                                            return _some()(_v);
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
                                                                                                         })()(_none);
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
                                                                     })()(_none);
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
                                                })()(_none);
                                             } catch (err) {
                                               if (!err.leisureContext) {
                                                 err.leisureContext = Leisure.contextStack;
                                               }
                                               throw err;
                                             } finally {
                                               Leisure.contextStack = ctx
                                             }
                                          })();};}));
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
            })()(_none);
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
})(), 2, "\\ast. \\token. is ast apply\n  ast \\f arg . or (is f ref) (is f lit)\n    or (is arg ref) (is arg lit)\n      arg \\arrow . eq arrow token\n        f \\v . some v\n        none\n      none\n    none\n  none");
;
//html = AST(\x f . f x)
root.defs._html = _html = Leisure.define('html', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('html', 4), ctx)
   try {
     return Leisure.setDataType(function(_x){return Leisure.setType(function(_f){return (function(){
        var ctx = Leisure.contextStack
        var oldCtx = ctx;
           
         var ctx = Leisure.contextStack;
         Leisure.contextStack = cons(funcContext('html', 2), oldCtx)
         try {
           return _f()(_x);
         } catch (err) {
           if (!err.leisureContext) {
             err.leisureContext = Leisure.contextStack;
           }
           throw err;
         } finally {
           Leisure.contextStack = ctx
         }
      })();}, 'html');}, 'html');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\x. \\f . f x");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)