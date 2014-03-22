# Leisure

Leisure is a lazy, untyped, functional language that supports metaprogramming.  It aims to be comfortable,
easy to customize, and fun to use.

Here is a more complete [readme and demo](http://textcraft.org/calc/org.html#load=introTalk.lorg).  At this point, Leisure requires shadow DOM, so it runs in recent versions of Chrome, but may not work in other browsers.

I develop using [node-webkit](https://github.com/rogerwang/node-webkit).

Leisure is heavy development, right now -- if you are interested in contributing, please contact me so I can help you get set up -- Leisure development is not very plug-and-play yet.  My email is bill dot burdick at gmail.

## Convenient
Leisure provides a convenient syntax and powerful tools to help people try things out quickly, be productive, and customize the language to suit their needs.
Leisure's syntax is based on Lambda Calculus and borrows things from Haskell and other languages while still remaining very small.  It also includes metaprogramming
facilities to allow powerful customization.

## Notebook Style Interactive Development

For decades, programming has been done primarily in glorified text editors.  Some great strides have been made in various IDEs, but typically the
programmer is still burdened with a neverending "write, compile, debug, test, repeat" development cycle.  Why do you keep settling for this when
clearly we can do better?

LISP programmers know the REPL -- the command line interactive programming interface.  While still heavily under development, Leisure is meant to push this
envelope and provide a fully interactive, document-based development environment where
your code is executed, errors show when you make them, tests execute as you write your code, and documentation is rich and interactive, as well.
Functional programming is quite foreign to newcomers, but what if you could
instantly view the parse tree of the code you wrote? Or specify test arguments to your function and see the results live as you make
changes to your code in real time?  Our goal is to show programmers there has to be a better way, and we've settled for the status quo for far too long.

# Getting Started

If you have [node.js](http://nodejs.org/) installed, you can run the command-line Leisure repl by cloning the git repo, changing directory into the top level, and running
```
npm install
node lib/repl
```

For the browser environment, you'll need to use node-webkit, at this point.  You can bring up the demo with:

nw --url=file:///[path-to-leisure-dir]/www/org.html#load=introTalk.lorg

or you can browse one of your own documents with:

nw .

# Contact
If you want to get in touch, you can email me at bill dot burdick at gmail.
