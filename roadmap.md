# Items

* Storage
   * local
   * local/proxied
   * gdrive
   * orion
* Sliders for numbers, like Bret Victor has (compiling as you change them)
* Queries
   * code scanner
* ignored variable, '_'
* file-private functions, $func
* Map constructor
   * {a:1 b:2 c:3} -- ':' operator binds very tightly
   * use it in data constructor, like: person {name:'bubba' dob:(date '3/17/1952')}
* Pattern matching
   * use same (or very similar) syntax to match as to create
      * getName p::(person {name:n}) = n
   * use different name space for pattern creation, so '{',
     '[', etc. can have different meanings in a decl
      * defPattern name func -- could bind name to func in the pattern namespace
   * records which declare their patterns
   * reflection
      * get function that matches a signature
         * ex: matchingFunction find 'fred' [] -- returns subfunction
           for fred
* Socially networked source code
   * Code use
      * Authors should know how many projects are using their code
      * Functions should show how many outside projects are calling them
      * Users of code should be notified when code changes
   * Code notes should be collaborative
      * Code users should be able to attach shared notes to code
      * Authors should be notified about new/changed notes

# Done

* Switch everything to markdown -- *.lmd files work, now

# Goals

* Very low barriers to entry
   * Runs out of a browser -- no install needed
   * Access programs in g-drive
   * Access local files
   * Present and copy modules from other shared drives
   * use modified date for updating
   * compatible with command-line tools

# New Features

* split block when user makes 3 blank lines and insert opposite type
  of block in between
* Allow cloned block, so you can edit a function in two places at once
   * Mark clone as a copy -- keep original where it is
   * Use for editable search results
