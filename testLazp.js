(function(){
var LC=require('./lc.js')
var LAZP=require('./lazp.js')

    function run() {
	console.log('hello')
	LC.loadDefs(DEFS)
    }

    var DEFS = LAZP.hereDoc(function() {/*
true = \x y . x
false = \x y . y

# Y combinator
Y = \g  .  (\x  .  g (x x)) \x  .  g (x x)

rec = \f . f (Y f)

# rec = \f . f f

# lists
# using false as "nil" in lists, so you use a list like this:
# DUMMY can be anything, but it needs to be there
# here's how you use a list:
# aList (\h t DUMMY . {list-case}) {empty-case}
# If the list is not empty, h and t are the head and tail of the list and it returns list-case.  DUMMY is not used, but needs to be there
# If the list is empty, it returns empty-case
# these defs are required by the pretty-printer: cons, nil, head, tail
cons = \a b f . f a b
nil = \x y . y
head = \l . l \h t . h
tail = \l . l \h t . t
null = \l . l (\h t D . false) true
last = rec \last l  . l (\h t D . null t h (last t)) nil
append = rec \append l1 l2 . l1 (\h t D . cons h (append t l2)) l2
reverse = \l . (rec \rev l res . l (\h t D . rev t (cons h res)) res) l nil
# list constructor: list 1 , 2 , 3 end
# first attempt, using recursive 'list' definition
#
#list = (rec \list rest item if-continue . if-continue (list (cons item rest)) (reverse (cons item rest))) nil
#, = true
#end = false
#
# second attempt, using "post-processing" with reverse
#[ =(]= \item f  .  f (cons item nil)
#, =.= \l item f . f (cons item l)
#] =)= reverse
#
# current constructor
# no post processing
# also allows [1, 2, 3 | REST ] (like Prolog)

[ =(]= \item c . c \rest . cons item rest
, =.= \f item c . c \rest . f (cons item rest)
] =)= \f . f nil
| =.= \f rest g . f rest
ident = \x . x
*/})

 run()
})()