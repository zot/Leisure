[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [Source](http://github.com/zot/lazp) [REPL](lazp.html) [Standard functinos](std.laz)
## Syntax
Lambda syntax is very similar to Church's; Here's the identity function, **𝛌x.x**. For the lambda character, you can either use unicode character 955 (u3BB in JavaScript, &955; in HTML) or you can use \, so **\x.x** works just as well.

Identifiers are space or puctuation separated and you can stack lambda variables in front of the dot, so you can say "true," like this, **𝛌a b.a**.

To name a function, you can use the = sign, like this, **true = 𝛌a b.a**

Like Haskell, Lazp will automatically create a lambda for you if you put arguments in front of the equals sign, like this, **true a b = a**.

Any time a definition returns a lambda, it automatically creates a type with the same name as the definition.  For example, **nil = 𝛌a b.b** creates the type "nil".  You can compare types using the **is** function, for example, to see whether a value **v** is the **nil** function, you can say **is v nil**.

## Internal Lazp Files
* lazp.cs -- main implementation of the language
* prim.cs -- primitive functions
* std.laz -- standard functions
* pretty.cs -- pretty printer
* replCore.cs -- core of the REPL
* repl.cs -- command line repl
* runRepl.cs -- wrapper that runs the command line repl (probably can merge with repl.cs)
* browserRepl.cs -- browser wrapper for repl
* testing.js -- test case runner
* testLazp.cs -- test cases
