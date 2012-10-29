# Modify doc.html the talk

* Toys
   * Programming should be fun
* Notebooks
   * markdown, where "code" is real code
   * interactive development
      * scratch exprs
      * ASTs
      * tests
   * updating
      * on parse
      * on generic events
   * deploy your code in a notebook
* The Language
   * compiles to JavaScript
      * naive compilation -- lots of room for exciting optimizations!
   * minimizes punctuation
      * indentation just adds to the overhanging expr
      * commas are optional in lists
      * varargs
   * metaprogramming
      * macros
      * parse filters
      * parsing flow diagram
   * monads
* Xus
   * IDEs shouldn't block you from using command-line tools
   * xus container problem doc
   * Why can't you treat an IDE like a file system?
      * ACME/Plan9
   * leisure cat
   * What about the selection?
      * leisure selection
      * leisure selection -s
   * You should be able to play with several toys at the same time
      * leisure selection -a
   * Notebook extensions in any language
      * types of xus connection (socket, websocket, proxy, direct, WebWorker (future))
* Future directions
   * Queries
      * main function def labeled with leisurefunc="name"
      * query results labeled with leisureref="name"
* Add lazy example that filters a mapping demo factoring for lazy, for
  those unfamiliar with the advantages (credit to Deech)

# Clarify and Emphasize for Talk

* syntax trees
   * selection & editing
   * dynamically recomputing svg
   * show expression for tree
* update channels
* indentation section
* test cases
* tic-tac-toe (fix)
* video game
* (maybe) create 'call' monad -- call 'bubba' x y -- use bubba's arity to guide
  strict evaluation of args

# New stuff since last talk

* simple pattern matching
* parse filters & infix
* Xus


# Prepare

* din-8 video adapter

# Goals

* Very low barriers to entry
   * Runs out of a browser -- no install needed
   * Access programs in g-drive
   * Access local files
   * Present and copy modules from other shared drives
   * use modified date for updating
   * compatible with command-line tools

# New Features

* split code block when user makes 3 blank lines
