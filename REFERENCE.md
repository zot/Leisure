[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [REPL](lazp.html)
## Syntax
Lambda syntax is very similar to Church's; Here's the identity function, **𝛌x.x**. For the lambda character, you can either use unicode character 955 (u3BB in JavaScript, &955; in HTML) or you can use \, so **\x.x** works just as well.

Identifiers are space or puctuation separated and you can stack lambda variables in front of the dot, so you can say "true," like this, **𝛌a b.a**.

To name a function, you can use the = sign, like this, **true = 𝛌a b.a**

Like Haskell, Lazp will automatically create a lambda for you if you put arguments in front of the equals sign, like this, **true a b = a**.
