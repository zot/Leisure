# Bugs

get svg.lsr working, again

clean up old files

clean up leisureFuncs, leisureFuncNames (multiple entries from reloads), functionInfo, etc.

convert code generation not to use the continuation pattern

make leisure -c show error messages

make sure blanks are OK

barf if there are tabs

REPL can't handle comments

make regexp literals

undefine names which don't compile successfully

uniqify top-level names so this works:

  x = 3
  x = x + 1

# Alternate function definitions, keyed by name

altdef name.alt func

* uses alist for defs -- overrides previous alt if there is one. works with uniqification

# doc strings

# handle test comments in *.lsr files

# Pattern exprs

Case works like Haskell's

```
case x
  pattern-expr -> result
  ...
```

Cases returns a function of one arg

```
(cases
  pattern-expr -> result
  ...) x

map
  cases
    ['single' x] -> x
    ['double' x] -> x * 2
    ['triple' x] -> x * 3
  [['single' 1] ['single' 2] ['double' 3] ['triple' 4]]
```

Match returns a boolean

```
(match
  pattern-expr
  pattern-expr
  ...) x
```

## fancy patterns

pattern-exprs without (-> result) can just return true or false (or maybe use match for those and case for pattern-exprs with actions)

allow existing variables in pattern-exprs, so this works

assoc key list = find (match [key | _]) list

## pattern notation

pattern
varname @ pattern

## misc

The 'patternDefs' value contains named pattern matchers

In function defs, they must either follow a '@' or be in a group:

```
last [x] = x
last [h | t] = last t
name (person [name:n addr:a])
```

# Namespaces

# Data structures

need a HAMT-based vector and map

# UNKNOWN macro

gets `name expr` for exprs that have unknown starts

# Anonymous _ variable

# LISTS

## Commas with list filter

group things between commas so you don't need parens

# Notebook

Fixup theme stuff -- use icons instead of X and -> (transfer changes from implementationTalk.lmd into notebook-proper)

show indentation in different colors

Show AST portion on hover?

Button to show simplified expr

# custom data in tokenPacks

Extend tokenPack to be [customMonad tokens groups filters]

That way, filters can store custom, changable data (like precedence lists)
