/*
OLD

function(){return resolve(L_newDefine)("cons")(2)("cons a b = \\f . f a b")(lazy(setDataType((function () {
    var main;
    var full = function (L_a, L_b) {
        return setType(function(L_f){return resolve(L_f)(L_a)(L_b)}, 'cons');
    };
    var partial = function(L_a) {
        var _1 = function(L_b) {
            return full(L_a, L_b);
        };
        _1.leisureInfo = {arg: L_a, name: main.leisureName};
        return _1;
    };
    main = function(L_a, L_b, more) {
        if (L_b && (typeof more == "undefined" || more == null)) {
            return full(L_a, L_b);
        } else if (typeof L_b == "undefined" || L_b == null) {
            return partial(L_a);
        } else {
            return Leisure.curryCall(arguments, partial);
        }
    };
    return main;
})(), 'cons')))}
*/


// NEW

// note: make setDataType(f) return lazy(f)

testCons = (function(){
    function inexactArgs(last, extra) {
        return typeof last == 'undefined' || typeof extra != 'undefined';
    };
    function newSetDataType(name, func) {
        if (name) func.dataType = name;
        return lazy(func);
    };
    function makeArgChain(name, args) {
        var chain = {name: name, arg: args[0]};
        var prev = chain;
        
        for (var i = 1; i < args.length; i++) {
            prev = {arg: args[i], parent: prev};
        }
        return chain;
    };
    function slice(args, start, end) {
        return Array.prototype.slice.call(args, start, end);
    }
    function dispatch(name, args) {
        console.log("DISPATCH: ", args.callee.leisureName);
        //use args.callee.length and args.length to determine what to do
        var targetLen = args.callee.length - 1;
        //console.log("DISPATCHING, target length: " + targetLen + ", actual length: " + args.length);
        if (targetLen == args.length) return args.callee.apply(null, args);
        if (targetLen < args.length) {
            return args.callee.apply(null, slice(args, 0, targetLen)).apply(null, slice(args, targetLen));
        }
        var partialArgs = slice(args);
        var callee = args.callee;
        var partial = function() {
            //console.log("PARTIAL CALL, num args: " + arguments.length + ", previous args: " + arguments.length);
            //console.log("PARTIAL CALL with: " + partialArgs.concat(slice(arguments)));
            return callee.apply(null, partialArgs.concat(slice(arguments)));
        };
        partial.leisureInfo = makeArgChain(name, partialArgs);
        return partial;
    };
    var newCons = newSetDataType('cons', function(L_a, L_b, more) {
        //console.log("MAIN CALL, num args: " + arguments.length);
        if (inexactArgs(L_b, more)) return dispatch('cons', arguments);
        //console.log("NOT DISPATCHING");
        return setType(function(L_f){return resolve(L_f)(L_a)(L_b)}, 'cons');
    });

    Leisure.define("newCons", newCons, 2, "cons a b = \\f . f a b");
    return newCons;
})();

