# Bugs

barf if there are tabs

REPL can't handle comments

make regexp literals

undefine names which don't compile successfully

uniquify top-level names so this works:

  x = 3
  x = x + 1

# handle test comments in *.lsr files

# Match expr

(match
  pattern-expr -> result
  pattern-expr
  ...) x

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

# Commas with list filter

group things between commas so you don't need parens

# Notebook

Fixup theme stuff -- use icons instead of X and -> (transfer changes from implementationTalk.lmd into notebook-proper)

show indentation in different colors

# custom data in tokenPacks

Extend tokenPack to be [customMonad tokens groups filters]

That way, filters can store custom, changable data (like precedence lists)
