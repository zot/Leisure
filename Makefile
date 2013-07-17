####
# Copyright (C) 2013, Bill Burdick
# License: ZLIB license
####

## Note, the lua tests depend on lua5.1, luarocks, and these luarocks: underscore, luajson
## It uses lua5.1 to maintain compatibility with LuaJIT

SRC=base ast testing gen runtime simpleParseJS browser repl
TEST=testLeisure
TEST_PARSER=testParser
ALL=$(SRC) $(TEST) $(TEST_PARSER) generatedPrelude simpleParse
DIR=core
LIB=lib
PRELUDE_INPUT=simpleParse simpleParse2
PRELUDE_FILES=$(PRELUDE_INPUT:%=core/%.lsr)
PRELUDE=lib/generatedPrelude.js
OUT_FILES=$(ALL:%=lib/%.js) $(ALL:%=lib/%.map) $(ALL:%=lib/%.ast)
COFFEE_FILES=$(SRC:%=core/%.coffee) $(TEST:%=core/%.coffee)

all: .tested $(PRELUDE) .parserTested

repl: all
	core/repl

$(PRELUDE): $(PRELUDE_FILES)
	cat $^ > core/generatedPrelude.lsr
	node lib/repl -0 -c -d lib core/simpleParse.lsr
	node lib/repl -1 -c -d lib core/generatedPrelude.lsr

#node_modules/coffee-script/bin/coffee -o $(LIB) -mc core

.tested: $(COFFEE_FILES)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $?
	node $(LIB)/$(TEST)
	touch $@

.parserTested: $(TEST_PARSER:%=core/%.coffee)
	node_modules/coffee-script/bin/coffee -o $(LIB) -mc $?
	node $(LIB)/$(TEST_PARSER) && touch $@

lua-tests: FRC
	(cd core; eval $(luarocks path) ; lua5.1 -lluarocks.loader testLeisure.lua)

clean:
	rm -f $(OUT_FILES) .tested

FRC:
